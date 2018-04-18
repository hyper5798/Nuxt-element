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
      }
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
        console.log(list4)

        return {
          mapList: list.data,
          deviceList: list2.mList,
          userList: list3.users,
          eventList: list4.data,
          panelData: {
            info1: list4.data.length,
            info2 : list2.mList.length,
            info3: list3.users.length,
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
