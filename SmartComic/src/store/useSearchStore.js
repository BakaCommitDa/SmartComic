import { create } from 'zustand';
import { getSearchSuggestions, getHotSearchList } from '../api/search';

// 从localStorage获取历史记录
const getSearchHistory = () => {
  try {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    return [];
  }
};

// 保存历史记录到localStorage
const saveSearchHistory = (history) => {
  try {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  } catch (error) {
    console.error('保存搜索历史失败:', error);
  }
};

export const useSearchStore = create((set, get) => ({
  // 状态
  hotList: [],
  suggestList: [],
  searchHistory: getSearchHistory(),
  isLoading: false,
  error: null,

  // 获取热门搜索列表
  setHotList: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getHotSearchList();
      set({
        hotList: response.data || [],
        isLoading: false
      });
    } catch (error) {
      set({
        error: error.message || '获取热门搜索失败',
        isLoading: false
      });
    }
  },

  // 获取搜索建议
  setSuggestList: async (query) => {
    if (!query.trim()) {
      set({ suggestList: [] });
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const response = await getSearchSuggestions(query);
      set({
        suggestList: response.data || [],
        isLoading: false
      });
    } catch (error) {
      set({
        error: error.message || '获取搜索建议失败',
        isLoading: false
      });
    }
  },

  // 添加搜索历史
  addSearchHistory: (keyword) => {
    if (!keyword.trim()) return;
    
    const { searchHistory } = get();
    const newHistory = [keyword, ...searchHistory.filter(item => item !== keyword)].slice(0, 20);
    
    set({ searchHistory: newHistory });
    saveSearchHistory(newHistory);
  },

  // 清除搜索历史
  clearSearchHistory: () => {
    set({ searchHistory: [] });
    saveSearchHistory([]);
  },

  // 删除单个搜索历史
  removeSearchHistory: (keyword) => {
    const { searchHistory } = get();
    const newHistory = searchHistory.filter(item => item !== keyword);
    
    set({ searchHistory: newHistory });
    saveSearchHistory(newHistory);
  },

  // 清除搜索建议
  clearSuggestList: () => {
    set({ suggestList: [] });
  },

  // 清除错误
  clearError: () => {
    set({ error: null });
  }
}));

export default useSearchStore; 