import request from './config';

// 获取热门搜索列表
export const getHotSearchList = () => {
  return request({
    url: '/search/hot',
    method: 'GET'
  });
};

// 获取搜索建议
export const getSearchSuggestions = (query) => {
  return request({
    url: '/search/suggest',
    method: 'GET',
    params: { query }
  });
};

// 搜索动漫
export const searchAnime = (params) => {
  return request({
    url: '/search/anime',
    method: 'GET',
    params
  });
}; 