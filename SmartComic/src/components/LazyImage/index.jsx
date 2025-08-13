import React, { useState, useEffect, useRef } from 'react'
import styles from './lazyImage.module.css'

// 图片代理服务列表（按优先级排序）
const PROXY_SERVICES = [
  '/api/proxy-image?url=', // 本地API代理（优先）
  'https://images.weserv.nl/?url=',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/raw?url='
]

// 获取代理后的图片URL
const getProxiedImageUrl = (originalUrl) => {
  // 如果已经是代理URL，直接返回
  if (originalUrl.includes('images.weserv.nl') || 
      originalUrl.includes('cors-anywhere') ||
      originalUrl.includes('allorigins.win') ||
      originalUrl.includes('/api/proxy-image')) {
    return originalUrl
  }
  
  // 使用第一个代理服务（本地API）
  return PROXY_SERVICES[0] + encodeURIComponent(originalUrl)
}

// 图片加载错误处理
const handleImageError = (originalUrl, setImageUrl, retryCount = 0) => {
  if (retryCount >= PROXY_SERVICES.length - 1) {
    // 所有代理都失败了，使用本地占位图
    return '/assets/image.png'
  }
  
  // 尝试下一个代理服务
  const nextProxy = PROXY_SERVICES[retryCount + 1]
  if (nextProxy) {
    const newUrl = nextProxy + encodeURIComponent(originalUrl)
    setImageUrl(newUrl)
    return newUrl
  }
  
  return '/assets/image.png'
}

const LazyImage = ({ 
  src, 
  alt, 
  width = '100%', 
  height = 'auto', 
  fit = 'cover', 
  radius = '8px',
  className = '',
  ...props 
}) => {
  const [imageUrl, setImageUrl] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const imgRef = useRef(null)

  useEffect(() => {
    if (!src) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src])

  useEffect(() => {
    if (isInView && src) {
      // 检查是否是本地图片
      if (src.startsWith('/assets/') || src.startsWith('./assets/')) {
        setImageUrl(src)
      } else {
        // 外部图片使用代理
        setImageUrl(getProxiedImageUrl(src))
      }
    }
  }, [isInView, src])

  const handleLoad = () => {
    setIsLoaded(true)
    setHasError(false)
  }

  const handleError = () => {
    if (retryCount < PROXY_SERVICES.length - 1) {
      // 尝试下一个代理
      setRetryCount(prev => prev + 1)
      const newUrl = handleImageError(src, setImageUrl, retryCount + 1)
      setImageUrl(newUrl)
    } else {
      // 所有代理都失败，使用占位图
      setHasError(true)
      setImageUrl('/assets/image.png')
    }
  }

  return (
    <div 
      ref={imgRef}
      className={`${styles.container} ${className}`}
      style={{ 
        width, 
        height,
        borderRadius: radius,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
      {...props}
    >
      {!isInView && (
        <div className={styles.placeholder}>加载中...</div>
      )}
      
      {isInView && !isLoaded && !hasError && (
        <div className={styles.placeholder}>加载中...</div>
      )}
      
      {isInView && hasError && (
        <div className={styles.errorPlaceholder}>加载失败</div>
      )}
      
      {isInView && imageUrl && (
        <img
          src={imageUrl}
          alt={alt}
          className={styles.image}
          style={{
            width: '100%',
            height: '100%',
            objectFit: fit,
            borderRadius: radius,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  )
}

export default LazyImage 