<template>
  <div id="work-page"></div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getMapList, getDeviceList, getEventList, getUserList} from '~/tools/api'
  export default {
    middleware: 'auth',
    components: {
    },
    computed: {
      ...mapGetters([
        'authUser'
      ])
    },
    methods: {
      handleSetData() {
        alert(type)
      }
    },
    /* asyncData: async function ({app, error, store}) {
      try {
        var token = store.state.authUser.authToken

        const [list, list2, list3] = await Promise.all([
          getMapList(app, {token: token}).then(res => res.data),
          getDeviceList(app, {token: token}).then(res => res.data),
          getUserList(app, {token: token}).then(res => res.data)
        ])

        return {
          mapList: list.data,
          deviceList: list2.mList,
          userList: list3.users
        }
      } catch (err) {
        error(err)
      }
    }*/
  }
</script>

<style>
  #work-page {
    width: 100%;
    height: 100%;
    background: url('~static/img/work.jpg') ;
  }
</style>
