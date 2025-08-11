// 简单的JWT实现，用于mock环境
const secret = '!O:I@& !:@ *YQ: @* Y&T^ L'

// 简单的JWT签名函数
function signJWT(payload, secret, options = {}) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }
  
  const now = Math.floor(Date.now() / 1000)
  const exp = now + (options.expiresIn || 60 * 60 * 24 * 7) // 默认7天
  
  const finalPayload = {
    ...payload,
    iat: now,
    exp: exp
  }
  
  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(finalPayload))
  
  // 简单的签名
  const signature = btoa(encodedHeader + '.' + encodedPayload + secret)
  
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

// 简单的JWT验证函数
function verifyJWT(token, secret) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid token format')
    }
    
    const [encodedHeader, encodedPayload, signature] = parts
    
    // 验证签名
    const expectedSignature = btoa(encodedHeader + '.' + encodedPayload + secret)
    if (signature !== expectedSignature) {
      throw new Error('Invalid signature')
    }
    
    // 解析payload
    const payload = JSON.parse(atob(encodedPayload))
    
    // 检查过期时间
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) {
      throw new Error('Token expired')
    }
    
    return payload
  } catch (error) {
    throw new Error('Invalid token: ' + error.message)
  }
}

// login 模块 mock 
export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000, // 请求耗时
    response: (req, res) => {
      console.log('收到登录请求:', req.body)
      
      // 确保请求体是对象
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      
      // 简单的验证逻辑 - 接受多种密码
      const validPasswords = ['123456', 'password', 'passw ord', 'passwor d']
      
      if (body.username !== 'admin' || !validPasswords.includes(body.password)) {
        console.log('登录验证失败:', {
          received: { username: body.username, password: body.password },
          expected: { username: 'admin', password: '123456 or password' }
        })
        return {
          code: 1,
          msg: '登录失败',
          token: null
        }
      }
      
      // 生成token
      const token = signJWT({
        user: {
          id: "001",
          username: "admin",
        }
      }, secret, {
        expiresIn: 60 * 60 * 24 * 7 // 7天
      })
      
      console.log('登录成功，生成token:', token)

      return {
        code: 0,
        token,
        data: {
          id: "001",
          username: "admin",
        }
      }
    }
  },
  {
    url: '/api/user',
    method: 'get',
    response: (req, res) => {
      // 用户端 token headers 
      const authHeader = req.headers['authorization']
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
          code: 1,
          message: '缺少认证token'
        }
      }

      const token = authHeader.split(' ')[1]
      console.log('验证token:', token)
      
      try {
        const decode = verifyJWT(token, secret)
        console.log('解码结果:', decode)
        
        if (decode && decode.user) {
          return {
            code: 0,
            data: decode.user
          }
        } else {
          return {
            code: 1,
            message: 'Token格式错误'
          }
        }
      } catch (err) {
        console.error('Token验证失败:', err)
        return {
          code: 1,
          message: 'Invalid token'
        }
      }
    }
  }
]
