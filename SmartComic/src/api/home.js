import axios, { isVercel, getFrontendData } from './config'
import { homeData, bannerData, hotNewReleasesData, japaneseAnimeData, navTabsData } from '../../mock/data'

// 获取首页数据
export const getHomeData = async () => {
  if (isVercel) {
    return getFrontendData(homeData)
  }
  return axios.get('/home')
}

// 获取首页轮播图数据
export const getHomeBanner = async () => {
  if (isVercel) {
    return getFrontendData(bannerData)
  }
  return axios.get('/home/banner')
}

// 获取热门新番数据
export const getHotNewReleases = async () => {
  if (isVercel) {
    return getFrontendData(hotNewReleasesData)
  }
  return axios.get('/home/hot-new-releases')
}

// 获取日漫数据
export const getJapaneseAnime = async () => {
  if (isVercel) {
    return getFrontendData(japaneseAnimeData)
  }
  return axios.get('/home/japanese-anime')
}

// 获取导航标签数据
export const getHomeNavTabs = async () => {
  if (isVercel) {
    return getFrontendData(navTabsData)
  }
  return axios.get('/home/nav-tabs')
} 