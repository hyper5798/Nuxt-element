<template lang="html">
  <div id="login-page" @keyup.enter="login">
    <div class="login-form">
      <div class="input-group">
        <div class="title">農業資訊管理</div>
        <el-input
          :autofocus="true"
          placeholder="請輸入用戶名"
          icon="time"
          v-model="username">
        </el-input>
      </div>
      <div class="input-group">
        <el-input
          placeholder="請輸入密碼"
          type="password"
          icon="time"
          v-model="password">
        </el-input>
      </div>
      <div class="input-group">
        <label>記住我？</label>
        <el-switch
          v-model="rememberMe"
          on-text=""
          off-text="">
        </el-switch>
      </div>
      <div class="input-group">
        <el-button @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { requestLogin } from '~/tools/api'
export default {
  layout: 'full',
  data() {
    return {
      username: 'Rogwang',
      password: 'gemtek123',
      rememberMe: false,
      isBtnLoading: false
    }
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登錄中...'
      return '登錄'
    }
  },
  mounted () {
    console.log('####################login')
  },
  methods: {
    login() {
      if (!this.username) {
        this.$message.error('請填寫用戶名！！！')
        return
      }
      if (!this.password) {
        this.$message.error('請填寫密碼')
        return
      }
      let loginParams = {acc: this.username, pwd: this.password, type: 0}
      var url = 'http://localhost:8000/user/v1/login/gemtek'
      this.isBtnLoading = true
      requestLogin(this, url, loginParams).then(data => {
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
  }
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
