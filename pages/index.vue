<template>
    <el-row class="panel-group" :gutter="20">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <i class="fa fa-users fa-4x"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">目前帳戶</div>
            <h3>5</h3>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-message">
            <i class="fa fa-adjust fa-4x"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">支援裝置類型</div>
            <h3>3</h3>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <i class="fa fa-wifi fa-4x"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">已啟用裝置</div>
            <h3>3</h3>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-shoppingCard">
            <i class="fa fa-envelope fa-4x"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">本周收到資訊</div>
            <h3>2030</h3>
          </div>
        </div>
      </el-col>
      <el-row>
        <el-col :span="6" :gutter="20">
          <div class="BG-Average">
            <el-card class="box-card">
              <el-row>
                <el-col :span="8">目前帳戶 :</el-col>
                <el-col :span="16">{{authUser.userInfo.name}}</el-col>
                <el-col :span="24" class="card-panel-col">
                  {{authUser}}
                </el-col>
              </el-row>


            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'

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
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 18px;
    .card-panel-col{
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
</style>
