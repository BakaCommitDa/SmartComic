import { useEffect, useCallback, useMemo } from 'react'
import useTitle from '@/hooks/useTitle'
import { useRankingsStore } from '@/store/rankingsStore'
import TabSelector from '@/components/TabSelector'
import RankingItem from '@/components/RankingItem'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import styles from './rankings.module.css'

// 主组件
const Rankings = () => {
  const { 
    activeTab, 
    tabs, 
    isLoading, 
    error,
    getCurrentRankings,
    setActiveTab, 
    initializeRankings,
    clearError 
  } = useRankingsStore()

  useTitle("排行榜")

  // 使用useCallback优化事件处理函数
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId)
  }, [setActiveTab])

  const handleRetry = useCallback(() => {
    clearError()
  }, [clearError])

  // 使用useMemo缓存当前排行榜数据
  const currentRankings = useMemo(() => {
    return getCurrentRankings()
  }, [activeTab]) // 直接依赖activeTab而不是getCurrentRankings函数

  // 使用useMemo缓存渲染的列表项
  const renderedRankings = useMemo(() => {
    return currentRankings.map((item) => (
      <RankingItem key={`${activeTab}-${item.id}`} item={item} />
    ))
  }, [currentRankings, activeTab])

  useEffect(() => {
    initializeRankings()
  }, [initializeRankings])

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <div className={styles.pageTitle}>排行榜</div>
      </div>
      
      <TabSelector 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      <div className={styles.content}>
        <div className={styles.listContainer}>
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage error={error} onRetry={handleRetry} />
          ) : currentRankings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              暂无数据
            </div>
          ) : (
            renderedRankings
          )}
        </div>
      </div>
    </div>
  )
}

export default Rankings