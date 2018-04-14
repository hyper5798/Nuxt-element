let base = ''

export const getMapList = (vm, url, params) => { return vm.$axios.get(url, {params: params})}

export const getEventList = (vm, url, params) => { return vm.$axios.get(url, {params: params})}

export const getDeviceList = (vm, url, params) => { return vm.$axios.get(url, {params: params})}

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

export const requestLogin = (vm, url, params) => { return vm.$axios.$post(url, params).then(res => res) }
