import { create } from 'zustand'
import { getHomeData, getHomeBanner, getHotNewReleases, getJapaneseAnime, getHomeNavTabs } from '../api/home'

export const useHomeStore = create((set, get) => ({
  // 状态
  activeTab: 'featured',
  banner: [],
  hotNewReleases: [],
  japaneseAnime: [],
  scheduleItems: [],
  rankingItems: [],
  navTabs: [],
  isLoading: false,
  error: null,

  // 设置活动标签
  setActiveTab: (tabId) => {
    set({ activeTab: tabId })
  },

  // 获取首页数据
  fetchHomeData: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await getHomeData()
      set({
        banner: response.data.banner || [],
        hotNewReleases: response.data.hotNewReleases || [],
        japaneseAnime: response.data.japaneseAnime || [],
        scheduleItems: response.data.scheduleItems || [],
        rankingItems: response.data.rankingItems || [],
        navTabs: response.data.navTabs || [],
        isLoading: false
      })
    } catch (error) {
      set({
        error: error.message || '获取首页数据失败',
        isLoading: false
      })
    }
  },

  // 获取轮播图数据
  fetchHomeBanner: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await getHomeBanner()
      set({
        banner: response.data || [],
        isLoading: false
      })
    } catch (error) {
      set({
        error: error.message || '获取轮播图失败',
        isLoading: false
      })
    }
  },

  // 获取热门新番数据
  fetchHotNewReleases: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await getHotNewReleases()
      set({
        hotNewReleases: response.data || [],
        isLoading: false
      })
    } catch (error) {
      set({
        error: error.message || '获取热门新番失败',
        isLoading: false
      })
    }
  },

  // 获取日漫数据
  fetchJapaneseAnime: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await getJapaneseAnime()
      set({
        japaneseAnime: response.data || [],
        isLoading: false
      })
    } catch (error) {
      set({
        error: error.message || '获取日漫数据失败',
        isLoading: false
      })
    }
  },

  // 获取导航标签数据
  fetchHomeNavTabs: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await getHomeNavTabs()
      set({
        navTabs: response.data || [],
        isLoading: false
      })
    } catch (error) {
      set({
        error: error.message || '获取导航标签失败',
        isLoading: false
      })
    }
  },

  // 初始化首页
  initializeHome: async () => {
    const { fetchHomeData } = get()
    try {
      await fetchHomeData()
    } catch (error) {
      console.error('Initialize home error:', error)
    }
  },

  // 清除错误
  clearError: () => {
    set({ error: null })
  }
})) 