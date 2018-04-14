<template>
  <div class="scrollit">
    <table>
      <thead>
      <tr class="mytable-title">
        <th width="5%">#</th>
        <th width="20%">帳戶</th>
        <th width="25%">信箱</th>
        <th width="20%">權限</th>
        <th width="10%">狀況</th>
        <th width="15%" colspan="2" ></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in list" :key="user.userId">
        <td>
          {{ index + 1}}
        </td>
        <td>
          <input v-model="user.userName" size="10" type="text" disabled/>
        </td>
        <td>
          <input v-model="user.email" size="30" type="text" disabled/>
        </td>
        <td>
          <select v-model="user.roleId">
            <option v-for="option in options" v-bind:value="option.value" :key="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
        <td>
          <select v-model="user.userBlock">
            <option v-for="option in options2" v-bind:value="option.value" :key="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
        <td>
          <el-button type="primary" icon="el-icon-edit" circle @click="editUser(index)">
          </el-button>
        </td>
        <td>
          <el-button type="danger" icon="el-icon-delete" circle @click="delUser(index)"></el-button>
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
        options: [
          { text: '超級管理者', value: 1 },
          { text: '一般管理者', value: 8 },
          { text: '一般用戶', value: 15 },
          { text: '未設定', value: 0 }
        ],
        options2: [
          { text: '禁用', value: 1 },
          { text: '啟用', value: 0 }
        ],
        options3: [
          { text: '男', value: 'M' },
          { text: '女', value: 'F' }
        ]
      }
    },
    methods: {
      editUser (index) {
        // alert(JSON.stringify(this.list[index]))
        this.$confirm('此操作将更新帳戶, 是否繼續?', '提示', {
          confirmButtonText: '更新',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('edit-user', index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消更新'
          })
        })
      },
      delUser (index) {
        // console.log(JSON.stringify(this.list[index]))
        this.$confirm('此操作将永久删除帳戶, 是否繼續?', '提示', {
          confirmButtonText: '刪除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('del-user', index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
    height:400px;
  }
</style>
