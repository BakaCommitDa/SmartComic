import request from './config'

// 用户登录
export const doLogin = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user',
    method: 'get'
  })
}
