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
              <el-button  v-if="device.device_status < 2" size="small" type="info"  @click="activeDevice(index)">
                啟用
              </el-button>
              <span v-else>已啟用</span>
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
        // console.log(JSON.stringify(this.list[index]))
        this.$confirm('此操作将更新裝置, 是否繼續?', '提示', {
          confirmButtonText: '更新',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('edit-device', index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消更新'
          })
        })
      },
      delDevice (index) {
        // console.log(JSON.stringify(this.list[index]))
        this.$confirm('此操作将永久删除裝置, 是否繼續?', '提示', {
          confirmButtonText: '刪除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('del-device', index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      activeDevice(index) {
        // console.log(index)
        this.$emit('active-device', index)
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
    height:600px;
  }
</style>
