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

// 搜索文章结果
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

// 举报文章
export const reportArticle = data => {
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data
  })
}

// 获取用户收藏列表
export const collection = params => {
  return request({
    method: 'GET',
    url: '/v1_0/article/collections',
    params
  })
}

// 获取用户阅读历史
export const articleHistory = params => {
  return request({
    mehtod: 'GET',
    url: '/v1_0/user/histories',
    params
  })
}
