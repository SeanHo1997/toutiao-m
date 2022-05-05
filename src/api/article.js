import request from '@/utils/request.js'

export const getArticle = params => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params
  })
}

export const getSuggestions = params => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params
  })
}

export const getSearchResults = params => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}

export const getArticleDetail = articleid => {
  return request({
    url: `/v1_0/articles/${articleid}`,
    method: 'GET',
    params: {
      articleid
    }
  })
}

export const addCollect = target => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

export const deleteCollect = target => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

export const likeArticle = target => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

export const unlikeArticle = target => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
