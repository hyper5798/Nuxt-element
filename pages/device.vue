<template>
  <div>
    <div v-if="authUser.role==='generalUser'" class="errMessage">
      !!!你沒有權限觀看此頁面!!!
      <br>請通知管理者更改權限
    </div>
    <el-row v-else  :gutter="20">
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
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
              <div class="text item">
                <h3><span>匯入Excel</span></h3>
                <input id="file1" type="file" @change="importf($event)" />
                <br>
                <br>
                <el-button  type="primary" @click="addNewDevice">新增裝置</el-button>
              </div>
            </el-card>

            <el-card v-if="!isShowAdd" class="box-card">
              <div slot="header" class="clearfix" @click="selectAllDevice">
                <span>全部裝置</span>
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
            </el-card>

          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
        <div class="BG-Average-Copy">
          <div class="bg-content">
            <div v-if="!isShowAdd">
              <device-table
                v-if="currentList"
                :list="currentList"
                @active-device="onActiveDevice"
                @edit-device="onUpdateDevice"
                @del-device="onDeleteDevice">
              </device-table>
              <span v-else><h1>尚無裝置!!!</h1></span>
            </div>

            <div>
              <el-card v-if="isShowAdd" class="box-card">
                <div slot="header" class="clearfix">
                  <h3>匯入資料錯誤檢查</h3> # mac字元長度16字元,前8字元為00000000 #
                </div>
                <div class="text item">
                  <div id="demo"></div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getMapList, getDeviceList , addBatchDevice, activeDevice, updateDevice, deleteDevice} from '~/tools/api'
  import DeviceTable from '~/components/table/DeviceTable.vue'
  import Data from '~/components/table/data'
  import { toYMD } from '~/tools/time'
  import { mapGetters } from 'vuex'
  import XLSX from 'xlsx'
  var newList = null
  var isEnableNew = false

  export default {
    middleware: 'auth',
    components : {
      DeviceTable
    },
    computed: {
      ...mapGetters([
        'authUser'
      ])
    },
    data: () => ({
      data: this.allDevice,
      columns: Data.columns2,
      isShowAdd: false,
      currentList: null,
      allDevice: null,
      sortDevice: null
    }),
    methods: {
      addNewDevice () {
        if (!isEnableNew && newList === null) {
          this.$notify({
            title: '警告',
            message: '尚未匯入資料',
            type: 'warning'
          })
        } else if (!isEnableNew && newList !== null) {
          this.$notify({
            title: '警告',
            message: '資料不正確或者匯入資料已按新增裝置,若要再新增請匯入資料!',
            type: 'warning'
          })
        } else {
          isEnableNew = false
          this.toAddNewDevice()
        }
      },

      async toAddNewDevice () {
        // alert('toAddNewDevice')
        var list = []
        for (let i =0; i< newList.length; ++i) {
          list.push(newList[i]['mac'])
        }
        var json = {token: this.authUser.authToken, list: list, type: 'LoRaM'}
        await addBatchDevice(this, json).then(result => {
          // console.log(result)
          if (result.responseCode === '000') {
            this.$notify({
              title: '成功',
              message: '新增裝置成功',
              type: 'success'
            })
            this.reloadDevice()
          } else {
            this.$notify({
              title: '警告',
              message: result.responseMsg,
              type: 'warning'
            })
          }
        })
      },    importf (event) {
        isEnableNew = false
        document.getElementById("demo").innerHTML= ''
        // console.log(event)
        if(!event.target.files) {
          return
        }
        var f = event.target.files[0]
        var reader = new FileReader()
        var wb = null
        var rABS = false
        var checkList = []
        var repeatList = []
        reader.onload = function(e) {
          var data = e.target.result
          if(rABS) {
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(data, {
              type: 'binary'
            })
          }
          newList = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          // alert(newList)
          var errArr = []
          for (let i = 0 ; i < newList.length ; ++i) {
            let check = newList[i]['mac']
            // console.log(check)
            let check2 = check.slice(0, 8)
            if (check.length !== 16 || check2 !== '00000000') {
              errArr.push(check)
            } else {
              // console.log(check + ' > ' + checkList.indexOf(check))
              if (checkList.indexOf(check) > -1) {
                repeatList.push(check)
              } else {
                checkList.push(check)
              }
            }
          }
          var repeatString = repeatList.toString()
          var errString = errArr.toString()
          // console.log(typeof errString + ' : ' + errString )
          if (errString.length === 0 && repeatString.length === 0) {
            errString = '檢查結果 : 所有裝置識別碼(mac)檢查 OK'
            isEnableNew = true
            this.isEnableNew = true
          } else {
            if (errString.length > 0 && repeatString.length === 0) {
              errString = '檢查結果 : <br>部分裝置識別碼(mac)不正確,請更正後重新匯入<br>不正確名單: ' +  errString
            } else if (errString.length === 0 && repeatString.length > 0) {
              errString = '檢查結果 : <br>部分裝置識別碼(mac)重複,請更正後重新匯入<br>重複名單    : ' +  repeatString
            } else {
              errString = '檢查結果 : <br>部分裝置識別碼(mac)不正確及重複,請更正後重新匯入' +
                                           '<br>不正確名單: ' +  errString +
                                           '<br>重複名單: ' +  repeatString
            }
            document.getElementById('file1').value = "";
          }
          document.getElementById("demo").innerHTML= errString
          wb = null
        }
        if(rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      displayEditCard () {
        this.isShowAdd = false
      },
      displayAddCard () {
        this.isShowAdd = true
      },
      selectAllDevice () {
        if (this.allDevice) {
          this.currentList = this.allDevice
        }
      },
      menuSelect (value) {
        // console.log('menuSelect : ' + typeof(value) + value)
        this.toSortDevice()
        this.currentList = this.sortDevice[value]
      },
      toSortDevice () {
        if (this.allDevice === null) {
          // console.log('this.currentList : ' + JSON.stringify(this.currentList))
          this.allDevice = JSON.parse(JSON.stringify(this.currentList))
          // console.log('this.allDevice : ' + JSON.stringify(this.allDevice))
          var tmp = {}
          for (let i=0; i < this.allDevice.length ; ++i) {
            let type = this.allDevice[i].fport
            if (tmp[type] === undefined) {
              tmp[type] = []
            }
            tmp[type].push(this.allDevice[i])
            // console.log('tmp : ' + JSON.stringify(tmp))
          }
          this.sortDevice = tmp
        }
      },
      async onActiveDevice (index) {
        this.toSortDevice()
        var device = this.currentList[index]
        // alert('onActiveDevice : ' + JSON.stringify(this.currentList))
        var json = {'token': this.authUser.authToken, 'd': device.device_mac, 'agri': 'true',name: device.device_name}
        // alert('onActiveDevice : ' + JSON.stringify(json))
        await activeDevice(this, json).then(result => {
          // console.log(result)
          if (result.responseCode === '000') {
            device.device_status = 3
            device.statusDesc = 'in used'
            this.$notify({
              title: '成功',
              message: '更新啟用成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '警告',
              message: result.responseMsg,
              type: 'warning'
            })
          }
        })
      },
      async reloadDevice () {
        await getDeviceList(this, {token: this.authUser.authToken}).then(res => {
          // alert(JSON.stringify(res.data.mList))
          this.currentList = res.data.mList
          this.isShowAdd = false
          // alert(this.isShowAdd)
        })
      },
      async onUpdateDevice (index) {
        this.toSortDevice()
        var device = this.currentList[index]
        var json = {token: this.authUser.authToken, d: device.device_mac, name: device.device_name}
        // alert(JSON.stringify(json))
        await updateDevice(this, json).then(result => {
          // console.log(result)
          if (result.responseCode === '000') {
            this.$notify({
              title: '成功',
              message: '更新裝置成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '警告',
              message: result.responseMsg,
              type: 'warning'
            })
          }
        })
      },
      async onDeleteDevice (index) {
        this.toSortDevice()
        // alert(JSON.stringify(this.currentList[index]))
        var id = this.currentList[index].deviceId
        var mac = this.currentList[index].device_mac
        var name = this.currentList[index].device_name
        var json = {token: this.authUser.authToken, delDeviceId: id, mac: mac, name: name}
        // alert(JSON.stringify(json))
        await deleteDevice(this, json).then(result => {
          if (result.responseCode === '000') {
            var device = this.currentList[index]
            if (device.fport > 0) {
              if (this.sortDevice[device.fport].length === this.currentList.length) {
                this.currentList.splice(index, 1)
                this.sortDevice[device.fport].splice(index, 1)
              } else {
                this.currentList.splice(index, 1)
                this.allDevice.splice(index, 1)
              }
            } else {
              this.currentList.splice(index, 1)
              this.allDevice.splice(index, 1)
            }

            this.$notify({
              title: '成功',
              message: '刪除裝置成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '警告',
              message: result.responseMsg,
              type: 'warning'
            })
          }
        })
      }
    },
    asyncData: async function ({app, error, store}) {
      // console.log('#############################')
      try {
        var token = store.state.authUser.authToken
        const [list, list2] = await Promise.all([
          getMapList(app, {token: token}).then(res => res.data),
          getDeviceList(app, {token: token}).then(res => res.data)
        ])

        store.dispatch('set_map', list.data)
        return {
          mapList: list.data,
          currentList: list2.mList,
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
