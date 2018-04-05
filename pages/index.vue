<template>
  <el-row>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </el-row>
</template>

<script>
</script>

<style>
    .el-dropdown-menu {
      margin-top: 20px;
    }
    .db-header {
      width: 100%;
      height: 60px;
      background: #20A0FF;
      padding: 13px 20px;
      box-sizing: border-box;
      color: #ffffff;
      z-index: 99;
      position: fixed;
      left: 0;
      top: 0;
    }
      .logo{
        font-size: 2.4rem;
      }

      .user-info {
        float: right;
      }
        img {
          width: 25px;
          height: 25px;
          vertical-align: -7px;
          margin: 0 0 0 10px;
          cursor: pointer;
        }

      .db-menu-wrapper {
        position: fixed;
        left: 0;
        top: 60px;
        background: red;
        height: 100%;
        overflow: auto;
        z-index: 98;
      }
      .db-menu-bar {
        height: 100%;
        flex-grow: 0;
        width: 200px;
      }

      .db-content-wrapper {
        width: 100%;
        z-index: 97;
        box-sizing: border-box;
        padding: 60px 0px 0px 200px;
      }
        .db- content {
          padding: 25px;
        }
        .db-content-inner {
          padding: 30px 0px;
        }

</style>
