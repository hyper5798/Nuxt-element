<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="7" :xl="6">
        <div class="BG-Average">
          <div class="bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>歷史資料</span>
                <el-button-group style="float: right;">
                  <el-tooltip class="item" effect="dark" content="顯示資料列表" placement="top">
                    <el-button type="primary" icon="el-icon-tickets" @click="displayTable"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="顯示資料折線圖" placement="top">
                    <el-button type="success" icon="el-icon-picture" @click="displayChart"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="輸出CSV" placement="top">
                    <el-button type="success" icon="el-icon-download" @click="exportCSV"></el-button>
                  </el-tooltip>
                </el-button-group>
              </div>
              <div class="text item">
                <el-row>
                  <el-col :span="12">
                    <h5><span class="demonstration">選擇裝置</span></h5>
                  </el-col>
                </el-row>
                <el-cascader
                  class="deviceSelecter"
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
          <div v-show="isShowTable" class="bg-content">
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
          <div v-show="!isShowTable" class="bg-content">
            <event-chart :chartData="chartData"></event-chart>
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
  import EventChart from '~/components/charts/EventChart'
  import { emptyData, COLORS, chartColors } from '~/components/charts/chart-data'

  export default {
    middleware: 'auth',
    components : {
      EventTable,
      EventChart
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
      values: null,
      total: 0,
      currentPage: 1,
      allData: [],
      size: 10,
      sort: 'desc',
      isFindable: false,
      isShowTable: true,
      chartData: null,
      noneInfoLength: 2
    }),
    methods: {
      displayTable () {
        this.isShowTable = true
      },
      displayChart () {
        this.isShowTable = false
        // this.showChart(this.allData)
      },
      exportCSV () {
        if(this.keys === null) {
          this.waring('尚未取得資料無法匯出CSV!')
          return
        }
        this.csvExport ()
      },
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
      handleChange (value) {
        this.target = value
        let fport = this.target[0]
        if (this.target[1] === undefined) {
          this.waring('沒有裝置,無法查詢')
          return
        }
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
        this.values =  Object.values(filedName)
        // console.log('keys : ' + JSON.stringify(this.keys))
        // console.log('values : ' + JSON.stringify(this.values))
        if (this.keys.includes('epc')) {
          this.keys = ['epc']
          myColumns.push({ name: filedName['epc'], prop: 'epc' })
        } else {
          for (let j = 0; j < this.keys.length; ++j) {
            myColumns.splice(myColumns.length, 0, { name: this.values[j], prop: this.keys[j] })
          }
        }
        // console.log('myColumns : ' + JSON.stringify(myColumns))
        this.columns = myColumns
        this.data = []
        this.allData = []
        this.total = 0
        this.toFind()
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        var s = (this.currentPage - 1) * this.size
        var e = (this.currentPage) * this.size
        this.data = this.allData.slice(s, e)
      },
      async toFind () {
        this.displayTable()
        if (this.target === null) {
          this.waring ('尚未選擇裝置!')
          this.isFindable = false
          return
        }
        var token = this.$store.state.authUser.authToken
        let params = {fport: this.target[0], macAddr: this.target[1], token: token, paginate: false, limit: 0}
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
        } else if (params.to === undefined && params.from === undefined) {
          params.limit = 1000
        }
        this.isFindable = true
        params.sort = this.sort
        var myData = []
        await getEventList(this, params).then(res => {
          // console.log('list ' + JSON.stringify(res.data)
          var data = res.data.data
          this.total = data.length
          for (let i = 0; i < data.length; ++i) {
            // console.log('data : ' + JSON.stringify(data[i]))
            let device = data[i]
            let tmp = {
              macAddr: device.macAddr,
              // data: device.data,
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
          this.showChart(this.allData)
        })
        this.showChart(this.allData)
      },
      showChart (data) {
        // console.log(data)
        if(data === null || data.length === 0) {
          return;
        }
        var myData = emptyData
        // console.log(myData)
        var mLables = []
        var dataArr = []
        for (let k = 0; k < this.keys.length; ++k) {
          dataArr[k] = []
        }
        for (let i = 0; i < data.length; ++i) {
          let obj = data[i]
          // console.log(obj)
          for (let j = 0; j < this.keys.length; ++j) {
            // console.log( this.keys[j])
            dataArr[j].push(obj[this.keys[j]])
          }
          mLables.push(new Date(obj.date)) // Transfer date string to date
        }
        // console.log('dataArr : ' +JSON.stringify(dataArr))
        // console.log(JSON.stringify(mLables))
        this.chartData = this.getChartData (mLables, this.values, dataArr)
        // console.log(test)
      },
      getChartData (time, keys, arr) {
        var myDatasets = []
        var colorNames = Object.keys(chartColors)
        for (let i = 0; i < keys.length; ++i) {
          let colorName = colorNames[i + 2]
          // console.log('colorName : ' + colorName)
          let newColor = chartColors[colorName]
          // console.log('colorName : ' + newColor)
          let newData = this.getNewDatasets(keys[i],arr[i], newColor)
          // console.log(newData)
          myDatasets.push(newData)
        }
        var dataTemp = {
          labels: time,
          datasets: myDatasets
        }
        return dataTemp
      },
      getNewDatasets (label, arr, newColor) {
        var newDataset = {
          label: label,
          borderColor: newColor,
          backgroundColor: newColor,
          fill: false,
          data: arr
        }
        return newDataset
      },
      color: function(index) {
        return COLORS[index % COLORS.length];
      },
      waring (msg) {
        this.$notify({
          title: '警告',
          message: msg,
          type: 'warning'
        });
      },
      csvExport () {
        if (this.allData === null) {
          this.waring('尚未取得資料無法匯出CSV!')
        }
        var data = this.convertToCSV()
        // console.log('data : ' + JSON.stringify(data))
        // console.log(typeof this.start + ' : ' + this.start)
        // console.log(typeof this.end + ' : ' + this.end)
        var d1 = new Date(this.start)
        var d2 = new Date(this.end)
        // console.log('d1.getTime()  = ' + d1.getTime())
        // console.log('d2.getTime()  = ' + d2.getTime())
        var filename = this.target[1]
        if(this.start === '' && this.start === '') {
          filename = filename + '.csv'
        } else if (d1.getTime() === d2.getTime() ) {
          // console.log('this.info.from === this.info.to')
          filename = filename + this.end + '.csv'
        } else {
          // console.log('this.info.from !== this.info.to')
          filename = filename + this.start + '_' + this.end + '.csv'
        }
        this.saveContent(data, filename)
      },
      convertToCSV () {
        let values = this.values
        let objArray = this.allData
        let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
        var str = ''
        var line = ''
        var target = ['項目', '裝置識別欄', '日期']
        target = target.concat(this.values)
        // console.log('target : ' + JSON.stringify(target))
        // For title
        for (var index in target) {
          if (line !== '') line += ','
          line += target[index]
        }
        str += line + '\r\n'
        for (var i = 0; i < array.length; i++) {
          var line2 = '' + (i + 1)
          for (var j in array[i]) {
            if (line2 !== '') line2 += ','
            if (typeof array[i][j] === 'object') {
              line2 += this.getObjectStr(array[i][j])
            } else {
              line2 += array[i][j]
            }
          }
          str += line2 + '\r\n'
        }
        // console.log(' str :' + str)
        str = encodeURIComponent(str)
        return str
      },
      getObjectStr (obj) {
        var keys = Object.keys(obj)
        var arr = []
        for (var i = 0; i < keys.length; i++) {
          arr.push(obj[keys[i]])
        }
        var str = arr.toString()
        return str
      },
      saveContent (fileContents, fileName) {
        var link = document.createElement('a')
        // console.log('$ fileMame : ' + fileName)
        link.download = fileName
        link.href = 'data:text/csv;charset=utf-8,\ufeff' + fileContents
        link.click()
      }
    },
    asyncData: async function ({app, error, store}) {
      try {
        var token = store.state.authUser.authToken
        // Add for filter device with cp id on 2018.06.02
        var cp = 1
        if (store.state.authUser.userInfo.cp === 'NDHU') {
          cp = 8
        } else if (store.state.authUser.userInfo.cp === 'NIU'){
          cp = 7
        }

        const [list, list2] = await Promise.all([
          getMapList(app, {token: token}).then(res => res.data),
          getDeviceList(app, {token: token}).then(res => res.data)
        ])
        console.log('device list ')
        console.log(list2.mList)
        var map = {}

        if (list2.mList) {
          list2.mList.forEach(function (device) {
            // Add for filter device with cp id on 2018.06.02
            // alert(device.device_cp_id + ' -> ' + device.device_mac)
            let info = {value: device.device_mac, label: device.device_name}
            if (device.device_cp_id === cp) {
              if (map[device.fport]) {
                map[device.fport].push(info)
              } else {
                map[device.fport] = [info]
              }
            }
          })
        } else {
          alert('尚未加入任何裝置')
        }
        console.log('map')
        console.log(map)
        var keys = Object.keys(map)
        console.log('keys')
        console.log(keys)

        console.log('map : ' + JSON.stringify(map))
        var test = []
        var mapList = []
        list.data.forEach(function (item) {
          let a = keys.indexOf(item.deviceType)
          console.log('item.deviceType : ' + item.deviceType)
          if (a > -1) {
            let info = {value: item.deviceType, label: item.typeName}
            alert('map : ' + JSON.stringify(map[item.deviceType]))
            if (map[item.deviceType]) {
              info.children = map[item.deviceType]
            }
            mapList.push(item)
            test.push(info)
          }
        })
        console.log('test ' + JSON.stringify(test))
        store.dispatch('set_map', list.data)
        return {
          mapList: mapList,
          options: test
        }
      } catch (err) {
        error(err)
      }
    }
  }
</script>

<style>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .deviceSelecter {
    margin-top: 20px;
  }
</style>
