import React from 'react'
import { useCallback } from 'react'
import styles from './tabSelector.module.css'

const TabSelector = ({ tabs, activeTab, onTabChange }) => {
  const handleTabClick = useCallback((tabId) => {
    onTabChange(tabId)
  }, [onTabChange])

  return (
    <div className={styles.container}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tabItem} ${
              activeTab === tab.id ? styles.active : ''
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(TabSelector) 