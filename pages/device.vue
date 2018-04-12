<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="7" :xl="6">
        <div class="BG-Average">
          <div class="bg-purple">
            <el-card v-if="isShowAdd" class="box-card">
              <div slot="header" class="clearfix">
                <span>新增裝置</span>
                <el-tooltip class="item" effect="dark" content="按此編輯裝置" placement="top">
                  <el-button type="success"
                             icon="el-icon-edit"
                             style="float: right"
                             circle
                             @click="displayEditCard">
                  </el-button>
                </el-tooltip>
              </div>
            </el-card>

            <el-card v-if="!isShowAdd" class="box-card">
              <div slot="header" class="clearfix" @click="selectAllDevice">
                <span>裝置編輯</span>
                <el-tooltip class="item" effect="dark" content="按此新增裝置" placement="top">
                  <el-button type="primary"
                             icon="el-icon-plus"
                             style="float: right"
                             circle
                             @click="displayAddCard">
                  </el-button>
                </el-tooltip>
              </div>
              <div class="text item">
                <h3>裝置類型</h3>

                <el-menu theme="dark" @select="menuSelect">
                  <el-menu-item v-for="(map, index) in mapList"
                                :key="index"
                                v-bind:index="map.deviceType" >
                    {{map.typeName}}
                  </el-menu-item>
                </el-menu>
              </div>
            </el-card> -->

          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="17" :xl="18">
        <div class="BG-Average-Copy">
          <div class="bg-content">
            # Edit device
            <edit-table :data="data" :columns="columns"></edit-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getMapList, getDeviceList, getEventList } from '~/tools/api'
  import EditTable from '~/components/table/EditTable.vue'
  import Data from '~/components/table/data'
  import { toYMD } from '~/tools/time'
  import { emptyData, COLORS, chartColors } from '~/components/charts/chart-data'

  export default {
    middleware: 'auth',
    components : {
      EditTable
    },
    data: () => ({
      data: this.allDevice,
      columns: Data.columns2,
      isShowAdd: false,
      allDevice: null,
      sortDevice: null
      /* labelPosition: 'right',
      radio: '1',

      format: "yyyy-MM-dd hh:mm:ss",

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
      isShowTable: false,
      chartData: null,
      noneInfoLength: 2 */
    }),
    methods: {
      displayEditCard () {
        this.isShowAdd = false
      },
      displayAddCard () {
        this.isShowAdd = true
      },
      selectAllDevice () {
      },
      menuSelect (value) {
        console.log('menuSelect : ' + typeof(value) + value)
        this.data = this.sortDevice[value]
      }
      /* exportCSV () {
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
      handleSizeChange (val) {
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
        })
      },
      showChart (data) {
        console.log(data)
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
          console.log('colorName : ' + colorName)
          let newColor = chartColors[colorName]
          console.log('colorName : ' + newColor)
          let newData = this.getNewDatasets(keys[i],arr[i], newColor)
          console.log(newData)
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
        console.log('data : ' + JSON.stringify(data))
        console.log(typeof this.start + ' : ' + this.start)
        console.log(typeof this.end + ' : ' + this.end)
        var d1 = new Date(this.start)
        var d2 = new Date(this.end)
        console.log('d1.getTime()  = ' + d1.getTime())
        console.log('d2.getTime()  = ' + d2.getTime())
        var filename = this.target[1]
        if(this.start === '' && this.start === '') {
          filename = filename + '.csv'
        } else if (d1.getTime() === d2.getTime() ) {
          console.log('this.info.from === this.info.to')
          filename = filename + this.end + '.csv'
        } else {
          console.log('this.info.from !== this.info.to')
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
        console.log('target : ' + JSON.stringify(target))
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
        console.log('$ fileMame : ' + fileName)
        link.download = fileName
        link.href = 'data:text/csv;charset=utf-8,\ufeff' + fileContents
        link.click()
      } */
    },
    asyncData: async function ({app, error, store}) {
      console.log('#############################')
      try {
        var url = 'http://localhost:8000/map/v1/'
        var url2 = 'http://localhost:8000/device/v1/sensor/3'
        var token = store.state.authUser.authToken
        const [list, list2] = await Promise.all([
          getMapList(app, url, {token: token}).then(res => res.data),
          getDeviceList(app, url2, {token: token}).then(res => res.data)
        ])
        var deviceList = list2.mList
        var mData = []
        var mDevice = {}
        for (let i = 0; i < deviceList.length; ++i) {
          let device = deviceList[i]
          let tmp = {
            macAddr: device.device_mac,
            name: device.device_name,
            active_status: device.device_status,
            active_time: device.device_active_time,
            status: device.statusDesc,
            type: device.fport
          }
          console.log('tmp : ' + JSON.stringify(tmp))
          mData.push(tmp)
          if (mDevice[device.fport] === undefined) {
            mDevice[device.fport] = []
          }
          mDevice[device.fport].push(tmp)
          console.log(mData)
          console.log(mDevice)
        }
        store.dispatch('set_map', list.data)
        return {
          mapList: list.data,
          deviceList: list2.mList,
          allData: mData,
          sortDevice: mDevice
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
