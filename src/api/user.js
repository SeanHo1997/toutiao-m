import request from '@/utils/request.js'

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

export const editprofile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

export const changeUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

export const updatePhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
