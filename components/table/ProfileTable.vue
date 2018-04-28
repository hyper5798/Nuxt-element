<template>
  <div class="scrollit">

    <el-row>
      <el-col :span="24">
        <table border="1">
          <thead>
          <tr class="mytable-title">
            <!--<th width="10%">項目</th>-->
            <th width="50%">名稱</th>
            <th width="25%">高於條件值通知</th>
            <th width="25%">低於條件值通知</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(profile) in list" :key="profile.title">
            <!--<td>
              {{ index + 1}}
            </td>-->
            <td>
              <span>{{profile.title}}</span>
            </td>
            <td>
              <input v-model="profile.high" type="number" />
            </td>
            <td>
              <input v-model="profile.low" type="number" />
            </td>
          </tr>
          </tbody>
        </table>
      </el-col>
      <el-col :span="6" :offset="11" class="saveProfilrBtn">
        <el-button type="primary"
                   icon="el-icon-edit"
                   style="float: center"
                   @click="handleSave">
          儲存通知設定
        </el-button>
      </el-col>
    </el-row>

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
        emptyProfile: null
      }
    },
    methods: {
      handleSave () {
        this.$emit('save-profile', this.list)
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
  .saveProfilrBtn {
    margin-top: 20px;
  }
</style>
