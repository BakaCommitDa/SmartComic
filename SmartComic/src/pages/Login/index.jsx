import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'
import styles from './login.module.css'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLogin } = useUserStore()
  
  const [formData, setFormData] = useState({
    username: 'admin',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 如果已经登录，跳转到之前的页面或首页
  React.useEffect(() => {
    if (isLogin) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [isLogin, navigate, location.state])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // 清除错误信息
    if (error) {
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.username || !formData.password) {
      setError('请输入用户名和密码')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await login(formData)
      if (result.success) {
        const from = location.state?.from?.pathname || '/'
        navigate(from, { replace: true })
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      {/* 返回按钮 */}
      <div className={styles.backButton}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ←
        </button>
      </div>

      {/* 登录表单 */}
      <div className={styles.loginForm}>
        <h1 className={styles.title}>登录</h1>
        <p className={styles.subtitle}>登录后即可享受更多权益一</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">邮箱</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="请输入邮箱"
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="请输入密码"
              className={styles.input}
              disabled={loading}
            />
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        {/* 底部链接 */}
        <div className={styles.bottomLinks}>
          <span className={styles.link}>立即注册</span>
          <span className={styles.separator}>|</span>
          <span className={styles.link}>找回密码</span>
        </div>


      </div>
    </div>
  )
}

export default Login