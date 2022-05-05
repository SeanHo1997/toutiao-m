import request from '@/utils/request.js'

export const comments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

export const addLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

export const pubComments = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
