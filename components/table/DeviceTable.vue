<template>
  <div class="scrollit">
    <table border="1">
      <thead>
        <tr class="mytable-title">
          <th width="5%">項目</th>
          <th width="25%">識別碼</th>
          <th width="20%">名稱</th>
          <th width="10%">啟動碼</th>
          <th width="20%">狀態</th>
          <th width="8%">類型</th>
          <th colspan="2" ></th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(device, index) in list" :key="device.macAddr">
            <td>
              {{ index + 1}}
            </td>
            <td>
              <span>{{device.device_mac}}</span>
            </td>
            <td>
              <input v-model="device.device_name" type="text" />
            </td>
            <td>
              <!--<input v-model="device.device_status" size="1" type="number" min="0" max="3"/>-->
              <span>{{device.device_status}}</span>
            </td>
            <td>
              <span>{{device.statusDesc}}</span>
            </td>
            <td>
              <span>{{device.fport}}</span>
            </td>
            <td>
              <el-button type="primary" icon="el-icon-edit" circle @click="editDevice(index)">
              </el-button>
            </td>
            <td>
              <el-button type="danger" icon="el-icon-delete" circle @click="delDevice(index)"></el-button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  // import { mapGetters } from 'vuex'

  export default {
    name: 'device-table',
    props: {
      list: null
    },
    data () {
      return {
        isSelectProfile: false,
        currentDeviceIndex: -1
      }
    },
    methods: {
      editDevice (index) {
        console.log(JSON.stringify(this.list[index]))
        this.$emit('edit-device', this.list[index])
      },
      delDevice (index) {
        console.log(JSON.stringify(this.list[index]))
        this.$emit('del-device', this.list[index])
      }
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
    height:500px;
  }
</style>
