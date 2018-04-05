<template>
  <div class="main">
    <el-container >
      <el-header class="header">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu :default-active="$route.path"
                   theme="dark"
                   router>
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item index="/"><i class="el-icon-message"></i>test1</el-menu-item>
            <el-menu-item index="/login"><i class="el-icon-message"></i>test2</el-menu-item>

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

  .aside {
    background-color: #f2f2f2;
    color: #333;
    height: 800px;
  }
  .footer {
    background-color:  #e6e6e6;
    color: #333;
    text-align: right;
    font-size: 12px;
  }
</style>
