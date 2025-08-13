import axios, { isVercel, getFrontendData } from './config'
import { scheduleData, scheduleDateList } from '../../mock/data'

// 获取排期表数据
export const getScheduleData = async (date = '08-04') => {
  if (isVercel) {
    return getFrontendData(scheduleData[date] || [])
  }
  return axios.get(`/schedule/${date}`)
}

// 获取排期表日期列表
export const getScheduleDateList = async () => {
  if (isVercel) {
    return getFrontendData(scheduleDateList)
  }
  return axios.get('/schedule/dates')
} 