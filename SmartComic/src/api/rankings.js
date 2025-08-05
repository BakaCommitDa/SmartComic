import axios from './config'

// 获取排行榜数据
export const getRankingsData = async (category = 'july') => {
  return axios.get(`/rankings/${category}`)
}

// 获取排行榜标签列表
export const getRankingsTabs = async () => {
  return axios.get('/rankings/tabs')
} 