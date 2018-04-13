let base = ''

export const getMapList = (vm, url, params) => { return vm.$axios.get(url, {params: params})}

export const getEventList = (vm, url, params) => { return vm.$axios.get(url, {params: params})}

export const getDeviceList = (vm, url, params) => { return vm.$axios.get(url, {params: params})}

export const toUpdate = (vm, url, params) => { return vm.$axios.$put(url, params).then(res => res)}

export const toDelete = (vm, url, params) => {
  return vm.$axios.$delete(url, {params: params}).then(res => res)
}

export const requestLogin = (vm, url, params) => { return vm.$axios.$post(url, params).then(res => res) }

export const fetchSchoolList = (vm, url, params) => {return vm.$axios.get(`${ base }/schools`).then(res => res.data) }

export const fetchWorkDurationOptions = (vm, url, params) => {return vm.$axios.get(`${ base }/work_durations`).then(res => res.data) }

export const fetchAcademicOptions = (vm, url, params) => {return vm.$axios.get(`${ base }/academics`).then(res => res.data) }

export const postResume = (vm, url, params) => {return vm.$axios.post(`${ base }/resume`, params).then(res => res.data)}

export const createResume = (vm, url, params) => { return vm.$axios.post(`${ base }/resume/add`).then(res => res.data) }
