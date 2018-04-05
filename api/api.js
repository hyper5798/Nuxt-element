let base = ''

export const fetchList = (vm, url, params) => { return axios.get(`${ base }/user/list`, {params: params})}

export const addUser = (vm, url, params) => { return axios.post(`${ base }/user/add`, params) }

export const editUser = (vm, url, params) => { return axios.post(`${ base }/user/edit`, params) }

export const removeUser = (vm, url, params) => { return axios.post(`${ base }/user/remove`, params) }

export const postError = (vm, url, params) => { return axios.get(`${ base }/error`, {params: params}) }

export const requestLogin = (vm, url, params) => { return vm.$axios.$post(url, params).then(res => res) }

export const fetchSchoolList = (vm, url, params) => {return axios.get(`${ base }/schools`).then(res => res.data) }

export const fetchWorkDurationOptions = (vm, url, params) => {return axios.get(`${ base }/work_durations`).then(res => res.data) }

export const fetchAcademicOptions = (vm, url, params) => {return axios.get(`${ base }/academics`).then(res => res.data) }

export const postResume = (vm, url, params) => {return axios.post(`${ base }/resume`, params).then(res => res.data)}

export const createResume = (vm, url, params) => { return axios.post(`${ base }/resume/add`).then(res => res.data) }
