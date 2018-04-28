<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="weather-panel" >
          <Gauge :label="temperature.title"
                 :value="tempValue"
                 :min="temperature.min_value"
                 :max="temperature.max_value"
                 :alert-min="temperature.min_alert_value"
                 :alert-max="temperature.max_alert_value"
                 :peng-name="temperature.title"
                 field-name="溫度計"
                 class="gauge-form"></Gauge>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="weather-panel">

          <Gauge :label="humidity.title"
                 :value="humValue"
                 :min="humidity.min_value"
                 :max="humidity.max_value"
                 :alert-min="humidity.min_alert_value"
                 :alert-max="humidity.max_alert_value"
                 :peng-name="humidity.title"
                 field-name="溼度計"
                 class="gauge-form"></Gauge>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="weather-panel">
          <event-card :chartData="tempData"></event-card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="weather-panel">
         <event-card :chartData="humData"></event-card>
        </div>
      </el-col>
    </el-col>
    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
       <div class="weather-panel2">
         <weather-card :data="weatherResult"></weather-card>
       </div>
    </el-col>
  </el-row>
</template>

<script>
  import Gauge from '~/components/Gauge/Gauge.vue'
  import EventCard from '~/components/charts/EventCard'
  import WeatherCard from '~/components/Weather/WeatherCard'
  import { emptyData, COLORS, chartColors } from '~/components/charts/chart-data'
  import { toGet} from '~/tools/api'
  import {conditionText} from '~/components/Weather/weatherData.js'
  export default {
    components: {
      Gauge,
      EventCard,
      WeatherCard
    },
    data () {
      return {
        humidity : {
          title: '溼度計檢測',
          value: this.humValue,
          min_value: 0,
          max_value: 100,
          min_alert_value: 80,
          max_alert_value: 100
        },
        temperature: {
          title: '溫度計檢測',
          value: this.tempValue,
          min_value: -50,
          max_value: 50,
          min_alert_value: 0,
          max_alert_value: 30
        },
        tempData: null,
        humData:null,
        tempValue: 0,
        humValue: 0,
        weatherResult: null
      }
    },
    props: {
      data : null
    },
    mounted () {
      this.showLineChart()
      this.queryWeather()
    },
    methods: {
      onClickPanel(path) {
        this.$emit('click-panel', path)
      },
      showLineChart () {
        console.log(this.data)
        if(this.data === null || this.data.length === 0) {
          return;
        }
        var tempArr = []
        var humArr = []
        var mLables = []
        for (let i = 0; i < this.data.length; ++i) {
          let event = this.data[i]
          mLables.push(new Date(event.date))
          tempArr.push(event.information.temperature)
          humArr.push(event.information.humidity)
          if (i === 0) {
            this.tempValue = event.information.temperature
            this.humValue = event.information.humidity
            // console.log('this.tempValue : ' + this.tempValue)
            // console.log('this.humValue : ' + this.humValue)
          }
        }
        this.tempData = this.getChartData (mLables, '溫度', tempArr, 2)
        this.humData = this.getChartData (mLables, '濕度', humArr, 4)
        console.log('** ' + JSON.stringify(this.tempData))
      },
      getChartData (time, title, arr, colorIndex) {
        var myDatasets = []
        var colorNames = Object.keys(chartColors)
        let colorName = colorNames[colorIndex]
        let newColor = chartColors[colorName]
        let newData = this.getNewDatasets(title, arr, newColor)
        // console.log(newData)
        myDatasets.push(newData)
        var dataTemp = {
          labels: time,
          datasets: myDatasets
        }
        return dataTemp
      },
      getNewDatasets (label, arr, newColor) {
        var newDataset = {
          label: label,
          borderColor: newColor,
          backgroundColor: newColor,
          fill: false,
          data: arr
        }
        return newDataset
      },
      color: function(index) {
        return COLORS[index % COLORS.length];
      },
      async queryWeather () {
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const endpoint = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='Hualien') and u='c'&format=json";
        // const endpoint = "https://query.yahooapis.com/v1/public/yql?q=select * from json where url=\"http://m.weather.com.cn/data/101210101.html\"&format=json"
        /* const yapi = await this.$axios.get({
          url: proxyurl + endpoint,
          // url: endpoint
        }); */
        await this.$axios.get(endpoint).then(res => {
          console.log('!!!!!!!!!!!!!!')
          console.log(res.data.query)
          this.weatherResult = res.data.query
          if (res.data.query) {
            var con = res.data.query.results.channel.item.condition
            console.log(conditionText)
            console.log(con.text)
            this.weatherResult = {condition:{}}
            this.weatherResult.condition.text = conditionText[con.text]
            this.weatherResult.condition.temp = con.temp
            console.log('conText : ' + con.text)
          }
        })
      }
    }
  }
</script>

<style>
  .weather-panel {
    width: auto;
    height: 250px;
    border-radius: 5px;
    background-color: #f2f2f2;
    box-shadow: 3px 3px  grey;
    text-align:center;
    padding: 5px 5px 5px 5px;
    margin-bottom: 10px;
    // background: url('~static/img/bg_sun.jpg') ;
  }

  .weather-panel2 {
    width: auto;
    height: 520px;
    border-radius: 5px;
    background-color: #f2f2f2;
    box-shadow: 3px 3px  grey;
    text-align:center;
    padding: 5px 5px 5px 5px;
    margin-bottom: 10px;
    background: url('~static/img/bg_clouds.jpg') ;
    -moz-background-size:auto;        /*for Firefox*/
    -webkit-background-size:auto;        /*for Google Chrome、Safari*/
    -o-background-size:auto;        /*for Opera*/
    // background-size:400px 530px;        /*for IE*/
    background-size:auto;
  }
  .gauge-panel {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #efeeee;
  }
  .gauge-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    height: 250px;
    border-radius: 10px;
  }


</style>
