<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="7" :xl="6">
        <div class="BG-Average">
          <div class="bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>裝置查詢</span>
                <el-button-group style="float: right;">
                  <el-tooltip class="item" effect="dark" content="裝置列表" placement="top">
                    <el-button type="primary" icon="el-icon-tickets"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="折線圖" placement="top">
                    <el-button type="success" icon="el-icon-picture"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="輸出CSV" placement="top">
                    <el-button type="info"                                                                                         icon="el-icon-download"></el-button>
                  </el-tooltip>



                </el-button-group>


              </div>
              <div class="text item">
                <el-row>
                  <el-col :span="12">
                    <h5><span class="demonstration">選擇裝置</span></h5>
                  </el-col>
                  <el-col :span="12">
                    <span v-if="target"><h3>{{selectMap.typeName}} </h3></span>
                  </el-col>
                </el-row>
                <el-cascader
                  expand-trigger="hover"
                  :options="options"
                  v-model="target"
                  :show-all-levels="false"
                  @change="handleChange">
                </el-cascader>
                <h5><span class="demonstration">開始日期</span></h5>
                <el-date-picker
                  v-model="start"
                  type="date"
                  format="yyyy-MM-dd 00:00:00">
                  placeholder="選擇開始日期">
                </el-date-picker>
                <h5><span class="demonstration">結束日期</span></h5>
                <el-date-picker
                  v-model="end"
                  type="date"
                  format="yyyy-MM-dd 00:00:00">
                  placeholder="選擇結束日期">
                </el-date-picker>
                <h5><span class="demonstration">日期排序</span></h5>
                <template>
                  <el-radio v-model="radio" label="1" @change="handleRadioChange">由大到小</el-radio>
                  <el-radio v-model="radio" label="2" @change="handleRadioChange">由小到大</el-radio>
                </template>
                <el-button  icon="el-icon-search"
                            style="float: right;"
                            type="primary"
                            circle
                            @click="toFind">
                </el-button>
              </div>
            </el-card>

          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="17" :xl="18">
        <div class="BG-Average-Copy">
          <div class="bg-content">
            <event-table
              :data="data"
              :columns="columns"
            ></event-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              background
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getMapList, getDeviceList, getEventList } from '~/tools/api'
  import EventTable from '~/components/table/EventTable.vue'
  import Data from '~/components/table/data'
  import { toYMD } from '~/tools/time'
  export default {
    middleware: 'auth',
    components : {
      EventTable
    },
    data: () => ({
      labelPosition: 'right',
      radio: '1',
      data: [],
      format: "yyyy-MM-dd hh:mm:ss",
      columns: Data.columns,
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      start: '',
      end: '',
      target: null,
      selectMap: null,
      keys: null,
      total: 0,
      currentPage: 1,
      allData: [],
      size: 10,
      sort: 'desc',
      isFindable: false
    }),
    methods: {
      handleRadioChange (value) {
        // alert(value)
        if (value === '1') {
          this.sort = 'desc'
        } else {
          this.sort = 'asc'
        }
        if (this.isFindable) {
          this.toFind()
        }
      },
      handleChange(value) {
        // console.log(value);
        this.target = value
        let fport = this.target[0]
        // console.log('fport : ' + fport)
        for (let i = 0; i < this.mapList.length; ++i) {
          if (this.mapList[i].deviceType === fport) {
            this.selectMap = JSON.parse(JSON.stringify(this.mapList[i]))
          }
        }
        // console.log('this.selectMap : ' + JSON.stringify(this.selectMap))
        var filedName = JSON.parse(JSON.stringify(this.selectMap.fieldName))
        // console.log('filedName : ' + JSON.stringify(filedName))
        var myColumns = JSON.parse(JSON.stringify(Data.columns))
        // console.log('myColumns : ' + JSON.stringify(myColumns))
        if (filedName['header']) {
          delete filedName.header
        }
        if (filedName['end']) {
          delete filedName.end
        }
        if (filedName['sign']){
          delete filedName.sign
        }
        this.keys = Object.keys(filedName)
        // console.log('keys : ' + JSON.stringify(this.keys))
        if (this.keys.includes('epc')) {
          this.keys = ['epc']
          myColumns.push({ name: filedName['epc'], prop: 'epc' })
        } else {
          for (let j = 0; j < this.keys.length; ++j) {
            myColumns.splice(myColumns.length, 0, { name: filedName[this.keys[j]], prop: this.keys[j] })
          }
        }
        // console.log('myColumns : ' + JSON.stringify(myColumns))
        this.columns = myColumns
        this.data = []
        this.allData = []
        this.total = 0
        this.toFind()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        var s = (this.currentPage - 1) * this.size
        var e = (this.currentPage) * this.size

        this.data = this.allData.slice(s, e)
      },
      toFind () {
        if (this.target === null) {
          this.waring ('尚未選擇裝置!')
          this.isFindable = false
          return
        }
        var token = this.$store.state.authUser.authToken
        let params = {fport: this.target[0], macAddr: this.target[1], token: token, paginate: false}
        if (this.start) {
          params.from = this.start
        }
        if (this.end) {
          params.to = this.end
        }
        if (params.from && params.to === undefined) {
          this.waring('結束時間未選擇')
          this.isFindable = false
          return
        } else if (params.to && params.from === undefined) {
          this.waring('始時間未選擇')
          this.isFindable = false
          return
        }
        this.isFindable = true
        params.sort = this.sort
        var url = 'http://localhost:8000/device/v1/event'
        var myData = []
        getEventList(this, url, params).then(res => {
          // console.log('list ' + JSON.stringify(res.data)
          var data = res.data.data
          this.total = data.length
          for (let i = 0; i < data.length; ++i) {
            // console.log('data : ' + JSON.stringify(data[i]))
            let device = data[i]
            let tmp = {
              macAddr: device.macAddr,
              data: device.data,
              date: device.date
            }
            for (let j = 0; j < this.keys.length; ++j) {
              tmp[this.keys[j]] = device.information[this.keys[j]]
            }
            // console.log('tmp : ' + JSON.stringify(tmp))
            myData.splice(myData.length, 0 , tmp)
          }
          // console.log('myData ' + JSON.stringify(myData))
          this.allData = myData
          // console.log('this.allData : ' + JSON.stringify(this.allData))
          if (this.allData.length > this.size) {
            this.data = this.allData.slice(0, 10)
          } else {
            this.data = this.allData
          }
        })
      },
      waring (msg) {
        this.$notify({
          title: '警告',
          message: msg,
          type: 'warning'
        });
      },
    },
    asyncData: async function ({app, error, store}) {
      try {
        var url = 'http://localhost:8000/map/v1/'
        var url2 = 'http://localhost:8000/device/v1/sensor/3'
        var token = store.state.authUser.authToken

        const [list, list2] = await Promise.all([
          getMapList(app, url, {token: token}).then(res => res.data),
          getDeviceList(app, url2, {token: token}).then(res => res.data)
        ])
        // console.log('list ' + JSON.stringify(list.data))
        var map = {}
        list2.mList.forEach(function (device) {
          let info = {value: device.device_mac, label: device.device_name}
          if (map[device.fport]) {
            map[device.fport].push(info)
          } else {
            map[device.fport] = [info]
          }
        })
        //console.log('map : ' + JSON.stringify(map))
        var test = []
        list.data.forEach(function (item) {
          let info = {value: item.deviceType, label: item.typeName}
          // console.log('map : ' + JSON.stringify(map[item.deviceType]))
          if (map[item.deviceType]) {
            info.children = map[item.deviceType]
          }
          test.push(info)
        })
        // console.log('test ' + JSON.stringify(test))
        store.dispatch('set_map', list.data)
        return {
          mapList: list.data,
          options: test
        }
      } catch (err) {
        error(err)
      }
    }
  }
</script>

<style>
  .BG-Average {
    width: auto;
    height: auto;
    border-radius: 10px;
  // background-color: #4d4d4d;
    background-color: #bfbfbf;
    padding: 5px 5px 5px 5px;
    margin-bottom: 20px;
  }
  .BG-Average-Copy {
    width: auto;
    height: 550px;
    border-radius: 10px;
  // background-color: #4d4d4d;
    background-color: #bfbfbf;
    padding: 5px 5px 5px 5px;
  }
  .bg-purple {
    background: #f2f2f2 ;
    border-radius: 5px;
    padding: 5px 5px 5px 5px;
  }
  .bg-content {
    width: auto;
    height: 600px;
    background: #f2f2f2 ;
    border-radius: 5px;
    padding: 5px 5px 5px 5px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
