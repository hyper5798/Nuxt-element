<template>
  <div>
    <panel-group :data="panelData" @click-panel="handleSetPath"></panel-group>
    <weather-group :data="eventList " @click-panel="handleSetPath"></weather-group>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getMapList, getDeviceList, getEventList, getUserList} from '~/tools/api'
  import PanelGroup from '~/components/Dashboard/PanelGroup.vue'
  import WeatherGroup from '~/components/Dashboard/WeatherGroup.vue'
  import ElContainer from "../node_modules/element-ui/packages/container/src/main.vue";
  export default {
    middleware: 'auth',
    components: {
      ElContainer,
      PanelGroup,
      WeatherGroup
    },
    computed: {
      ...mapGetters([
        'authUser'
      ])
    },
    data () {
      return {}
    },
    methods: {
      handleSetPath(path) {
        this.$router.push(path)
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
        var token = store.state.authUser.authToken
        var json = {"token": token, "macAddr":"0000000005010be6","extra.fport":6, "limit": 100}

        const [list, list2, list3, list4] = await Promise.all([
          getMapList(app, {token: token}).then(res => res.data),
          getDeviceList(app, {token: token}).then(res => res.data),
          getUserList(app, {token: token}).then(res => res.data),
          getEventList(app, json).then(res => res.data)
        ])
        console.log(list2)
        console.log(list3)
        console.log(list4)
        var infoLength = 0
        var info2Length = 0
        var info3Length = 0
        var myMapList = null
        var myDeviceList = null
        var myEventList = null
        var myUserList = null

        if (list.responseCode === '401') {
          alert('帳戶沒有權限取得裝置類型資料!')
        } else if (list.responseCode === '000'  ) {
          myMapList = list.data
        }
        if (list2.responseCode === '401'  ) {
          alert('帳戶沒有權限取得裝置資料!')
        } else if (list2.responseCode === '000') {
          myDeviceList = list2.mList
          info2Length = myDeviceList.length
        }
        if (list3.responseCode === '401'  ) {
          alert('帳戶沒有權限取得使用者資料!')
        } else if (list3.responseCode === '000'  ) {
          myUserList = list3.users
          info3Length = myUserList.length
        }
        if (list4.responseCode === '401') {
          alert('帳戶沒有權限取得歷史資料!')
        } else if (list4.responseCode === '000') {
          myEventList = list4.data
          infoLength = myEventList.length
        }
        return {
          mapList: myMapList,
          deviceList: myDeviceList,
          userList: myUserList,
          eventList: myEventList,
          panelData: {
            info1: infoLength,
            info2: info2Length,
            info3: info3Length,
            info4: 0
          }
        }
      } catch (err) {
        error(err)
      }
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  el-row:last-child {
    margin-bottom: 0;
  }
  .card-panel {
    width: auto;
    height: 90px;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 3px 3px  grey;
    text-align:center;
    padding: 5px 5px 5px 5px;
  }
  .card-panel:hover {
    box-shadow: 5px 5px brown;
  }
  .my-panel {
    margin: 10px;
    background: #fff;
  }
  .icon-people {
    flex-direction: column;
    align-items: center;
    color: #40c9c6;
  }
  .icon-people:hover {
    background: #40c9c6;
    color: #ffffff;
  }
  .icon-device {
    color: #36a3f7;
  }
  .icon-device:hover {
    background: #36a3f7;
    color: #ffffff;
  }
  .icon-type {
    color: #ac00e6;
  }
  .icon-type:hover {
    background: #ac00e6;
    color: #ffffff;
  }
  .icon-notify {
    color:  #ff9900;
  }
  .icon-notify:hover {
    background:  #ff9900;
    color: #ffffff;
  }

</style>
