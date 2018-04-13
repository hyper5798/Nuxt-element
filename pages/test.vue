<template>
  <div>
    <el-row :gutter="20">
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
            </el-card>

          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
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
      displayEditCard() {
        this.isShowAdd = false
      },
      displayAddCard() {
        this.isShowAdd = true
      },
      selectAllDevice() {
      },
      menuSelect(value) {
        console.log('menuSelect : ' + typeof(value) + value)
        this.data = this.sortDevice[value]
      }
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
