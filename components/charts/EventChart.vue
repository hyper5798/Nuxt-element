<template>
  <!--<div class="BG-Average">-->
    <div class="bg-white">
      <line-chart width="500" height="300" :chartData="chartData" :options="options"/>
    </div>
  <!--</div>-->
</template>

<script>
  import LineChart from './LineChart'
  import { chartColors, COLORS, options, options1 } from './chart-data'
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
    },
    methods : {
      showChart (data) {
        if(data === null || data.length === 0) {
          return;
        }
        var mLables = []
        var dataArr = []
        var count = data[1].length - 3
        console.log('count :' + count)
        for (let i = 0; i < data.length; i=i+2) {
          let obj = data[i]

          if (dataArr[0] === undefined) {
            for (let j = 0; j < count; ++j) {
              dataArr[j] = []
            }
          }
          for (let j = 0; j < count; ++j) {
            dataArr[j].push(Number(obj[j+3]))
          }

          mLables.push(new Date(obj[1]))
        }
        var fieldStr = document.getElementById('fields').value
        var fieldArr = fieldStr.split(',')
        console.log('dataArr length : ' + dataArr.length + '\n' +JSON.stringify(dataArr))
        console.log(JSON.stringify(mLables))
        console.log('fields' + JSON.stringify(fields))
        alert('chart data : ' + JSON.stringify(mLables))

        if (dataArr.length > 0) {
          // this.data.labels.push(newDate(this.config.data.labels.length))
          this.data.labels = mLables
          for (var index = 0; index < dataArr.length; ++index) {
            let newDataset = newDataSet(fieldArr[index], dataArr[index])
            //config.data.datasets[index].data = dataArr[index]
            this.data.datasets.push(newDataset)
            console.log(JSON.stringify(this.data.datasets[index].data))
          }
          // Update line chart
        }
      },
      getChartData (label, time, datasets) {
        var dataTemp = {
          labels: time,
          datasets: [
            {
              label: label,
              backgroundColor: 'rgba(0,102,255,0.2)',
              borderColor: '#1a75ff',
              data: data
            }
          ]
        }
        return dataTemp
      },
      getNewDatasets (label, newColor) {
        var newDataset = {
          label: label,
          borderColor: newColor,
          backgroundColor: this.color(newColor).alpha(0.5).rgbString(),
          data: [],
        };
        return newDataSets
      },
      color: function(index) {
        return COLORS[index % COLORS.length];
      }
    }
  }
</script>
