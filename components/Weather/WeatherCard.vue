<template>
  <div>
    <el-row v-if="data" :gutter="10">
      <div class="weatherBlock">
        <el-col :span="24">
          <div class="my-temp">
            {{data.condition.temp}}°C
          </div>
        </el-col>
        <el-col :span="24">
          <img class="my-image" src="~/static/img/cloudy.gif" />
          <div class="my-text">
            {{data.condition.text}}
          </div>
        </el-col>
        <el-col :span="6">
        </el-col>
      </div>
      <el-col :sapn="24" :sm="24" :md="24" :lg="6" :xl="6">

      </el-col>
    </el-row>
    <div v-else>
      無法查詢到氣象資料
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: null,
      conditionString: ''
    },
    data () {
      return {
        conditionText: {
          'Fine': '天晴',
          'Cloudy': '天陰',
          'Sunny': '陽光充沛',
          'Sunny Periods': '部分時間有陽光',
          'Sunny Intervals': '短暫時間有陽光',
          'Bright': '天色明朗',
          'Occasional Showers': '間中有驟雨',
          'Scattered Showers': '零散驟雨',
          'Isolated Showers': '局部地區性驟雨',
          'Squally Showers': '狂風驟雨',
          'Thundery Showers': '雷雨'
        }
      }
    }
  }
</script>

<style>
  .card-panel {
    width: auto;
    height: 90px;
    text-align:center;
    padding: 2px 2px 2px 2px;
    margin-bottom: 10px;
  }
  .card-panel:hover {
    box-shadw: 5px 5px brown;
  }
  .weatherBlock {
    color: #fff;
  }
  .my-temp {
    margin-left: 10px;
    font-size: 100px;
  }
  .my-image {
    margin-top: 10px;
  }
  .my-text {
    margin-top: 20px;
    color: #fff;
    font-size: 40px;
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
