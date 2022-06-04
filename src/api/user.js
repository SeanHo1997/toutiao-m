import request from '@/utils/request.js'

export const getUserData = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}

// 获取用户频道
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 获取所有频道
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

// 获取用户关注列表
export const followingList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/user/followings',
    params
  })
}

// 获取用户的粉丝列表
export const followerList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/user/followers',
    params
  })
}

// 设置用户的频道（部分覆盖）
export const setChannels1 = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data
  })
}

// 设置用户的频道(重置式)
export const setChannels2 = data => {
  return request({
    method: 'PUT',
    url: '/v1_0/user/channels',
    data
  })
}

// 删除指定用户频道

export const delChannel = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${target}`
  })
}

// 批量删除用户频道列表
export const delChannels = data => {
  return request({
    method: 'DELETE',
    url: '/v1_0/user/channels',
    data
  })
}
