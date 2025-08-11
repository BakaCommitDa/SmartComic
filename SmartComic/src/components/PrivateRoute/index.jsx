import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'

const PrivateRoute = ({ children }) => {
  const { isLogin } = useUserStore()
  const location = useLocation()

  if (!isLogin) {
    // 将用户重定向到登录页面，并保存当前路径
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute
