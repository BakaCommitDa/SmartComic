import React, { memo } from 'react'
import LazyImage from '@/components/LazyImage'
import styles from './scheduleCard.module.css'

const ScheduleCard = memo(({ item }) => {
  const { title, imageUrl, releaseInfo, genres } = item

  return (
    <div className={styles.scheduleCard}>
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
})

ScheduleCard.displayName = 'ScheduleCard'

export default ScheduleCard 