import React, { useEffect, useRef, useState } from 'react'
import styles from './animeCard.module.css'

// 内联LazyImage组件，与排期表页面完全一致
const LazyImage = ({ src, alt, width, height, fit, radius }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px', // 提前50px开始加载
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
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  return (
    <div 
      ref={imgRef}
      style={{ 
        width: width || '100%', 
        aspectRatio: '3/4',
        borderRadius: radius || '8px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {!isInView && (
        <div style={{ color: '#999', fontSize: '14px' }}>加载中...</div>
      )}
      
      {isInView && !isLoaded && !hasError && (
        <div style={{ color: '#999', fontSize: '14px' }}>加载中...</div>
      )}
      
      {isInView && hasError && (
        <div style={{ color: '#ff4d4f', fontSize: '14px' }}>加载失败</div>
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: fit || 'cover',
            borderRadius: radius || '8px',
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

const AnimeCard = ({ item, showTags = false }) => {
  return (
    <div className={styles.card}>
      <div style={{ position: 'relative' }}>
        <LazyImage
          src={item.imageUrl}
          alt={item.title}
          width="100%"
          fit="cover"
          radius="8px"
        />
        {showTags && item.tags && item.tags.length > 0 && (
          <div className={styles.tag}>
            {item.tags[0]}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.releaseInfo}>
          {item.status} • {item.episode}
        </div>
        {item.genres && item.genres.length > 0 && (
          <div className={styles.genres}>
            {item.genres.slice(0, 4).map((genre, index) => (
              <span key={index} className={styles.genre}>
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AnimeCard 