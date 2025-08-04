import React from 'react'
import { useMemo } from 'react'
import LazyImage from '@/components/LazyImage'
import styles from './rankingItem.module.css'

const RankingItem = ({ item }) => {
  const { title, imageUrl, author, year, rating, description, tags } = item

  // 使用useMemo缓存标签渲染
  const renderedTags = useMemo(() => (
    tags.map((tag, index) => (
      <span key={index} className={styles.tag}>
        {tag}
      </span>
    ))
  ), [tags])

  return (
    <div className={styles.listItem}>
      <div className={styles.imageContainer}>
        <LazyImage
          src={imageUrl}
          alt={title}
          width="100%"
          height="100%"
          fit="cover"
          radius="8px"
        />
      </div>
      
      <div className={styles.itemContent}>
        <div className={styles.titleRow}>
          <div className={styles.title}>{title}</div>
        </div>
        
        <div className={styles.author}>{author} | {year}</div>
        
        <div className={styles.description}>{description}</div>
        
        <div className={styles.tags}>
          {renderedTags}
        </div>
      </div>
    </div>
  )
}

export default React.memo(RankingItem) 