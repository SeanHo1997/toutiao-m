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
