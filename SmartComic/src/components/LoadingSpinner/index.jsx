import React from 'react'
import styles from './loadingSpinner.module.css'

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <div className={styles.loadingText}>加载中...</div>
    </div>
  )
}

export default React.memo(LoadingSpinner) 
 