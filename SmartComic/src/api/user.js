import request, { isVercel, getFrontendData } from './config'

// 用户登录
export const doLogin = (data) => {
  if (isVercel) {
    // Vercel环境下使用前端验证
    const { username, password } = data
    const validPasswords = ['123456', 'password', 'passw ord', 'passwor d']
    
    if (username === 'admin' && validPasswords.includes(password)) {
      // 生成简单的token
      const token = btoa(JSON.stringify({
        user: {
          id: "001",
          username: "admin",
        },
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7天过期
      }))
      
      // 保存token到localStorage
      localStorage.setItem('token', token)
      
      return Promise.resolve({
        code: 0,
        token,
        data: {
          id: "001",
          username: "admin",
        }
      })
    } else {
      return Promise.resolve({
        code: 1,
        msg: '登录失败',
        token: null
      })
    }
  }
  
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  if (isVercel) {
    // Vercel环境下从localStorage获取用户信息
    const token = localStorage.getItem('token')
    if (!token) {
      return Promise.resolve({
        code: 1,
        message: '缺少认证token'
      })
    }
    
    try {
      const decoded = JSON.parse(atob(token))
      const now = Date.now()
      
      if (decoded.exp && decoded.exp < now) {
        // token过期，清除
        localStorage.removeItem('token')
        return Promise.resolve({
          code: 1,
          message: 'Token已过期'
        })
      }
      
      return Promise.resolve({
        code: 0,
        data: decoded.user
      })
    } catch (error) {
      localStorage.removeItem('token')
      return Promise.resolve({
        code: 1,
        message: 'Invalid token'
      })
    }
  }
  
  return request({
    url: '/user',
    method: 'get'
  })
}
