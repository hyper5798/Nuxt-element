<template>
  <div class="scrollit">
    {{list}}
    <table border="1">
      <thead>
        <tr class="mytable-title">
          <th >項目</th>
          <th >識別碼</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(device, index) in list" :key="device.macAddr">
          <td>
            {{ index + 1}}
          </td>
          <td>
            <span>{{device.mac}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

  export default {
    name: 'new-device-table',
    props: {
      list: null
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>
<style>
  .mytable-title {
    color: #FFFFFF;
    text-decoration: none;
    background-color: #0088d2;
  }
  .scrollit {
    overflow:scroll;
    width: 100%;
    height:600px;
  }
</style>
