import { create } from 'zustand'
import { getScheduleData, getScheduleDateList } from '../api/schedule'

export const useScheduleStore = create((set, get) => ({
  // 状态
  scheduleItems: [],
  currentSelectedDate: '08-04',
  isLoading: false,
  error: null,
  
  // 日期列表
  dateList: [],
  
  // 选择日期
  selectDate: (date) => {
    set({ currentSelectedDate: date })
    get().fetchScheduleData(date)
  },
  
  // 获取排期数据
  fetchScheduleData: async (date) => {
    try {
    set({ isLoading: true, error: null })
    
      const response = await getScheduleData(date)
      set({ 
        scheduleItems: response.data || [],
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error.message || '获取排期数据失败',
        isLoading: false 
      })
    }
  },
  
  // 获取日期列表
  fetchScheduleDateList: async () => {
    try {
      set({ isLoading: true, error: null })
      
      const response = await getScheduleDateList()
      set({ 
        dateList: response.data || [],
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error.message || '获取日期列表失败',
        isLoading: false 
      })
    }
  },
  
  // 初始化数据
  initializeSchedule: async () => {
    const { fetchScheduleDateList, fetchScheduleData, currentSelectedDate } = get()
    
    try {
      await Promise.all([
        fetchScheduleDateList(),
        fetchScheduleData(currentSelectedDate)
      ])
    } catch (error) {
      console.error('Initialize schedule error:', error)
    }
  },
  
  // 清除错误
  clearError: () => {
    set({ error: null })
  }
})) 