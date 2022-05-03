import request from '@/utils/request.js'
// import store from '@/store/index.js'

export const getUserData = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}

export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

export const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`,
    data: {
      target
    }
  })
}
