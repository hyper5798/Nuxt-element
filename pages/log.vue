<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="7" :xl="6">
        <div class="BG-Average">
          <div class="bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>紀錄查詢</span>
              </div>
              <div class="text item">
                <!--<el-row>
                  <el-col :span="12">
                    <h5><span class="demonstration">選擇紀錄類型</span></h5>
                  </el-col>
                </el-row>
                <el-cascader
                  class="deviceSelecter"
                  :options="options"
                  v-model="target"
                  :show-all-levels="false"
                  @change="handleTypeChange">
                </el-cascader>-->
                <h5><span class="demonstration">開始日期</span></h5>
                <el-date-picker
                  v-model="start"
                  type="date"
                  format="yyyy-MM-dd 00:00:00">
                  placeholder="選擇開始日期">
                </el-date-picker>
                <h5><span class="demonstration">結束日期</span></h5>
                <el-date-picker
                  v-model="end"
                  type="date"
                  format="yyyy-MM-dd 23:59:59">
                  placeholder="選擇結束日期">
                </el-date-picker>
                <!--<h5><span class="demonstration">日期排序</span></h5>
                <template>
                  <el-radio v-model="radio" label="1" @change="handleOrderChange">由大到小</el-radio>
                  <el-radio v-model="radio" label="2" @change="handleOrderChange">由小到大</el-radio>
                </template> -->
                <el-button  icon="el-icon-search"
                            style="float: right;"
                            type="primary"
                            circle
                            @click="toFindLog">
                </el-button>
              </div>
            </el-card>

          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="17" :xl="18">
        <div class="BG-Average-Copy">
          <div class="bg-content">
            <log-table
              :data="data"
              :columns="columns"
            ></log-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              background
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getLogList, getEventList } from '~/tools/api'
  import LogTable from '~/components/table/LogTable.vue'
  import Data from '~/components/table/data'
  import { toYMD } from '~/tools/time'

  export default {
    middleware: 'auth',
    components : {
      LogTable
    },
    data: () => ({
      labelPosition: 'right',
      options: [{
        value: 'notify',
        label: '異常通知'},
        {
          value: 'admin',
          label: '系統紀錄'}
      ],
      radio: '1',
      data: [],
      format: "yyyy-MM-dd hh:mm:ss",
      columns: Data.columns_log,
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      start: '',
      end: '',
      target: 'notify',
      selectMap: null,
      keys: null,
      values: null,
      total: 0,
      currentPage: 1,
      allData: [],
      size: 10,
      sort: 'desc',
      noneInfoLength: 2
    }),
    methods: {
      /* handleOrderChange (value) {
        // alert(value)
        if (value === '1') {
          this.sort = 'desc'
        } else {
          this.sort = 'asc'
        }
      }, */
      handleTypeChange (value) {
        // alert(value)
        this.target = value
        this.toFindLog()
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
        var s = (this.currentPage - 1) * this.size
        var e = (this.currentPage) * this.size
        this.data = this.allData.slice(s, e)
      },
      async toFindLog () {
        if (this.target === null) {
          this.waring ('尚未選擇類型!')
          return
        }
        this.currentPage = 1
        var token = this.$store.state.authUser.authToken
        var now = new Date();
        var today = now.getFullYear() + '-' + (now.getMonth()+1) + '-' +  now.getDate() + ' 00:00:00';
        var params = {token: token,type: this.target, limit: 0}

        if (this.start) {
          params.from = this.start
        }

        if (this.end) {
          var last = this.end.getFullYear() + '-' + (this.end.getMonth()+1) + '-' +  this.end.getDate() + ' 23:59:59';
          params.to = new Date(last);
        }

        // alert(JSON.stringify(params))
        if (params.from && params.to === undefined) {
          this.waring('結束時間未選擇')
          return
        } else if (params.to && params.from === undefined) {
          this.waring('始時間未選擇')
          return
        } else if (params.to === undefined && params.from === undefined) {
          params.from = new Date(today);
          params.to = new Date(from.getTime() + 24*60*60*1000);
        }
        // params.sort = this.sort
        await getLogList(this, params).then(res => {
          // alert(JSON.stringify(res.data))
          this.data = res.data.list
        })
      },
      waring (msg) {
        this.$notify({
          title: '警告',
          message: msg,
          type: 'warning'
        });
      },
      getObjectStr (obj) {
        var keys = Object.keys(obj)
        var arr = []
        for (var i = 0; i < keys.length; i++) {
          arr.push(obj[keys[i]])
        }
        var str = arr.toString()
        return str
      },
      saveContent (fileContents, fileName) {
        var link = document.createElement('a')
        // console.log('$ fileMame : ' + fileName)
        link.download = fileName
        link.href = 'data:text/csv;charset=utf-8,\ufeff' + fileContents
        link.click()
      }
    },
    asyncData: async function ({app, error, store}) {
      try {
        var token = store.state.authUser.authToken
        var now = new Date();
        var today = now.getFullYear() + '-' + (now.getMonth()+1) + '-' +  now.getDate() + ' 00:00:00';
        var from = new Date(today);
        var to = new Date(from.getTime() + 24*60*60*1000);  //前一天var nextDate = new
        var json = {token: token,type: 'notify', from: from, to: to}

        const [logs] = await Promise.all([
          getLogList(app, json).then(res => res.data)
        ])
        console.log(logs)

        return {
          data: logs.list
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
