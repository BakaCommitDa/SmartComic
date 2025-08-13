import axios from 'axios'

// 环境检测 - 更精确的检测
const isVercel = window.location.hostname.includes('vercel.app') || 
                 window.location.hostname.includes('vercel.com') ||
                 process.env.NODE_ENV === 'production'

// 开发环境使用相对路径，这样mock可以正确拦截
// Vercel环境不使用baseURL，直接返回前端数据
if (!isVercel) {
  axios.defaults.baseURL = '/api';
}

axios.interceptors.request.use((config) => {
    // 添加token到请求头
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

// 响应拦截器修复
axios.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    return Promise.reject(error)
})

// 获取前端数据的函数
export const getFrontendData = (data) => {
  return Promise.resolve({
    code: 0,
    data: data,
    msg: 'success'
  })
}

export default axios
export { isVercel }