// 图片缓存工具
class ImageCache {
  constructor() {
    this.cache = new Map()
    this.loading = new Map()
  }

  // 预加载图片
  async preloadImage(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url)
    }

    if (this.loading.has(url)) {
      return this.loading.get(url)
    }

    const loadPromise = new Promise((resolve, reject) => {
      const img = new Image()
      
      img.onload = () => {
        this.cache.set(url, img)
        this.loading.delete(url)
        resolve(img)
      }
      
      img.onerror = () => {
        this.loading.delete(url)
        reject(new Error(`Failed to load image: ${url}`))
      }
      
      img.src = url
    })

    this.loading.set(url, loadPromise)
    return loadPromise
  }

  // 批量预加载图片
  async preloadImages(urls) {
    const promises = urls.map(url => this.preloadImage(url).catch(() => null))
    return Promise.all(promises)
  }

  // 检查图片是否已缓存
  isCached(url) {
    return this.cache.has(url)
  }

  // 获取缓存的图片
  getCached(url) {
    return this.cache.get(url)
  }

  // 清除缓存
  clear() {
    this.cache.clear()
    this.loading.clear()
  }

  // 获取缓存大小
  get size() {
    return this.cache.size
  }
}

// 创建全局图片缓存实例
export const imageCache = new ImageCache()

// 预加载常用图片
export const preloadCommonImages = async () => {
  const commonImages = [
    '/assets/1-carousel images.jpg',
    '/assets/2-carousel images.jpg',
    '/assets/3-carousel images .jpg',
    '/assets/4-carousel images.jpg',
    '/assets/5-carousel images.jpg',
    '/assets/6-carousel images.jpg',
    '/assets/image.png'
  ]
  
  try {
    await imageCache.preloadImages(commonImages)
    console.log('Common images preloaded successfully')
  } catch (error) {
    console.warn('Failed to preload some images:', error)
  }
}
