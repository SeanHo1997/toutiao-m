// 封装请求模块
import axios from 'axios'
import store from '@/store/index.js'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 通过请求拦截器同一设置Authorization
request.interceptors.request.use(function (config) {
  if (store.state.token && store.state.token.token) {
    config.headers.Authorization = `Bearer ${store.state.token.token}`
  }
  return config
}, function (error) {
  // 如果请求出错
  return Promise.reject(error)
})

export default request
