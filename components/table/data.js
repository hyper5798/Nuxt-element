export default {
  data: [
    {
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: {test: 5, test2: 10}
    },
    {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: {test: 5, test2: 10}
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: {test: 5, test2: 10}
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: {test: 5, test2: 10}
    },
    {
      date: '2016-05-08',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: {test: 5, test2: 10}
    },
    {
      date: '2016-05-06',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: {test: 5, test2: 10}
    },
    {
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: {test: 5, test2: 10}
    }
  ],
  columns: [
    { name: '裝置識別碼', prop: 'macAddr' },
    // { name: '資料', prop: 'data' },
    { name: '日期', prop: 'date' },
  ],
  columns2: [
    { name: '裝置識別碼', prop: 'macAddr' },
    { name: '裝置名稱', prop: 'name' },
    { name: '啟用狀態', prop: 'active_status' },
    // { name: '啟用時間', prop: 'active_time' },
    { name: '裝置狀態', prop: 'status' },
    { name: '裝置類型', prop: 'type' }
  ],
  columns_log: [
    { name: '標題', prop: 'subject' },
    { name: '訊息', prop: 'content' },
    { name: '操作者', prop: 'createUser' },
    { name: '時間', prop: 'date' }
  ]
}
