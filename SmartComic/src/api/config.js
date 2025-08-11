import axios from 'axios'

// 开发环境使用相对路径，这样mock可以正确拦截
axios.defaults.baseURL = '/api';

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

export default axios