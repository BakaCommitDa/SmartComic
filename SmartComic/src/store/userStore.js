import { create } from 'zustand'
import { doLogin, getUserInfo } from '../api/user'

export const useUserStore = create((set, get) => ({
  user: null,
  isLogin: false,
  
  // 登录
  login: async ({ username = "", password = "" }) => {
    try {
      console.log('发送登录请求:', { username, password })
      const res = await doLogin({ username, password })
      console.log('登录响应:', res)
      
      if (res.code === 0) {
        const { token, data: user } = res
        localStorage.setItem('token', token)
        set({
          user,
          isLogin: true,
        })
        return { success: true }
      } else {
        return { success: false, message: res.msg || '登录失败' }
      }
    } catch (error) {
      console.error('登录错误:', error)
      return { success: false, message: '网络错误' }
    }
  },

  // 登出
  logout: () => {
    localStorage.removeItem('token')
    set({
      user: null,
      isLogin: false,
    })
  },

  // 检查登录状态
  checkLoginStatus: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      set({ user: null, isLogin: false })
      return false
    }

    try {
      const res = await getUserInfo()
      console.log('检查登录状态响应:', res)
      if (res.code === 0) {
        set({
          user: res.data,
          isLogin: true,
        })
        return true
      } else {
        console.log('Token验证失败，清除token')
        localStorage.removeItem('token')
        set({ user: null, isLogin: false })
        return false
      }
    } catch (error) {
      console.error('检查登录状态错误:', error)
      localStorage.removeItem('token')
      set({ user: null, isLogin: false })
      return false
    }
  },

  // 初始化用户状态
  initUserState: () => {
    const token = localStorage.getItem('token')
    if (token) {
      get().checkLoginStatus()
    }
  }
}))
