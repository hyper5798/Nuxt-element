export const state = () => ({
  sidebar: true,
  authUser: null,
  mapList: null,
  deviceList: null
})

export const getters = {
  authUser: state => state.authUser,
  sidebar: state => state.sidebar,
  mapList: state => state.mapList,
  deviceList: state => state.deviceList
}

export const mutations = {
  SET_DEVICELIST: function (state, list) {
    console.log('$ mutations SET_DEVICELIST')
    state.deviceList = list
  },
  SET_MAP: function (state, list) {
    // console.log('$ mutations SET_USER')
    state.mapList = list
  },
  SET_USER: function (state, user) {
    // console.log('$ mutations SET_USER')
    state.authUser = user
  },
  TOGGLE_SIDEBAR (state) {
    state.sidebar = !state.sidebar
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    console.log('!!!!!!!!!!nuxtServerInit !!!!!!!!!!!!!')
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  fetch ({redirect, store}) {
    if (store.state.authUser) {
      redirect('/')
    }
  },
  toggleSidebar ({ commit }) {
    try {
      console.log('$ store toggleSidebar')
      commit('TOGGLE_SIDEBAR')
    } catch (error) {
      throw error
    }
  },
  set_map ({ commit }, list) {
    try {
      // console.log('$store set_map' + JSON.stringify(list))
      commit('SET_MAP', list)
    } catch (error) {
      throw error
    }
  },
  set_devicelist ({ commit }, list) {
    try {
      // console.log('$store set_map' + JSON.stringify(list))
      commit('SET_DEVICELIST', list)
    } catch (error) {
      throw error
    }
  },
  async login ({ commit }, user) {
    try {
      console.log('$store login' + JSON.stringify(user))
      // const { data } = await this.$axios.post('/api/login', {user.login, user.pwd})
      commit('SET_USER', user)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    console.log('######## store logout')
    // await this.$axios.post('/admin/v1/logout')
    commit('SET_USER', null)
  }
}
