import { useEffect, useRef, useState } from 'react'
import { Image, Button } from 'react-vant'
import useTitle from '@/hooks/useTitle'
import { useScheduleStore } from '@/store/scheduleStore'
import styles from './schedule.module.css'

// 懒加载图片组件
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

// 日期选择器组件
const DateSelector = ({ dateList, currentDate, onDateSelect }) => {
  return (
    <div className={styles.dateSelector}>
      <div className={styles.pageTitle}>排期表</div>
      <div className={styles.dateList}>
        {dateList.map((dateItem) => (
          <div
            key={dateItem.date}
            className={`${styles.dateItem} ${
              currentDate === dateItem.date ? styles.active : ''
            }`}
            onClick={() => onDateSelect(dateItem.date)}
          >
            <div className={styles.dateDay}>{dateItem.day}</div>
            <div className={styles.dateNumber}>
              {dateItem.date.split('-')[1]}
            </div>
            <div className={styles.dot}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 排期项目组件
const ScheduleItem = ({ item }) => {
  const { title, imageUrl, releaseInfo, genres } = item

  return (
    <div className={styles.scheduleItem}>
      <div className={styles.imageContainer}>
        <LazyImage
          src={imageUrl}
          alt={title}
          width="100%"
          fit="cover"
          radius="8px"
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.releaseInfo}>{releaseInfo}</div>
        <div className={styles.genres}>
          {genres.map((genre, index) => (
            <span key={index} className={styles.genre}>
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// 排期网格组件
const ScheduleGrid = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyText}>暂无排期数据</div>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <ScheduleItem key={item.id} item={item} />
      ))}
    </div>
  )
}

// 加载组件
const LoadingSpinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <div className={styles.loadingText}>加载中...</div>
    </div>
  )
}

// 错误信息组件
const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <div className={styles.errorText}>{error}</div>
      <Button 
        type="primary" 
        size="small" 
        onClick={onRetry}
        className={styles.retryButton}
      >
        重试
      </Button>
    </div>
  )
}

// 主组件
const Schedule = () => {
  const { 
    scheduleItems, 
    currentSelectedDate, 
    dateList,
    isLoading, 
    error,
    selectDate, 
    initializeSchedule,
    clearError 
  } = useScheduleStore()

  useTitle("排期表")

  useEffect(() => {
    initializeSchedule()
  }, [initializeSchedule])

  const handleDateSelect = (date) => {
    selectDate(date)
  }

  const handleRetry = () => {
    clearError()
    initializeSchedule()
  }

  return (
    <div className={styles.container}>
      {/* 日期选择器 */}
      <DateSelector 
        dateList={dateList}
        currentDate={currentSelectedDate}
        onDateSelect={handleDateSelect}
      />
      
      {/* 内容区域 */}
      <div className={styles.content}>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage error={error} onRetry={handleRetry} />
        ) : (
          <ScheduleGrid items={scheduleItems} />
        )}
      </div>
    </div>
  )
}

export default Schedule