import request from '@/utils/request.js'
// import store from '@/store/index.js'

export const getUserData = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.token.token}`
    // }
  })
}
