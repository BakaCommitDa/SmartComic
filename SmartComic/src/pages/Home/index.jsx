import React, { useEffect, useCallback, useMemo } from 'react'
import { ClockO } from '@react-vant/icons'
import { Search } from 'react-vant'
import { useNavigate } from 'react-router-dom'
import useTitle from '@/hooks/useTitle'
import { useHomeStore } from '@/store/homeStore'
import TabSelector from '@/components/TabSelector'
import Banner from '@/components/Banner'
import AnimeCard from '@/components/AnimeCard'
import ScheduleCard from '@/components/ScheduleCard'
import RankingCard from '@/components/RankingCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import styles from './home.module.css'

const Home = () => {
  const navigate = useNavigate()
  const {
    activeTab,
    banner,
    hotNewReleases,
    japaneseAnime,
    movieAnime,
    classicAnime,
    scheduleItems,
    rankingItems,
    navTabs,
    isLoading,
    error,
    setActiveTab,
    initializeHome,
    clearError
  } = useHomeStore()

  useTitle("首页")

  // 使用useCallback优化事件处理函数
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId)
  }, [setActiveTab])

  const handleRetry = useCallback(() => {
    clearError()
    initializeHome()
  }, [clearError, initializeHome])

  // 优化搜索点击性能
  const handleSearchClick = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    // 使用 requestAnimationFrame 确保在下一帧执行导航
    requestAnimationFrame(() => {
      navigate('/search')
    })
  }, [navigate])

  // 使用useMemo缓存渲染的列表项
  const renderedHotNewReleases = useMemo(() => {
    return hotNewReleases.map((item) => (
      <AnimeCard key={item.id} item={item} showTags={true} />
    ))
  }, [hotNewReleases])

  const renderedJapaneseAnime = useMemo(() => {
    return japaneseAnime.map((item) => (
      <AnimeCard key={item.id} item={item} showTags={false} />
    ))
  }, [japaneseAnime])

  const renderedScheduleItems = useMemo(() => {
    return scheduleItems.map((item) => (
      <ScheduleCard key={item.id} item={item} />
    ))
  }, [scheduleItems])

  const renderedRankingItems = useMemo(() => {
    return rankingItems.map((item) => (
      <RankingCard key={item.id} item={item} />
    ))
  }, [rankingItems])

  const renderedMovieAnime = useMemo(() => {
    return movieAnime.map((item) => (
      <AnimeCard key={item.id} item={item} showTags={true} />
    ))
  }, [movieAnime])

  const renderedClassicAnime = useMemo(() => {
    return classicAnime.map((item) => (
      <AnimeCard key={item.id} item={item} showTags={true} />
    ))
  }, [classicAnime])

  useEffect(() => {
    initializeHome()
  }, [initializeHome])

  return (
    <div className={styles.container}>
      {/* 固定头部 */}
      <div className={styles.fixedHeader}>
        {/* 搜索栏 */}
        <div className={styles.searchBar}>
          <div className={styles.searchWrapper} onClick={handleSearchClick}>
            <Search
              placeholder="今天你想看些什么?"
              className={styles.searchInput}
              style={{
                minHeight: '64px',
                height: '64px',
                maxHeight: '64px'
              }}
              readonly
            />
          </div>
          <div className={styles.clockIcon}>
            <ClockO />
          </div>
        </div>

        {/* 导航标签 */}
        <TabSelector
          tabs={navTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage error={error} onRetry={handleRetry} />
        ) : (
          <>
            {/* 轮播图 */}
            <Banner banners={banner} />

            {/* 根据activeTab显示不同内容 */}
            {activeTab === 'featured' && (
              <>
                {/* 热门新番 */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>热门新番</h2>
                  <div className={styles.cardGrid}>
                    {renderedHotNewReleases}
                  </div>
                </div>

                {/* 排期表 */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>本周排期</h2>
                  <div className={styles.scheduleGrid}>
                    {renderedScheduleItems}
                  </div>
                </div>

                {/* 排行榜 */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>热门排行</h2>
                  <div className={styles.rankingGrid}>
                    {renderedRankingItems}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'japanese' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>日漫</h2>
                <div className={styles.cardGrid}>
                  {renderedJapaneseAnime}
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>排期表</h2>
                <div className={styles.scheduleGrid}>
                  {renderedScheduleItems}
                </div>
              </div>
            )}

            {activeTab === 'rankings' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>排行榜</h2>
                <div className={styles.rankingGrid}>
                  {renderedRankingItems}
                </div>
              </div>
            )}

            {activeTab === 'movie' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>剧场版</h2>
                <div className={styles.cardGrid}>
                  {renderedMovieAnime}
                </div>
              </div>
            )}

            {activeTab === 'classic' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>经典番剧</h2>
                <div className={styles.cardGrid}>
                  {renderedClassicAnime}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home