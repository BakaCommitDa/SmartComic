import React, { useState, useEffect } from 'react'
import styles from './banner.module.css'

const Banner = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // 自动播放
  useEffect(() => {
    if (!isAutoPlay || !banners || banners.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 4000) // 4秒切换一次

    return () => clearInterval(timer)
  }, [banners, isAutoPlay])

  // 手动切换
  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
    // 3秒后恢复自动播放
    setTimeout(() => setIsAutoPlay(true), 3000)
  }

  // 上一张
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    )
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 3000)
  }

  // 下一张
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 3000)
  }

  if (!banners || banners.length === 0) return null

  const currentBanner = banners[currentIndex]

  return (
    <div className={styles.banner}>
      <div className={styles.bannerImage}>
        <img 
          src={currentBanner.imageUrl} 
          alt={currentBanner.title}
          className={styles.bannerImg}
        />
        <div className={styles.bannerOverlay}>
          <div className={styles.bannerContent}>
            <h2 className={styles.bannerTitle}>{currentBanner.title}</h2>
            <p className={styles.bannerSubtitle}>{currentBanner.subtitle}</p>
          </div>
        </div>
        
        {/* 左右箭头 */}
        {banners.length > 1 && (
          <>
            <button 
              className={styles.arrowButton} 
              onClick={goToPrevious}
              style={{ left: '10px' }}
            >
              ‹
            </button>
            <button 
              className={styles.arrowButton} 
              onClick={goToNext}
              style={{ right: '10px' }}
            >
              ›
            </button>
          </>
        )}
      </div>
      
      {/* 指示器 */}
      {banners.length > 1 && (
        <div className={styles.indicators}>
          {banners.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.active : ''
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Banner 