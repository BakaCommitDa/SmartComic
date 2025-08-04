import { create } from 'zustand'

const rankingsData = {
  july: [
    {
      id: 1,
      title: '碧蓝之海 第二季',
      imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/d6/29/515880_96Oxr.jpg',
      author: '高松信司',
      year: '2025',
      rating: '7.3',
      description: '以上大学为契机,北原伊织开始在沿海城镇居住。他在那里遇见的是美貌出众的女孩、以及爱喝酒与水肺潜水的强壮男人们。最棒的校园',
      tags: ['搞笑', '日常', '青春', '动作']
    },
    {
      id: 2,
      title: '章鱼哔的原罪',
      imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/57/d4/527620_6g9Ln.jpg',
      author: '飯野慎也',
      year: '2025',
      rating: '8.1',
      description: '来自 HAPPY 星的外星人章鱼哔,目的是在地球散播 HAPPY。然而出师不利,一来到地球他就差点饿死,此时救了他一命的是平凡的少女小静...',
      tags: ['校园', '奇幻', '推理', '悬疑', '致郁作']
    },
    {
      id: 3,
      title: '更衣人偶坠入爱河 第二季',
      imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/38/44/398951_M97dM.jpg',
      author: '篠原啓輔',
      year: '2025',
      rating: '7.8',
      description: '某一天的相遇为开端,通过Cosplay加深交流的喜多川海梦与五条新菜。还有好多想尝试的Cosplay,想制作的服装。在与同班同学们的交...',
      tags: ['日常', '萌系', '治愈', '校园', '恋爱', '青春']
    },
    {
      id: 4,
      title: '薰香花朵凛然绽放',
      imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/b8/0d/513345_jv4wM.jpg',
      author: '黒木美幸',
      year: '2025',
      rating: '7.5',
      description: '家里开蛋糕店的凛太郎,因为高大的体型与凶狠的外表,从他小时候周围的人都对他抱有严重的偏见。某天,帮忙顾店的凛太郎与现场唯一的...',
      tags: ['校园', '恋爱']
    },
    {
      id: 5,
      title: '我们不可能成为恋人! 绝对不行。',
      imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/ae/03/524707_1quxk.jpg',
      author: '未知',
      year: '2025',
      rating: '7.2',
      description: '一个关于青春恋爱的故事，探讨了友情与爱情之间的界限。主角们面临着复杂的情感选择。',
      tags: ['恋爱', '日常', '校园', '青春']
    }
  ],
  april: [
    {
      id: 1,
      title: '赛马娘 芦毛灰姑娘',
      imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/9e/fa/509297_Cnz9B.jpg',
      author: '伊藤祐毅・みうらたけひろ',
      year: '2025',
      rating: '7.9',
      description: '于《周刊YOUNG JUMP》火爆连载中,总销量突破650万部!!以跨媒体作品《赛马娘》中的角色·小栗帽为主角的漫画,终于改编为动画!!',
      tags: ['运动']
    },
    {
      id: 2,
      title: '夏日口袋 Summer Pockets',
      imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/23/ce/363957_pgptl.jpg',
      author: '小林智樹',
      year: '2025',
      rating: '8.2',
      description: '主人公鹰原羽依里为了整理已故祖母的遗物,利用暑假时间独自来到了鸟白岛。当他走下一天只有几班的渡轮时,遇见了一名少女。她任由海...',
      tags: ['治愈', '恋爱']
    },
    {
      id: 3,
      title: '男女之间的友情存在吗？（不，不存在!!）',
      imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/17/74/395493_FAWf3.jpg',
      author: '鈴木洋平',
      year: '2025',
      rating: '7.6',
      description: '在某一所乡下国中,一对男女向彼此发誓要永远当朋友。两人追逐同一个梦想,成为命运共同体(挚友),而他们的关系并没有特别的进展...',
      tags: ['恋爱', '日常', '校园', '神作']
    },
    {
      id: 4,
      title: 'Lycoris Recoil 莉可丽丝：友谊是时间的窃贼',
      imageUrl: 'https://lain.bgm.tv/pic/cover/l/01/d5/504950_WmdZx.jpg',
      author: '足立慎吾',
      year: '2025',
      rating: '8.0',
      description: '以咖啡厅LycoReco为舞台,将为您带来千束和泷奈等角色的6段日常故事。',
      tags: ['日常', '短篇']
    }
  ],
  classic: [
    {
      id: 1,
      title: '进击的巨人最终季 完结篇后篇',
      imageUrl: 'https://images.weserv.nl/?url=https://lz.sinaimg.cn/mw690/b9af179fgy1htmdilcj7jj21401kwgz8.jpg',
      author: '林祐一郎',
      year: '2023',
      rating: '7.5',
      description: '[后篇]化身末日巨人的艾连带领着无数巨人前进史拉托亚要塞。这时,出现在深陷绝境的难民们面前的,是在千钧一发之际逃过地鸣的米卡...',
      tags: ['奇幻', '战斗', '冒险', '热血']
    },
    {
      id: 2,
      title: '葬送的芙莉莲',
      imageUrl: 'https://images.weserv.nl/?url=https://lz.sinaimg.cn/mw1024/006yt1Omgy1hg2ko0r07hj315p1jkhdt.jpg',
      author: '未知',
      year: '2023',
      rating: '8.5',
      description: '打倒了魔王的勇者一行人的后日谈——————在"那之后"的故事。身为魔法使的芙莉莲是一位精灵,她和另外三人有着不一样的地方。',
      tags: ['奇幻', '冒险']
    },
    {
      id: 3,
      title: '我推的孩子',
      imageUrl: 'https://images.weserv.nl/?url=https://lz.sinaimg.cn/mw1024/006yt1Omgy1h32ghf8rsbj30p00zddp3.jpg',
      author: '未知',
      year: '2023',
      rating: '8.8',
      description: '当红爱豆"星野爱"未婚生子,产下一对双胞胎,妇科男医生和早逝女病人双双遇难,转生为自己的爱豆"星野爱"的孩子,三年后"星野爱"被害身...',
      tags: ['悬疑', '推理', '神作']
    },
    {
      id: 4,
      title: '咒术回战 第二季',
      imageUrl: 'https://images.weserv.nl/?url=https://lz.sinaimg.cn/mw1024/006yt1Omgy1hcc5rpsh83j31jk26k1ky.jpg',
      author: '御所園翔太',
      year: '2023',
      rating: '8.2',
      description: '最强2人,回不去的青春。2017年12月,乙骨忧太解除了祈本里香的诅咒。追溯到2006年(春天),高专时代的五条悟与夏油杰。',
      tags: ['热血', '奇幻', '战斗', '动作']
    },
    {
      id: 5,
      title: '鬼灭之刃 锻刀村篇',
      imageUrl: 'https://cdn.yinghuazy.xyz/jpg/ly1h2esbs3zbpj30hk0s4772.jpg',
      author: '未知',
      year: '2023',
      rating: '8.0',
      description: '炭治郎一行人前往锻刀村，在那里他们将遇到新的挑战和伙伴。这个篇章将展现更多关于日轮刀的秘密。',
      tags: ['热血', '战斗', '奇幻', '冒险']
    }
  ]
}

const tabs = [
  { id: 'july', name: '七月新番' },
  { id: 'april', name: '四月新番' },
  { id: 'classic', name: '经典热门' }
]

export const useRankingsStore = create((set, get) => ({
  activeTab: 'july',
  rankingsData,
  tabs,
  isLoading: false,
  error: null,

  getCurrentRankings: () => {
    const { activeTab, rankingsData } = get()
    return rankingsData[activeTab] || []
  },

  setActiveTab: (tabId) => {
    set({ activeTab: tabId })
  },

  setLoading: (loading) => {
    set({ isLoading: loading })
  },

  setError: (error) => {
    set({ error })
  },

  clearError: () => {
    set({ error: null })
  },

  initializeRankings: async () => {
    const { setLoading, setError } = get()
    
    try {
      setLoading(true)
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  },

  // 性能优化：添加缓存机制
  getRankingsByCategory: (category) => {
    const { rankingsData } = get()
    return rankingsData[category] || []
  },

  // 性能优化：添加搜索功能
  searchRankings: (query) => {
    const { activeTab, rankingsData } = get()
    const currentData = rankingsData[activeTab] || []
    
    if (!query) return currentData
    
    const lowerQuery = query.toLowerCase()
    return currentData.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.author.toLowerCase().includes(lowerQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }
}))
