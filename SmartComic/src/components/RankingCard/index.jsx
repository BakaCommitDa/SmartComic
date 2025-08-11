import React, { memo } from 'react'
import LazyImage from '@/components/LazyImage'
import styles from './rankingCard.module.css'

const RankingCard = memo(({ item }) => {
  const { title, imageUrl, author, year, rating, description, tags } = item

  return (
    <div className={styles.rankingCard}>
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
        <div className={styles.authorInfo}>
          <span className={styles.author}>{author}</span>
          <span className={styles.year}>{year}</span>
        </div>
        <div className={styles.description}>{description}</div>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
})

RankingCard.displayName = 'RankingCard'

export default RankingCard 