<template>
  <!--<div class="BG-Average">-->
  <div class="bg-white">
    <line-chart :width="300" :height="170" :chartData="chartData" :options="options"/>
  </div>
  <!--</div>-->
</template>

<script>
  import LineChart from './LineChart'
  import { chartColors, COLORS, options } from './chart-data'
  var colorNames = Object.keys(chartColors);
  export default {
    components : {
      LineChart
    },
    props: {
      chartData: null
    },
    data () {
      return {
        options: options
      }
    }
  }
</script>

<style>
  .chart-container {
    width: 300px;
    height:200px;
  }
</style>
