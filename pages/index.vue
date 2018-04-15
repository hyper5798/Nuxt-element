<template>
  <el-row :gutter="20">
    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
      <div class="card-panel" @click="handleSetPath('/find')">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class ="my-panel icon-type">
              <i class="fa fa-envelope fa-5x"></i>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel">
              <h1>本周訊息</h1>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel">
              <h3>{{mapList.length}}</h3>
            </div>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
      <div class="card-panel" @click="handleSetPath('/device')">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class ="my-panel icon-device">
              <i class="fa fa-anchor fa-5x"></i>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel">
              <h1>已加入裝置</h1>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel">
              <h3>{{deviceList.length}}</h3>
            </div>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
      <div class="card-panel" @click="handleSetPath('/account')">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class ="my-panel icon-people">
              <i class="fa fa-users fa-5x"></i>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel">
              <h1>已加入帳戶</h1>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel">
              <h3>{{userList.length}}人</h3>
            </div>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
      <div class="card-panel" @click="handleSetPath('/log')">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class ="my-panel icon-notify">
              <i class="fa fa-bell fa-5x"></i>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel">
              <h1>通知事件</h1>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel">
              <h3>0</h3>
            </div>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getMapList, getDeviceList, getEventList, getUserList} from '~/tools/api'
  export default {
    middleware: 'auth',
    components: {
    },
    computed: {
      ...mapGetters([
        'authUser'
      ])
    },
    methods: {
      handleSetPath(path) {
        this.$router.push(path)
      }
    },
    asyncData: async function ({app, error, store}) {
      try {
        var token = store.state.authUser.authToken

        const [list, list2, list3] = await Promise.all([
          getMapList(app, {token: token}).then(res => res.data),
          getDeviceList(app, {token: token}).then(res => res.data),
          getUserList(app, {token: token}).then(res => res.data)
        ])

        return {
          mapList: list.data,
          deviceList: list2.mList,
          userList: list3.users
        }
      } catch (err) {
        error(err)
      }
    }
  }
</script>

<style>
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
