import axios, { isVercel, getFrontendData } from './config'
import { rankingsData, rankingsTabs } from '../../mock/data'

// 获取排行榜数据
export const getRankingsData = async (category = 'july') => {
  if (isVercel) {
    return getFrontendData(rankingsData[category] || [])
  }
  return axios.get(`/rankings/${category}`)
}

// 获取排行榜标签列表
export const getRankingsTabs = async () => {
  if (isVercel) {
    return getFrontendData(rankingsTabs)
  }
  return axios.get('/rankings/tabs')
} 