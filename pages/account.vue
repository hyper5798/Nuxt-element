<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <div class="BG-Average">
          <div class="bg-purple">
            <el-card v-if="isShowAdd" class="box-card">
              <div slot="header" class="clearfix">
                <span>新增裝置</span>
                <el-tooltip class="item" effect="dark" content="按此編輯裝置" placement="top">
                  <el-button type="success"
                             icon="el-icon-edit"
                             style="float: right"
                             circle
                             @click="displayEditCard">
                  </el-button>
                </el-tooltip>
              </div>
              <div class="text item">

                <el-button  type="primary" @click="addNewUser">新增帳戶</el-button>
              </div>
            </el-card>

            <el-card v-if="!isShowAdd" class="box-card">
              <div slot="header" class="clearfix" >
                <span>帳戶編輯</span>
                <el-tooltip class="item" effect="dark" content="按此新增帳戶" placement="top">
                  <el-button type="primary"
                             icon="el-icon-plus"
                             style="float: right"
                             circle
                             @click="displayAddCard">
                  </el-button>
                </el-tooltip>
              </div>
              <div class="text item">
                <h3>裝置類型</h3>
              </div>
            </el-card>

          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
        <div class="BG-Average-Copy">
          <div class="bg-content">
            <account-table v-if="!isShowAdd"
                          :list="currentList"
                          @active-user="onActiveUser"
                          @edit-user="onUpdateUser"
                          @del-user="onDeleteUser">
            </account-table>
            <div>
              <el-card v-if="isShowAdd" class="box-card">
              </el-card>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { toGet , toUpdate, toDelete, toPost} from '~/tools/api'
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
    data: () => ({
      data: this.allDevice,
      columns: Data.columns2,
      isShowAdd: false,
      currentList: null,
      allDevice: null,
      sortDevice: null
    }),
    methods: {
      addNewUser () {
        /* if (!isEnableNew && newList === null) {
          this.$notify({
            title: '警告',
            message: '尚未匯入資料',
            type: 'warning'
          })
        } else if (!isEnableNew && newList !== null) {
          this.$notify({
            title: '警告',
            message: '資料不正確或者匯入資料已按新增裝置,若要再新增請匯入資料!',
            type: 'warning'
          })
        } else {
          isEnableNew = false
          this.toAddNewDevice()
        } */
      },
      async toAddNewUser () {
        // alert('toAddNewDevice')
        var list = []
        for (let i =0; i< newList.length; ++i) {
          list.push(newList[i]['mac'])
        }
        var url = 'http://localhost:8000/device/v1/batchDevices'
        var json = {token: this.authUser.authToken, list: list, type: 'LoRaM'}
        await toPost(this, url, json).then(result => {
          // console.log(result)
          if (result.responseCode === '000') {
            this.$notify({
              title: '成功',
              message: '更新裝置成功',
              type: 'success'
            })
            this.reloadDevice()
          } else {
            this.$notify({
              title: '警告',
              message: result.responseMsg,
              type: 'warning'
            })
          }
        })
      },
      displayEditCard () {
        this.isShowAdd = false
      },
      displayAddCard () {
        this.isShowAdd = true
      },
      async onActiveUser (index) {
        /* var url = 'http://localhost:8000/device/v1/active'
        var device = this.currentList[index]

        // alert('onActiveDevice : ' + JSON.stringify(this.currentList))
        var json = {'token': this.authUser.authToken, 'd': device.device_mac, 'agri': 'true'}
        // alert('onActiveDevice : ' + JSON.stringify(json))
        await toPost(this, url, json).then(result => {
          // console.log(result)
          if (result.responseCode === '000') {
            device.device_status = 3
            device.statusDesc = 'in used'
            this.$notify({
              title: '成功',
              message: '更新啟用成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '警告',
              message: result.responseMsg,
              type: 'warning'
            })
          }
        }) */
      },
      async reloadUsers () {
        /* var url = 'http://localhost:8000/user/v1/users'
        toGet(this, url, {token: this.authUser.authToken}).then(res => {
          alert(JSON.stringify(res.data.users))
          this.currentList = res.data.users
        }) */
      },
      async onUpdateUser (index) {
        // alert('onUpdateUser : ' + index + ' > ' + JSON.stringify(this.currentList[index]))
        var user = this.currentList[index]
        var url = 'http://localhost:8000/user/v1/users'
        //  ['token','mUserId', 'catId', 'roleId','userBlock']
        var json = {
          token: this.authUser.authToken,
          mUserId: user.userId,
          catId: user.cpId,
          roleId: user.roleId,
          userBlock: user.userBlock}
        alert(JSON.stringify(json))
        await toUpdate(this, url, json).then(result => {
          // console.log(result)
          if (result.responseCode === '000') {
            this.$notify({
              title: '成功',
              message: '更新裝置成功',
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
        var url = 'http://localhost:8000/user/v1/users'
        var json = {token: this.authUser.authToken, delUserId: this.currentList[index].userId}
        alert(JSON.stringify(json))
        await toDelete(this, url, json).then(result => {
          if (result.responseCode === '000') {
            var device = this.currentList[index]
            this.currentList.splice(index, 1)
            this.$notify({
              title: '成功',
              message: '刪除裝置成功',
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
        var url = 'http://localhost:8000/user/v1/users'
        var token = store.state.authUser.authToken
        const [list] = await Promise.all([
          toGet(app, url, {token: token}).then(res => res.data),
        ])
        console.log(JSON.stringify(list.users))
        return {
          currentList: list.users,
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
