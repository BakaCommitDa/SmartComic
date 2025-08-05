import axios from './config'

// 获取排期表数据
export const getScheduleData = async (date = '08-04') => {
  return axios.get(`/schedule/${date}`)
}

// 获取排期表日期列表
export const getScheduleDateList = async () => {
  return axios.get('/schedule/dates')
} 