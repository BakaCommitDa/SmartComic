import React from 'react'
import { useCallback } from 'react'
import styles from './errorMessage.module.css'

const ErrorMessage = ({ error, onRetry }) => {
  const handleRetry = useCallback(() => {
    onRetry()
  }, [onRetry])

  return (
    <div className={styles.container}>
      <div className={styles.errorIcon}>⚠️</div>
      <div className={styles.errorText}>{error}</div>
      <button onClick={handleRetry} className={styles.retryButton}>
        重试
      </button>
    </div>
  )
}

export default React.memo(ErrorMessage) 