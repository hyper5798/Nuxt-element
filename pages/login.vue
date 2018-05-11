<template lang="html">
  <div id="login-page" @keyup.enter="login">
    <div class="login-form">
      <div class="input-group">
        <div class="title">農業資訊管理</div>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
        <el-form-item label="帳號" prop="acc">
          <el-input v-model="ruleForm.acc"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="pwd">
          <el-input v-model="ruleForm.pwd"></el-input>
        </el-form-item>

        <el-form-item v-if="cpList" label="場域" prop="cp">
          <el-select v-model="ruleForm.cp" clearable placeholder="請選擇場域">
            <el-option
              v-for="cp in cpList"
              :key="cp.cpId"
              :label="cp.cpName"
              :value="cp.cpName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即登入</el-button>
        </el-form-item>

      </el-form>

      <!--<div class="input-group">
        <el-button @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
      </div>-->
    </div>
  </div>
</template>

<script>
import { requestLogin, getSimpleCpList } from '~/tools/api'
export default {
  layout: 'full',
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
      isBtnLoading: false,
      ruleForm: {
        acc: '',
        pwd: '',
        cp: '',
        type: 0
      },
      cpList: [
        {"cpId":1,"cpName":"gemtek"},
        {"cpId":7,"cpName":"NIU"},
        {"cpId":8,"cpName":"NDHU"}
        ],
      rules: {
        acc: [
          { required: true, message: '請輸入帳號名稱', trigger: 'blur' },
          { min: 3, max: 10, message: '帳號長度3到10個字元', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          { min: 8, max: 15, message: '密碼長度8到15個字元', trigger: 'blur' }
        ],
        cp:[
          { required: true, message: '分區不能為空', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登錄中...'
      return '登錄'
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.login()
        } else {
          console.log('error submit!!');
          return false
        }
      })
    },
    login() {
      if (!this.username) {
        this.$message.error('請填寫用戶名！！！')
        return
      }
      if (!this.password) {
        this.$message.error('請填寫密碼')
        return
      }
      this.isBtnLoading = true
      requestLogin(this, this.ruleForm).then(data => {
        this.isBtnLoading = false
        console.log('@@@@@ requestLogin data : \n ' + JSON.stringify(data))
        let { responseMsg, responseCode } = data
        console.log('responseCode :  ' + responseCode)
        console.log('responseMsg :  ' + responseMsg)
        if (responseCode !== '000') {
          this.$message.error(responseMsg)
        } else {
          // localStorage.setItem('user', JSON.stringify(user))
          this.$store.dispatch('login', data)
          if (this.$route.query.redirect) {
            this.$router.push({path: this.$route.query.redirect})
          } else {
            this.$router.push({path: '/'})
          }
        }
      })
    }
  },
  /* asyncData: async function ({app, error, store}) {
    try {
      const [list] = await Promise.all([
        getSimpleCpList(app, {token: null}).then(res => res.data)
      ])
      console.log(JSON.stringify(list.grps))
      return {
        cpList: list.grps
      }
    } catch (err) {
      error(err)
    }
  } */
}
</script>

<style scoped>
  #login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    // background: #efeeee;
    background: url('~static/img/bg1.jpg') ;
  }
    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 500px;
      height: 400px;
      border-radius: 10px;
      background: white;
      border: 1px #eaeaea solid;
      box-shadow: 0px 0px 25px #cac6c6;
    }
    .title {
      color: #20a0ff;
      font-weight: bold;
      font-size: 40px;
      text-align: center;
      line-height: 2.2;
      font-family: sans-serif;
    }

      .input-group {
        margin-top: 30px;
        width: 80%;
      }
      button {
        width: 100%;
      }
</style>
