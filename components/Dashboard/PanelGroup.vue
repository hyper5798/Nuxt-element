<template>
  <el-row :gutter="20">
    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
      <div class="card-panel" @click="onClickPanel('/find')">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class ="my-panel icon-type">
              <i class="fa fa-envelope fa-5x"></i>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel2">
              本周訊息
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel3">
              {{data.info1}}
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
      <div class="card-panel" @click="onClickPanel('/device')">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class ="my-panel icon-device">
              <i class="fa fa-eye fa-5x"></i>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel2">
              加入裝置
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel3">
              {{data.info2}}
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
      <div class="card-panel" @click="onClickPanel('/account')">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class ="my-panel icon-people">
              <i class="fa fa-users fa-5x"></i>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel2">
              加入帳戶
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel3">
              {{data.info3}}
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
      <div class="card-panel" @click="onClickPanel('/log')">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class ="my-panel icon-notify">
              <i class="fa fa-bell fa-5x"></i>
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel2">
              通知事件
            </div>
          </el-col>
          <el-col :span="12">
            <div class ="my-panel3">
              {{data.info4}}
            </div>
          </el-col>\
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getMapList, getDeviceList, getEventList, getUserList} from '~/tools/api'
  export default {
    data () {
      return {
      }
    },
    props: {
        data : {
          info1: 5,
          info2 : 10,
          info3: 3,
          info4: 4
        }
    },
    methods: {
      onClickPanel(path) {
        this.$emit('click-panel', path)
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
    margin-bottom: 10px;
  }
  .card-panel:hover {
    box-shadow: 5px 5px brown;
  }
  .my-panel {
    margin: 10px;
    background: #fff;
  }
  .my-panel2 {
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    background: #fff;
  }
  .my-panel3 {
    font-size: 24px;
    text-align: center;
    line-height: 40px;
    background: #fff;
    color: #4d4dff;
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
