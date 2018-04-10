<template>
  <el-row >
    <el-col :span="24">
      <!--<div>
        <bar-chart :data="lineData" :options="{ maintainAspectRatio: false }"/>
      </div>
      <div class="col-md-8 chart-view">
        <line-chart :chart-data="lineData" :options="options"/>
      </div> -->
      <event-chart></event-chart>
    </el-col>
  </el-row>
</template>
rt
<script>
  import EventChart from '~/components/charts/EventChart'
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
    middleware: 'auth',
    components: {
      EventChart
    },
    data () {
      return {
        options: options
      }
    },
    async asyncData ({ app, params, store, isServer, error }) {
      try {
        console.log('********************************')
        console.log(isServer)
        console.log(store)
        console.log(params)
        const { data } = await app.$axios.get(`todos/bindlist`)
        return {
          newList: data,
          lineData: {
            labels: ['0', '', '', '', '', '', '12'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: '#c2c2d6',
                borderColor: 'rgba(255,255,255,.55)',
                data: [65, 59, 84, 84, 51, 55, 40]
              }
            ]
          },
          myoptions: options
        }
      } catch (err) {
        error('活動不存在')
      }
    }
  }
</script>
