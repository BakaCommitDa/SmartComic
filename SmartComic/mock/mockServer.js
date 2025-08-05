import Mock from 'mockjs'
import { rankingsData, rankingsTabs, scheduleData, scheduleDateList, homeData } from './data.js'

// 排行榜相关接口
Mock.mock(/\/api\/rankings\/(july|april|classic)/, 'get', (options) => {
  const url = new URL(options.url, 'http://localhost')
  const category = url.pathname.split('/').pop()
  return {
    code: 0,
    data: rankingsData[category] || []
  }
})

Mock.mock('/api/rankings/tabs', 'get', {
  code: 0,
  data: rankingsTabs
})

// 排期表相关接口
Mock.mock('/api/schedule/dates', 'get', {
  code: 0,
  data: scheduleDateList
})

// 排期数据接口
Mock.mock(/\/api\/schedule\/\d{2}-\d{2}/, 'get', (options) => {
  const url = new URL(options.url, 'http://localhost')
  const date = url.pathname.split('/').pop()
  return {
    code: 0,
    data: scheduleData[date] || []
  }
})

// Home页面相关接口
Mock.mock('/api/home', 'get', {
  code: 0,
  data: homeData
})

Mock.mock('/api/home/banner', 'get', {
  code: 0,
  data: homeData.banner
})

Mock.mock('/api/home/hot-new-releases', 'get', {
  code: 0,
  data: homeData.hotNewReleases
})

Mock.mock('/api/home/japanese-anime', 'get', {
  code: 0,
  data: homeData.japaneseAnime
})

Mock.mock('/api/home/nav-tabs', 'get', {
  code: 0,
  data: homeData.navTabs
})

export default Mock 