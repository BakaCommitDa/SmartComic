import { create } from 'zustand'
import { getRankingsData, getRankingsTabs } from '../api/rankings'

export const useRankingsStore = create((set, get) => ({
  activeTab: 'july',
  rankingsData: [],
  tabs: [],
  isLoading: false,
  error: null,

  // 设置活动标签
  setActiveTab: (tabId) => {
    set({ activeTab: tabId })
    get().fetchRankingsData(tabId)
  },

  // 获取排行榜数据
  fetchRankingsData: async (category = 'july') => {
    try {
      set({ isLoading: true, error: null })
      
      const response = await getRankingsData(category)
      set({ 
        rankingsData: response.data || [],
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error.message || '获取数据失败',
        isLoading: false 
      })
    }
  },

  // 获取标签列表
  fetchRankingsTabs: async () => {
    try {
      set({ isLoading: true, error: null })
      
      const response = await getRankingsTabs()
      set({ 
        tabs: response.data || [],
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error.message || '获取标签失败',
        isLoading: false 
      })
    }
  },

  // 初始化排行榜
  initializeRankings: async () => {
    const { fetchRankingsTabs, fetchRankingsData, activeTab } = get()
    
    try {
      await Promise.all([
        fetchRankingsTabs(),
        fetchRankingsData(activeTab)
      ])
    } catch (error) {
      console.error('Initialize rankings error:', error)
    }
  },

  // 清除错误
  clearError: () => {
    set({ error: null })
  }
}))
