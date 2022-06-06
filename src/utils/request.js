// 封装请求模块
import axios from 'axios'
import store from '@/store/index.js'
import { Toast } from 'vant'
import router from '@/router/index.js'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 单独定义一个axios实例用来获取新的token，避免拦截器作用
const refreshTokenReq = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器🙆🏻(统一设置Authorization)
request.interceptors.request.use(function (config) {
  if (store.state.userInfo && store.state.userInfo.token) {
    config.headers.Authorization = `Bearer ${store.state.userInfo.token}`
  }
  return config
}, function (error) {
  // 如果请求出错
  return Promise.reject(error)
})

// 响应拦截器(解决Token过期问题)
request.interceptors.response.use(response => {
  // 响应成功则通过
  return response
}, async error => {
  const status = error.response.status
  if (status === 400) {
    Toast.fail('请求参数异常')
  } else if (status === 507) {
    Toast.fail('服务器数据库异常')
  } else if (status === 500) {
    Toast.fail('Internal Server Error')
  } else if (status === 401) {
    Toast.fail('用户认证失败')
    // 401状态码代表认证失败
    // 判断是否有token,无则跳转登录页面
    if (!store.state.userInfo.token) {
      router.replace('/login')
    // 有则用refresh_token请求新的token
    } else {
      try {
        const { data } = await refreshTokenReq({
          method: 'PUT',
          url: '/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.userInfo.refresh_token}`
          }
        })
        store.state.userInfo.token = data.data.token
        store.commit('setToken', data.data.token)
        //  再次发起因为401未完成的请求
        return request(error.config)
      } catch (err) {
        router.replace('/login')
      }
    }
  }
  return Promise.reject(error)
})

export default request
