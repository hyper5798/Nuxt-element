<template>
  <div class="main">
    <el-container >
      <el-header class="header">
        <div class="navbar-left">
          <span class="mark">Gemtek</span>
          <el-button class="barBtn"
                     icon="el-icon-tickets"
                     circle
                     @click="toggleSideBar">
          </el-button>
          <el-button v-if="!isCollapse"
                     icon="el-icon-arrow-left"
                     circle
                     @click="miniMenu">
          </el-button>
          <el-button v-else
                       icon="el-icon-arrow-right"
                       circle
                       @click="maxMenu">
          </el-button>
        </div>
        <el-row class="navbar-right">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          {{authUser.userInfo.name}}
        </el-row>

      </el-header>
      <el-container>
        <el-aside v-if="sidebar" width="{'60px': !isCollapse, '200px': isCollapse}" class="aside">
          <el-menu class="el-menu-vertical-demo"
                   :default-active="$route.path"
                   router
                   @open="handleOpen"
                   @close="handleClose"
                   :collapse="isCollapse">
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <span slot="title">首頁</span>
            </el-menu-item>
            <el-menu-item index="/find">
              <i class="el-icon-search"></i>
              <span slot="title">查詢</span>
            </el-menu-item>
            <el-menu-item index="/device">
              <i class="el-icon-edit"></i>
              <span slot="title">裝置</span>
            </el-menu-item>
            <!--<el-menu-item index="/test">
              <i class="el-icon-edit"></i>
              <span slot="title">測試</span>
            </el-menu-item>-->
          </el-menu>
        </el-aside>
        <el-main>
          <nuxt/>
        </el-main>
      </el-container>
      <el-container class="footer">
        <el-footer>Gemtek 2017~2018 @copyright</el-footer>
      </el-container>
    </el-container>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      opened: false,
      isCollapse: true
    }),
    computed: {
      ...mapGetters([
        'authUser',
        'sidebar'
      ])
    },
    methods: {
      miniMenu () {
        this.isCollapse = true
      },
      maxMenu () {
        this.isCollapse = false
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      },
      toggleSideBar() {
        this.$store.dispatch('toggleSidebar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      }
    }
  }
</script>

<style>
  .main {
    width: 100%;
    height: 100%;
    border: 1px;
    solid: #eee;
    background-color:#e6e6e6;
  }
  .header {
    background-color:#409EFF;
    color: #ffffff;
    line-height: 60px;
    text-align: right;
    font-size: 18px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 600px;
  }
  .mark {
    mer
    font-size: 36px;
  }

  .aside {
    background-color: #f2f2f2;
    color: #333;
    min-height: 500px;
  }
  .footer {
    background-color:  #e6e6e6;
    color: #333;
    text-align: right;
    font-size: 12px;
  }
  .navbar-left {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    background-color:#409EFF;
    color: #ffffff;
    float: left;
    padding: 0 10px;
  }
  .mark {
    height: 50px;
    line-height: 50px;
    height: 50px;
    width: 200px;
    font-size: 36px;
  }

  .barBtn {
    margin-left: 50px;
  }
  .navbar-right {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    background-color:#409EFF;
    color: #ffffff;
    float: right;
  }
</style>
