<template>
  <div class="main">
    <el-container >
      <el-header class="header">
        <div class="navbar-left">
          <span class="mark">Gemtek</span>
          <el-button class="barBtn" type="info" icon="el-icon-tickets" circle @click="toggleSideBar"></el-button>
        </div>
        <el-row class="navbar-right">
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-row>

      </el-header>
      <el-container>
        <el-aside v-if="sidebar" width="200px" class="aside">
          <el-menu :default-active="$route.path"
                   theme="dark"
                   background-color="#f2f2f2"
                   router>
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item index="/"><i class="el-icon-menu"></i>首頁</el-menu-item>
            <el-menu-item index="/find"><i class="el-icon-search"></i>查詢</el-menu-item>
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
      opened: true
    }),
    computed: {
      ...mapGetters([
        'sidebar'
      ])
    },
    methods: {
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
    background-color:#d9d9d9;
  }
  .header {
    background-color:#409EFF;
    color: #ffffff;
    line-height: 60px;
    text-align: right;
    font-size: 18px;
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
