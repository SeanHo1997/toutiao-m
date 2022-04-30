import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// export const SMS = mobile => {
//   return request({
//     method: 'GET',
//     url: `/v1_0/sms/codes/${mobile}`,
//     mobile
//   })
// }
