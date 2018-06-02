let base = ''

export const getLogList = (vm, params) => {
  return vm.$axios.get('/admin/v1/logs', {params: params})
}

/* ------------------------------- map api -----------------------------*/
export const getMapList = (vm, params) => {
  // new path
  return vm.$axios.get('/device/v1/maps', {params: params})
  // return vm.$axios.get('/map/v1/', {params: params})
}
export const updateMapProfile = (vm, params) => {
  // new path
  return vm.$axios.$put('/device/v1/maps', params).then(res => res)
  //return vm.$axios.$put('/map/v1/', params).then(res => res)
}

export const getEventList = (vm, params) => {
  return vm.$axios.get('/device/v1/event', {params: params})
}

/* ------------------------------- device api -----------------------------*/
export const getDeviceList = (vm, params) => {
  return vm.$axios.get('/device/v1/sensor', {params: params})
}

export const addBatchDevice = (vm, params) => {
  return vm.$axios.$post('/device/v1/batchDevices', params).then(res => res)
}

export const activeDevice = (vm, params) => {
  return vm.$axios.$post('/device/v1/active', params).then(res => res)
}

export const updateDevice = (vm, params) => {
  return vm.$axios.$put('/device/v1/device', params).then(res => res)
}

export const deleteDevice = (vm, params) => {
  return vm.$axios.$delete('/device/v1/device', {params: params}).then(res => res)
}
/* ------------------------------- cp api -----------------------------*/
export const getSimpleCpList = (vm, params) => {
  return vm.$axios.get('/admin/v1/scps', {params: params})
}
/* ------------------------------- account api -----------------------------*/
export const getUserList = (vm, params) => {
  return vm.$axios.get('/user/v1/users', {params: params})
}

export const addUser = (vm, params) => {
  var url = 'user/v1/register/' + params.cp
  delete params.cp
  return vm.$axios.$post(url, params).then(res => res)
}

export const updateUser = (vm, params) => {
  return vm.$axios.$put('/user/v1/users', params).then(res => res)
}

export const deleteUser = (vm, params) => {
  return vm.$axios.$delete('/user/v1/users', {params: params}).then(res => res)
}

export const requestLogin = (vm, params) => {
  var url = '/user/v1/login/' + params.cp
  delete params.cp
  return vm.$axios.$post(url, params).then(res => res)
}

export const toLogout = (vm, params) => {
  var url = '/user/v1/logout/'
  delete params.cp
  return vm.$axios.$post(url, params).then(res => res)
}

export const toGet = (vm, url, params) => {
  return vm.$axios.get(url, {params: params})
}

export const toUpdate = (vm, url, params) => {
  return vm.$axios.$put(url, params).then(res => res)
}

export const toDelete = (vm, url, params) => {
  return vm.$axios.$delete(url, {params: params}).then(res => res)
}

export const toPost = (vm, url, params) => {
  return vm.$axios.$post(url, params).then(res => res)
}


