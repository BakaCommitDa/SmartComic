import axios from './config'

// 获取首页数据
export const getHomeData = async () => {
  return axios.get('/home')
}

// 获取首页轮播图数据
export const getHomeBanner = async () => {
  return axios.get('/home/banner')
}

// 获取热门新番数据
export const getHotNewReleases = async () => {
  return axios.get('/home/hot-new-releases')
}

// 获取日漫数据
export const getJapaneseAnime = async () => {
  return axios.get('/home/japanese-anime')
}

// 获取导航标签数据
export const getHomeNavTabs = async () => {
  return axios.get('/home/nav-tabs')
} 