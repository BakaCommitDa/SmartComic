import React, { useState, useEffect, useRef } from 'react'
import styles from './lazyImage.module.css'

// 获取图片URL，如果是外部图片则添加代理
const getImageUrl = (originalUrl) => {
  // 如果是本地图片，直接返回
  if (originalUrl.startsWith('/assets/') || originalUrl.startsWith('./assets/')) {
    return originalUrl
  }
  
  // 如果已经是代理URL，直接返回
  if (originalUrl.includes('images.weserv.nl')) {
    return originalUrl
  }
  
  // 外部图片使用代理
  return `https://images.weserv.nl/?url=${encodeURIComponent(originalUrl)}`
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
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
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
      setImageUrl(getImageUrl(src))
    }
  }, [isInView, src])

  const handleLoad = () => {
    setIsLoaded(true)
    setHasError(false)
  }

  const handleError = () => {
    setHasError(true)
    // 保持加载中状态，不显示占位图
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
        <div className={styles.placeholder}>加载中...</div>
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