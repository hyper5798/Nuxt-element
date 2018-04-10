<template>
  <div class="chart-info">
    <v-layout row wrap>
      <v-flex md12>

        <v-btn
          absolute
          dark
          small
          fab
          top
          right
          color="black"
          @click="clickClose"
        >X
        </v-btn>

        <img class="topimg" src="~/static/img/agricultural.jpg" />
        <div class="data-title">
          <h2>
            裝置 :<small>{{' ' + params.name}}</small>
          </h2>
        </div>
      </v-flex>
    </v-layout>
    <hr>
    <v-layout row wrap>

      <v-flex md4>
        溫度{{tmp}}°C
        <v-layout row wrap>
          <v-flex md6 >
            <v-avatar size="24px"  class="red" dark>
              <v-icon dark>arrow_upward</v-icon>
            </v-avatar>
            {{tmpMax}}°C
          </v-flex>
          <v-flex md6 >
            <v-avatar size="24px"  class="blue" dark>
              <v-icon dark>arrow_downward</v-icon>
            </v-avatar>
            {{tmpMin}}°C
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md8>
        <daily-income
          :chartData = "tmpData"
          :options= "myOptions"
          :height = "80"
        ></daily-income>
      </v-flex>
    </v-layout>
    <hr>
    <v-layout row wrap>
      <v-flex md4>
        水含量
        {{water}}%
        <v-layout row wrap>
          <v-flex md6 >
            <v-avatar size="24px"  class="red" dark>
              <v-icon dark>arrow_upward</v-icon>
            </v-avatar>
            {{waterMax}}%
          </v-flex>
          <v-flex md6 >
            <v-avatar size="24px"  class="blue" dark>
              <v-icon dark>arrow_downward</v-icon>
            </v-avatar>
            {{waterMin}}°C
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md8>
        <daily-income
          :chartData = "waterData"
          :options= "myOptions"
          :height = "80"
        ></daily-income>
      </v-flex>
    </v-layout>
    <hr>

    <v-layout row wrap>
      <v-flex md4>
        酸鹼值{{ph}}%
        <v-layout row wrap>
          <v-flex md6 >
            <v-avatar size="24px"  class="red" dark>
              <v-icon dark>arrow_upward</v-icon>
            </v-avatar>
            {{phMax}}
          </v-flex>
          <v-flex md6 >
            <v-avatar size="24px"  class="blue" dark>
              <v-icon dark>arrow_downward</v-icon>
            </v-avatar>
            {{phMin}}
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md8>
        <daily-income
          :chartData = "phData"
          :options= "myOptions"
          :height = "80"
        ></daily-income>
      </v-flex>
    </v-layout>
    <hr>

    <v-layout row wrap>
      <v-flex md4>
        電導度{{ec}}
        <v-layout row wrap>
          <v-flex md6 >
            <v-avatar size="24px"  class="red" dark>
              <v-icon dark>arrow_upward</v-icon>
            </v-avatar>
            {{ecMax}}
          </v-flex>
          <v-flex md6 >
            <v-avatar size="24px"  class="blue" dark>
              <v-icon dark>arrow_downward</v-icon>
            </v-avatar>
            {{ecMin}}
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md8>
        <daily-income
          :chartData = "ecData"
          :options= "myOptions"
          :height = "80"
        ></daily-income>
      </v-flex>
    </v-layout>
    <hr>
  </div>
</template>
<script>
  import DailyIncome from './/DailyIncome'
  // import {getDatas} from '../../api/todos'
  const data = {
    labels: ['0', '', '', '', '', '', '12'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: '#c2c2d6',
        borderColor: 'rgba(255,255,255,.55)',
        data: [65, 59, 84, 84, 51, 55, 40]
      }
    ]
  }
  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: 'black'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'black'
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 5
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  }
  export default {
    name: 'charts-info',
    props: {
      params: Object
    },
    components: {
      DailyIncome
    },
    data () {
      return {
        ecData: data,
        phData: data,
        tmpData: data,
        waterData: data,
        tmpMax: 10,
        tmpMin: 10,
        phMax: 10,
        phMin: 10,
        ecMax: 10,
        ecMin: 10,
        waterMax: 10,
        waterMin: 10,
        tmp: 10,
        ph: 10,
        ec: 10,
        water: 10,
        myOptions: options
      }
    },
    watch: {
      params (val) {
        if (val) {
          console.log('watch :  params val: ' + JSON.stringify(val))
          this.updateChart(val)
        }
      }
    },
    /* mounted () {
      this.fillData()
    }, */
    methods: {
      /* fillData () {
        console.log('***************************************************')
        this.conData = data
        this.phData = data
        this.tmpData = data
        this.waterData = data
      }, */
      updateChart (val) {
        console.log('test val : ' + JSON.stringify(val))
        /* getDatas({mac: val.mac}).then(response => {
          var datas = response.data
          console.log('datas : ' + JSON.stringify(datas))
          var time = []
          // console.log('*************** last')
          var now = new Date()
          var last = now.getHours() + ':' + now.getMinutes()
          if (Object.keys(datas).length === 0) {
            time.push('00:01')
            time.push(last)
            var empty = [0, 0]
            datas.temperature = empty
            datas.water = empty
            datas.ph = empty
            datas.ec = empty
            this.phMax = null
            this.phMin = null
            this.waterMax = null
            this.waterMin = null
            this.tmpMax = null
            this.tmpMin = null
            this.ecMax = null
            this.ecMin = null
            this.tmp = null
            this.ph = null
            this.water = null
            this.ec = null
          } else {
            var length = datas.time.length
            this.phMax = this.getMaxOfArray(datas.ph)
            this.phMin = this.getMinOfArray(datas.ph)
            this.waterMax = this.getMaxOfArray(datas.water)
            this.waterMin = this.getMinOfArray(datas.water)
            this.tmpMax = this.getMaxOfArray(datas.temperature)
            this.tmpMin = this.getMinOfArray(datas.temperature)
            this.ecMax = this.getMaxOfArray(datas.ec)
            this.ecMin = this.getMinOfArray(datas.ec)
            this.tmp = (datas.temperature)[0]
            this.ph = (datas.ph)[0]
            this.water = (datas.water)[0]
            this.ec = (datas.ec)[0]
            console.log('temperature max : ' + this.tmpMax + ' , min : ' + this.tmpMin)
            console.log('ph max : ' + this.phMax + ' , min : ' + this.phMin)
            console.log('water max : ' + this.waterMax + ' , min : ' + this.waterMin)
            console.log('ec max : ' + this.ecMax + ' , min : ' + this.ecMin)
            for (var i = 0; i < length; i++) {
              if (i === 0) {
                time.push('00:01')
              } else if (i === (length - 1)) {
                time.push(last)
              } else {
                time.push('')
              }
            }
          }
          // console.log('time : ' + time.length + '=>' + JSON.stringify(time))
          console.log('con : ' + datas.temperature.length + '=>' + JSON.stringify(datas.temperature))
          const dataTemp = {
            labels: time,
            datasets: [
              {
                label: '溫度',
                backgroundColor: '#c2c2d6',
                borderColor: 'rgba(255,255,255,.55)',
                data: datas.temperature
              }
            ]
          }
          const dataWater = {
            labels: time,
            datasets: [
              {
                label: '土壤水含量',
                backgroundColor: '#c2c2d6',
                borderColor: 'rgba(255,255,255,.55)',
                data: datas.water
              }
            ]
          }
          const dataPh = {
            labels: time,
            datasets: [
              {
                label: '酸鹼值',
                backgroundColor: '#c2c2d6',
                borderColor: 'rgba(255,255,255,.55)',
                data: datas.ph
              }
            ]
          }
          const dataCon = {
            labels: time,
            datasets: [
              {
                label: '電導度',
                backgroundColor: '#c2c2d6',
                borderColor: 'rgba(255,255,255,.55)',
                data: datas.ec
              }
            ]
          }
          this.tmpData = dataTemp
          this.waterData = dataWater
          this.phData = dataPh
          this.conData = dataCon
          console.log('child loading-finish')
          this.$emit('loading-finish')
        }).catch(function (error) {
          console.log(error)
        }) */
      },
      clickClose () {
        console.log('child click-close')
        this.$emit('click-close')
      },
      getMaxOfArray (numArray) {
        // console.log('getMaxOfArray => ' + numArray)
        return Math.max.apply(null, numArray)
      },
      getMinOfArray (numArray) {
        return Math.min.apply(null, numArray)
      }
    }
  }
</script>

<style>
  .chart-info{
    background-color: #e6f2ff;
    margin-top: 0px;
    margin-left: 0px;
    height: auto;
    width: auto;
    border-radius: 6px;
  }
  .data-title{
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .data-block{
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .chart-info img{
    widith: 230px;
    height: 60px;
    border-radius: 6px;
  }
  .block-icon-1{
    color: red;
  }
  .block-icon-2{
    color: #0088d2;
  }
  .topimg{
    margin-top: 10px;
    margin-left: 10px;
    width: 90%;
  }
  .chart-view {
    width: 60%;
    height: 80px;
  // background-color: yellow;
  }
</style>
