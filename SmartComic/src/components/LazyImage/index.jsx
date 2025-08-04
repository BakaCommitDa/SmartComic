import { useEffect, useRef, useState } from 'react'
import styles from './lazyImage.module.css'

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
      className={styles.container}
      style={{ 
        width: width || '100%', 
        height: height || '100%',
        borderRadius: radius || '8px'
      }}
    >
      {!isInView && (
        <div className={styles.placeholder}>加载中...</div>
      )}
      
      {isInView && !isLoaded && !hasError && (
        <div className={styles.placeholder}>加载中...</div>
      )}
      
      {isInView && hasError && (
        <div className={styles.error}>
          <div className={styles.errorText}>加载失败</div>
          <div className={styles.fallbackImage}>
            <div className={styles.fallbackIcon}>📺</div>
          </div>
        </div>
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          style={{
            objectFit: fit || 'cover',
            borderRadius: radius || '8px',
            opacity: isLoaded ? 1 : 0
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  )
}

export default LazyImage 