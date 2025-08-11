import Mock from 'mockjs'
import { rankingsData, rankingsTabs, scheduleData, scheduleDateList, homeData } from './data.js'
import jwtMock from './jwt.js'

// 排行榜相关接口
Mock.mock(/\/api\/rankings\/(july|april|classic)/, 'get', (options) => {
  const url = new URL(options.url, 'http://localhost')
  const category = url.pathname.split('/').pop()
  return {
    code: 0,
    data: rankingsData[category] || []
  }
})

Mock.mock('/api/rankings/tabs', 'get', {
  code: 0,
  data: rankingsTabs
})

// 排期表相关接口
Mock.mock('/api/schedule/dates', 'get', {
  code: 0,
  data: scheduleDateList
})

// 排期数据接口
Mock.mock(/\/api\/schedule\/\d{2}-\d{2}/, 'get', (options) => {
  const url = new URL(options.url, 'http://localhost')
  const date = url.pathname.split('/').pop()
  return {
    code: 0,
    data: scheduleData[date] || []
  }
})

// Home页面相关接口
Mock.mock('/api/home', 'get', {
  code: 0,
  data: homeData
})

Mock.mock('/api/home/banner', 'get', {
  code: 0,
  data: homeData.banner
})

Mock.mock('/api/home/hot-new-releases', 'get', {
  code: 0,
  data: homeData.hotNewReleases
})

Mock.mock('/api/home/japanese-anime', 'get', {
  code: 0,
  data: homeData.japaneseAnime
})

Mock.mock('/api/home/nav-tabs', 'get', {
  code: 0,
  data: homeData.navTabs
})

// 搜索相关API
Mock.mock('/api/search/hot', 'get', {
  code: 200,
  message: 'success',
  data: [
    { id: 1, name: '进击的巨人', type: 'anime', hot: 9999 },
    { id: 2, name: '鬼灭之刃', type: 'anime', hot: 8888 },
    { id: 3, name: '海贼王', type: 'anime', hot: 7777 },
    { id: 4, name: '火影忍者', type: 'anime', hot: 6666 },
    { id: 5, name: '死神', type: 'anime', hot: 5555 },
    { id: 6, name: '龙珠', type: 'anime', hot: 4444 },
    { id: 7, name: '名侦探柯南', type: 'anime', hot: 3333 },
    { id: 8, name: '钢之炼金术师', type: 'anime', hot: 2222 },
    { id: 9, name: '全职猎人', type: 'anime', hot: 1111 },
    { id: 10, name: '银魂', type: 'anime', hot: 1000 }
  ]
});

// 使用真实动漫数据生成搜索建议
Mock.mock('/api/search/suggest', 'get', (options) => {
  const url = new URL(options.url, 'http://localhost')
  const query = url.searchParams.get('query')
  let suggestions = [];
  
  if (query && query.trim()) {
    const searchTerm = query.trim().toLowerCase();
    
    // 从所有动漫数据中搜索匹配的标题
    const allAnimeData = [
      ...homeData.hotNewReleases,
      ...homeData.japaneseAnime,
      ...homeData.movieAnime,
      ...homeData.classicAnime,
      ...homeData.rankingItems,
      ...Object.values(scheduleData).flat() // 排期表中的所有动漫
    ];
    
    // 搜索匹配的动漫标题
    const matchedAnime = allAnimeData.filter(anime => 
      anime.title.toLowerCase().includes(searchTerm) ||
      (anime.description && anime.description.toLowerCase().includes(searchTerm)) ||
      (anime.genres && anime.genres.some(genre => genre.toLowerCase().includes(searchTerm)))
    );
    
    // 提取匹配的标题作为建议
    suggestions = matchedAnime.map(anime => anime.title);
    
    // 去重并限制数量
    suggestions = [...new Set(suggestions)].slice(0, 10);
    
    // 如果没有找到匹配的动漫，提供一些通用建议
    if (suggestions.length === 0) {
      const commonAnime = [
        '进击的巨人', '鬼灭之刃', '海贼王', '火影忍者', '死神', '龙珠',
        '名侦探柯南', '钢之炼金术师', '全职猎人', '银魂', '蜡笔小新',
        '哆啦A梦', '数码宝贝', '美少女战士', '圣斗士星矢', '北斗神拳',
        '城市猎人', '灌篮高手', '网球王子', '黑子的篮球', '犬夜叉',
        '新世纪福音战士', '攻壳机动队', '死亡笔记', '家庭教师'
      ];
      
      suggestions = commonAnime.filter(anime => 
        anime.toLowerCase().includes(searchTerm)
      ).slice(0, 5);
    }
  }
  
  return {
    code: 200,
    message: 'success',
    data: suggestions
  };
});

Mock.mock('/api/search/anime', 'get', (options) => {
  const url = new URL(options.url, 'http://localhost')
  const query = url.searchParams.get('query')
  const page = url.searchParams.get('page') || 1
  const limit = url.searchParams.get('limit') || 20
  
  // 从所有动漫数据中搜索
  const allAnimeData = [
    ...homeData.hotNewReleases,
    ...homeData.japaneseAnime,
    ...homeData.movieAnime,
    ...homeData.classicAnime,
    ...homeData.rankingItems,
    ...Object.values(scheduleData).flat()
  ];
  
  const results = allAnimeData.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
    (item.genres && item.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase())))
  );
  
  return {
    code: 200,
    message: 'success',
    data: {
      list: results,
      total: results.length,
      page: parseInt(page),
      limit: parseInt(limit)
    }
  };
});

// JWT相关接口
jwtMock.forEach(item => {
  Mock.mock(item.url, item.method, item.response)
})

export default Mock 