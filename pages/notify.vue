<template>
  <div>
    <div v-if="authUser.role==='generalUser'" class="errMessage">
      !!!你沒有權限觀看此頁面!!!
      <br>請通知管理者更改權限
    </div>
    <el-row v-else  :gutter="20">
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <div class="BG-Average">
          <div class="bg-purple">
            <el-card v-if="isShowAdd" class="box-card">
              <div slot="header" class="clearfix">
                <span>新增好友</span>
                <el-tooltip class="item" effect="dark" content="按此編輯通知設定" placement="top">
                  <el-button type="primary"
                             icon="el-icon-edit"
                             style="float: right"
                             @click="displayEditList">
                      通知設定
                  </el-button>
                </el-tooltip>
              </div>
              <div class="text item">
                加入通知群組

              </div>
            </el-card>

            <el-card v-if="!isShowAdd" class="box-card">
              <div slot="header" class="clearfix">
                <span>依裝置類型設定</span>
                <el-tooltip class="item" effect="dark" content="按此新增通知好友名單" placement="top">
                  <el-button type="success"
                             style="float: right"
                             @click="displayAddList">
                    + 好友
                  </el-button>
                </el-tooltip>
              </div>
              <div class="text item">
                <h3>裝置類型</h3>

                <el-menu theme="dark" @select="myMenuSelect">
                  <el-menu-item v-for="(map, index) in mapList"
                                :key="index"
                                v-bind:index="map.deviceType" >
                    {{map.typeName}}
                  </el-menu-item>
                </el-menu>
              </div>
            </el-card>

          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
        <div class="BG-Average-Copy">
          <div class="bg-content">
            <div v-if="!isShowAdd">
              <div v-if="currentTypeName">
                #{{currentTypeName}}
              </div>
              <profile-table
                v-if="currentList"
                :list="currentList"
                @save-profile="saveProfile">
              </profile-table>
              <span v-else><h1>尚無裝置!!!</h1></span>
            </div>

            <div>
              <el-row v-if="isShowAdd" :gutter="20">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  透過行動條碼加入LINE好友<br>
                  請在LINE應用程式上開啟「好友」分頁，點選畫面右上方用來加入好友的圖示，<br>
                  接著點選「行動條碼」，然後掃描此行動條碼。<br>
                  <!--<a href="https://line.me/R/ti/p/%40qqa1067n"><img height="36" border="0" alt="加入好友" src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"></a>-->
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <img src="http://qr-official.line.me/L/M3EOcDupLm.png">
                </el-col>
              </el-row>

            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getMapList, updateMapProfile } from '~/tools/api'
  import ProfileTable from '~/components/table/ProfileTable.vue'
  import Data from '~/components/table/data'
  import { toYMD } from '~/tools/time'
  import { mapGetters } from 'vuex'
  import XLSX from 'xlsx'
  var newList = null
  var isEnableNew = false

  export default {
    middleware: 'auth',
    components : {
      ProfileTable
    },
    computed: {
      ...mapGetters([
        'authUser'
      ])
    },
    mounted () {
      this.toSortProfile ()
    },
    data: () => ({
      data: this.allProfile,
      columns: Data.columns2,
      isShowAdd: false,
      currentList: null,
      currentType: null,
      currentTypeName: null,
      allProfile: null,
      sortDevice: null
    }),
    methods: {
      saveProfile (profile) {
        console.log(this.currentType)
        console.log(profile)
        this.toUpdateProfile(profile)
      },
      displayEditList () {
        this.isShowAdd = false
      },
      displayAddList () {
        this.isShowAdd = true
      },
      myMenuSelect (value) {
        console.log('menuSelect : ' + typeof(value) + value)
        this.currentType = value
        this.currentList = this.sortDevice[value].profile
        this.currentTypeName = this.sortDevice[value].name
        this.toSortProfile ()
      },
      toSortProfile () {
        if (this.mapList && this.sortDevice === null) {
          // console.log('this.currentList : ' + JSON.stringify(this.currentList))
          //this.allProfile = JSON.parse(JSON.stringify(this.currentList))
          // console.log('?????this.mapList : ' + JSON.stringify(this.mapList))

          var tmp = {}
          var currentType = null
          console.log(this.mapList)
          for (let i = 0; i < this.mapList.length; ++i) {
            let type = this.mapList[i].deviceType
            if (i === 0) {
              currentType = type // Default selected type
            }
            if (tmp[type] === undefined) {
              tmp[type] = []
            }
            let profile = this.mapList[i].profile
            // alert(type)
            if (profile) {
              // alert(JSON.stringify(profile))
              tmp[type] =  {
                name: this.mapList[i].typeName, profile: profile
              }
            } else {
              let fieldName = this.mapList[i].fieldName
              tmp[type] = {
                name: this.mapList[i].typeName, profile: this.getProfile(fieldName)
              }
            }
            console.log(tmp)
            this.sortDevice = tmp
            this.currentList = this.sortDevice[currentType].profile
            this.currentTypeName = this.sortDevice[currentType].name
          }
        }
      },
      getProfile (fieldName) {
        var keys= Object.keys(fieldName)
        if (keys) {
          var obj = {}
          for (let i=0; i < keys.length ; ++i) {
            let key = keys[i]
            obj[key] = {title: fieldName[key], high: '', low: ''}
          }
        }
        // console.log(obj)
        return obj
      },
      async toUpdateProfile (profile) {
        // updateMapProfile
        var json = {token: this.authUser.authToken, deviceType: this.currentType, profile: profile}
        alert(JSON.stringify(json))
        await updateMapProfile(this, json).then(result => {
          // console.log(result)
          if (result.responseCode === '000') {
            this.$notify({
              title: '成功',
              message: '更新通知設定成功',
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
      // console.log('#############################')
      try {
        var token = store.state.authUser.authToken
        const [list] = await Promise.all([
          getMapList(app, {token: token}).then(res => res.data)
        ])

        return {
          mapList: list.data,
          currentList: null
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
