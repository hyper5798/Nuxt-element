<template>
  <div>
    <el-row v-if="authUser.role==='superAdmin'" :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="BG-Average-Copy">
          <div class="bg-content">
            <el-card div v-if="!isShowAdd" class="box-card">
              <div slot="header" class="clearfix">
                <span>編輯帳戶</span>
                <el-tooltip class="item" effect="dark" content="按此新增帳戶" placement="top">
                  <el-button type="primary"
                             icon="el-icon-plus"
                             style="float: right"
                             circle
                             @click="displayAddBlock">
                  </el-button>
                </el-tooltip>
              </div>
              <div class="text item">
                <account-table
                  :list="currentList"
                  @edit-user="onUpdateUser"
                  @del-user="onDeleteUser">
                </account-table>
              </div>
            </el-card>
            <el-card v-else class="box-card">
              <div slot="header" class="clearfix">
                <span>新增帳戶</span>
                <el-tooltip class="item" effect="dark" content="按此編輯帳戶" placement="top">
                  <el-button type="success"
                             icon="el-icon-edit"
                             style="float: right"
                             circle
                             @click="displayEditBlock">
                  </el-button>
                </el-tooltip>
              </div>
              <div class="text item">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="150px">
                  <el-form-item
                    label="帳號"
                    prop="name"
                    :rules="[
                      { required: true, message: '帳號不能為空'},
                      { min: 3, max: 10, message: '帳號長度3到10個字元', trigger: 'blur' }
                    ]"
                  >
                    <el-input type="age" v-model="ruleForm2.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="密碼" prop="pwd">
                    <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="確認密碼" prop="pwd2">
                    <el-input type="password" v-model="ruleForm2.pwd2" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="性別"
                                prop="gender"
                                :rules="[
                                  { required: true, message: '性別不能為空'}
                                ]"
                    >
                    <el-select v-model="ruleForm2.gender" placeholder="請選擇性別">
                      <el-option label="男性" value="M"></el-option>
                      <el-option label="女性" value="F"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    prop="email"
                    label="郵箱"
                    :rules="[
                      { required: true, message: '請輸入郵箱位址', trigger: 'blur' },
                      { type: 'email', message: '請輸入正確的郵箱位址', trigger: 'blur,change' }
                    ]"
                  >
                    <el-input v-model="ruleForm2.email"></el-input>
                  </el-form-item>
                  <el-form-item label="場域"
                                prop="cp"
                                :rules="[
                                  { required: true, message: '場域不能為空'}
                                ]"
                  >
                    <el-select v-model="ruleForm2.cp" clearable placeholder="請選擇場域">
                      <el-option
                        v-for="cp in cpList"
                        :key="cp.cpId"
                        :label="cp.cpName"
                        :value="cp.cpName">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
            <div>
              <el-card v-if="isShowAdd" class="box-card">
              </el-card>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-else class="errMessage">
      !!!你沒有權限觀看此頁面!!!
      <br>請通知管理者更改權限
    </div>
  </div>
</template>

<script>
  import { getUserList, updateUser, deleteUser, addUser, getSimpleCpList} from '~/tools/api'
  import AccountTable from '~/components/table/AccountTable.vue'
  import Data from '~/components/table/data'
  import { toYMD } from '~/tools/time'
  import { mapGetters } from 'vuex'
  var newList = null
  var isEnableNew = false

  export default {
    middleware: 'auth',
    components : {
      AccountTable
    },
    computed: {
      ...mapGetters([
        'authUser'
      ])
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('請輸入密碼'))
        } else if (value.length < 8 || value.length>15) {
          callback(new Error('密碼長度8到15個字元'))
        } else {
          if (this.ruleForm2.pwd2 !== '') {
            this.$refs.ruleForm2.validateField('pwd2')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('請再次輸入密碼'))
        } else if (value !== this.ruleForm2.pwd) {
          callback(new Error('兩次輸入密碼不一致!'))
        } else {
          callback()
        }
      }
      return {
        data: this.allDevice,
        columns: Data.columns2,
        isShowAdd: false,
        currentList: null,
        allDevice: null,
        sortDevice: null,
        ruleForm2: {
          name: 'test4',
          pwd: '12345678',
          pwd2: '12345678',
          gender: 'M',
          email: 'hyper579@gmail.com',
          cp: ''
        },
        rules2: {
          pwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pwd2: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      if (this.authUser.userInfo) {
        // alert(this.authUser.userInfo.cp)
        this.ruleForm2.cp = this.authUser.userInfo.cp
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.toAddNewUser()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async toAddNewUser () {
        // alert('toAddNewDevice')
        var json = this.ruleForm2
        json.createUser = this.authUser.userInfo.name
        json.type = '0'
        // alert(JSON.stringify(json))
        await addUser(this, json).then(result => {
          // console.log(result)
          if (result.responseCode === '000') {
            this.$notify({
              title: '成功',
              message: '新增帳戶成功',
              type: 'success'
            })
            this.reloadUsers()
          } else {
            this.$notify({
              title: '警告',
              message: result.responseMsg,
              type: 'warning'
            })
          }
        })
      },
      displayAddBlock () {
        this.isShowAdd = true
      },
      displayEditBlock () {
        this.isShowAdd = false
      },
      async reloadUsers () {
        getUserList(this, {token: this.authUser.authToken}).then(res => {
          // alert(JSON.stringify(res.data.users))
          this.currentList = res.data.users
          this.isShowAdd = false
        })
      },
      async onUpdateUser (index) {
        // alert('onUpdateUser : ' + index + ' > ' + JSON.stringify(this.currentList[index]))
        var user = this.currentList[index]
        //  ['token','mUserId', 'catId', 'roleId','userBlock']
        var json = {
          createUser: this.authUser.userInfo.name,
          userName: user.userName,
          token: this.authUser.authToken,
          mUserId: user.userId,
          catId: user.cpId,
          roleId: user.roleId,
          userBlock: user.userBlock}
        // alert(JSON.stringify(json))
        await updateUser(this, json).then(result => {
          // console.log(result)
          if (result.responseCode === '000') {
            this.$notify({
              title: '成功',
              message: '更新帳戶成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '警告',
              message: result.responseMsg,
              type: 'warning'
            })
          }
        })
      },
      async onDeleteUser (index) {
        // alert('onDeleteUser : ' + index + ' > ' + JSON.stringify(this.currentList[index]))
        var json = {token: this.authUser.authToken, delUserId: this.currentList[index].userId}
        json.createUser = this.authUser.userInfo.name
        json.userName = this.currentList[index].userName
        // alert(JSON.stringify(json))
        await deleteUser(this, json).then(result => {
          if (result.responseCode === '000') {
            var device = this.currentList[index]
            this.currentList.splice(index, 1)
            this.$notify({
              title: '成功',
              message: '刪除成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '警告',
              message: result.responseMsg,
              type: 'warning'
            })
          }
        })
      }
    },
    asyncData: async function ({app, error, store}) {
      try {
        var token = store.state.authUser.authToken
        const [list, list2] = await Promise.all([
          getUserList(app, {token: token}).then(res => res.data),
          getSimpleCpList(app, {token: token}).then(res => res.data)
        ])
        // console.log(JSON.stringify(list2))
        return {
          currentList: list.users,
          cpList: list2.grps
        }
      } catch (err) {
        error(err)
      }
    }
  }
</script>

<style>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .deviceSelecter {
    margin-top: 20px;
  }
</style>

