import request, { isVercel, getFrontendData } from './config';
import { hotSearchList, searchSuggestionsData } from '../../mock/data';

// 获取热门搜索列表
export const getHotSearchList = () => {
  if (isVercel) {
    return getFrontendData(hotSearchList)
  }
  return request({
    url: '/search/hot',
    method: 'GET'
  });
};

// 获取搜索建议
export const getSearchSuggestions = (query) => {
  if (isVercel) {
    // 模拟搜索建议逻辑
    const suggestions = searchSuggestionsData.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10)
    return getFrontendData(suggestions)
  }
  return request({
    url: '/search/suggest',
    method: 'GET',
    params: { query }
  });
};

// 搜索动漫
export const searchAnime = (params) => {
  if (isVercel) {
    // 返回空结果，因为搜索功能在Vercel环境下可能不需要
    return getFrontendData([])
  }
  return request({
    url: '/search/anime',
    method: 'GET',
    params
  });
}; 