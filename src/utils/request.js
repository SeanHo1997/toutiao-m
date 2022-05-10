// 封装请求模块
import axios from 'axios'
import store from '@/store/index.js'
import { Toast } from 'vant'
import router from '@/router/index.js'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 单独定义一个axios实例用来获取新的token，避免拦截器作用
const reefreshTokenReq = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器🙆🏻(统一设置Authorization)
request.interceptors.request.use(function (config) {
  if (store.state.token && store.state.token.token) {
    config.headers.Authorization = `Bearer ${store.state.token.token}`
  }
  return config
}, function (error) {
  // 如果请求出错
  return Promise.reject(error)
})

// 响应拦截器(解决Token过期问题)
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const status = error.response.status
  if (status === 400) {
    Toast.fail('请求参数异常')
  } else if (status === 507) {
    Toast.fail('服务器数据库异常')
  } else if (status === 401) {
    // 401状态码代表认证失败
    // 判断是否有token,无则跳转登录页面
    if (!store.token) {
      router.replace('/login')
    // 有则用refresh_token请求新的token
    } else {
      try {
        const { data } = await reefreshTokenReq({
          method: 'PUT',
          url: '/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.token.refresh_token}`
          }
        })
        store.token = data.data.token
        store.commit('setToken', store.token)
        return request(error.config)
      } catch (err) {
        router.replace('/login')
      }
    }
  }
  return Promise.reject(error)
})

export default request
