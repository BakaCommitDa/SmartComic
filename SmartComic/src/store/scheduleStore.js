import { create } from 'zustand'

// 排期表数据store
export const useScheduleStore = create((set, get) => ({
  // 状态
  scheduleItems: [],
  currentSelectedDate: '08-04', // 默认显示星期一
  isLoading: false,
  error: null,
  
  // 日期列表（一周的日期）
  dateList: [
    { date: '08-04', day: '今' },
    { date: '08-05', day: '二' },
    { date: '08-06', day: '三' },
    { date: '08-07', day: '四' },
    { date: '08-08', day: '五' },
    { date: '08-09', day: '六' },
    { date: '08-10', day: '天' }
  ],
  
  // 模拟数据
  mockScheduleData: {
    '08-04': [ // 星期一的排期数据
      {
        id: 1,
        title: '明天,美食广场见。',
        imageUrl: 'https://anibase.net/files/16f1e37d410f21594493c49755e60669',
        releaseInfo: '4 | 周一 20:35 更',
        genres: ['日常', '校园', '百合'],
        episode: 4,
        day: '周一',
        time: '20:35'
      },
      {
        id: 2,
        title: '碧蓝之海 第二季',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/d6/29/515880_96Oxr.jpg',
        releaseInfo: '12 | 周一 0:08 更',
        genres: ['搞笑', '日常', '青春', '动作'],
        episode: 12,
        day: '周一',
        time: '0:08'
      },
      {
        id: 3,
        title: '我们不可能成为恋人！绝对不行。（※似乎可行？）',
        imageUrl: 'https://ts4.tc.mm.bing.net/th/id/OIP-C.jxYHCCnZkMNzaIZRpJGoAQHaKd?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        releaseInfo: '4 | 周一 0:36 更',
        genres: ['恋爱', '喜剧', '后宫', '百合'],
        episode: 4,
        day: '周一',
        time: '0:36'
      },
      {
        id: 4,
        title: '鬼人幻灯抄',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/b8/b8/404753_bzlgZ.jpg',
        releaseInfo: '16 | 周一 23:08 更',
        genres: ['战斗', '兄妹', '奇幻'],
        episode: 16,
        day: '周一',
        time: '23:08'
      },
      {
        id: 5,
        title: '夏日口袋 Summer...',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/23/ce/363957_pgptl.jpg',
        releaseInfo: '17 | 周一 23:05 更',
        genres: ['治愈', '恋爱'],
        episode: 17,
        day: '周一',
        time: '23:05'
      },
      {
        id: 6,
        title: '坂本日常 Part 2',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/04/95/524005_lSNqT.jpg',
        releaseInfo: '4 | 周一 23:45 更',
        genres: ['喜剧', '动作', '犯罪', '冒险'],
        episode: 4,
        day: '周一',
        time: '23:45'
      }
    ],
    '08-05': [ // 周二的排期数据
      {
        id: 1,
        title: 'カッコウの許嫁 Season 2',
        imageUrl: 'https://ts4.tc.mm.bing.net/th/id/OIP-C.SbGyuEFsOnZVRwp4Ie4jzwHaJ9?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        releaseInfo: '4 | 周二 22:05 更',
        genres: ['搞笑', '日常', '校园', '恋爱'],
        episode: 4,
        day: '周二',
        time: '22:05'
      },
      {
        id: 2,
        title: '彼女、お借りします',
        imageUrl: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.UntxD9A319cIKCHliS0r8wHaKe?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        releaseInfo: '5 | 周二 21:40 更',
        genres: ['恋爱', '喜剧', '神作'],
        episode: 5,
        day: '周二',
        time: '21:40'
      },
      {
        id: 3,
        title: '黑廼美子的的宇宙恐怖秀',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/bd/23/528147_g6KC7.jpg',
        releaseInfo: '5 | 周二 23:45 更',
        genres: ['科幻', '原创', '喜剧'],
        episode: 5,
        day: '周二',
        time: '23:45'
      },
      {
        id: 4,
        title: '最近的侦探真没用',
        imageUrl: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.TdUB8ZsgPg5vsphVLpOktgHaKe?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        releaseInfo: '5 | 周二 22:35 更',
        genres: ['日常', '喜剧'],
        episode: 5,
        day: '周二',
        time: '22:35'
      },
      {
        id: 5,
        title: '保龄球少女!',
        imageUrl: 'https://anibase.net/files/6d5e6082f68faaee3db75511a68f8419',
        releaseInfo: '4 | 周三 1:35 更',
        genres: ['运动', '原创'],
        episode: 4,
        day: '周二',
        time: '1:35'
      }
    ],
    '08-06': [ // 周三的排期数据
      {
        id: 1,
        title: '帝乃三姐妹原来很好搞定。',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/f2/85/502272_LB63x.jpg',
        releaseInfo: '5 | 周四 1:05 更',
        genres: ['恋爱', '后宫', '校园', '喜剧'],
        episode: 5,
        day: '周三',
        time: '1:05'
      },
      {
        id: 2,
        title: '外星人姆姆',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/1f/8e/526043_BzVh4.jpg',
        releaseInfo: '17 | 周四 0:10 更',
        genres: ['科幻', '喜剧'],
        episode: 17,
        day: '周三',
        time: '0:10'
      },
      {
        id: 3,
        title: 'Clevatess-魔兽之王与婴儿与尸之勇者-',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/5c/49/502142_XG5pA.jpg',
        releaseInfo: '5 | 周三 19:35 更',
        genres: ['奇幻', '冒险'],
        episode: 5,
        day: '周三',
        time: '19:35'
      },
      {
        id: 4,
        title: '转生成自动贩卖机的我今天也在迷宫徘徊第二季',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/03/cf/455617_WG3Mg.jpg',
        releaseInfo: '5AI翻译相周五23:00更',
        genres: ['奇幻', '冒险'],
        episode: 5,
        day: '周三',
        time: '23:00'
      },
      {
        id: 5,
        title: '地狱老师',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/a7/4a/504524_uvyT0.jpg',
        releaseInfo: '停播1周5 | 周四0:30更',
        genres: ['恐怖', '奇幻', '悬疑', '校园'],
        episode: 5,
        day: '周三',
        time: '0:30'
      },
      {
        id: 6,
        title: '阴阳回天 Re:Birth',
        imageUrl: 'https://pica.zhimg.com/v2-360428f659c735432fd21d2108b20d0a_1440w.jpg',
        releaseInfo: '5 | 周四 1:20 更',
        genres: ['战斗', '原创'],
        episode: 5,
        day: '周三',
        time: '1:20'
      },
      {
        id: 7,
        title: '强者的新传说',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/ad/ac/404909_9HOfw.jpg',
        releaseInfo: '5 | 周四 2:08 更',
        genres: ['奇幻', '冒险'],
        episode: 5,
        day: '周三',
        time: '2:08'
      },
      {
        id: 8,
        title: '盾之勇者成名录 第四季',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/64/b6/476542_eEZeX.jpg',
        releaseInfo: '4 | 周三 20:05 更',
        genres: ['热血', '穿越', '奇幻', '战斗'],
        episode: 4,
        day: '周三',
        time: '20:05'
      },
      {
        id: 9,
        title: '转生七王子的魔法全解第二季',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/30/9e/499656_rpNoi.jpg',
        releaseInfo: '4 | 周三 23:35 更',
        genres: ['奇幻', '冒险', '正太', '小男娘'],
        episode: 4,
        day: '周三',
        time: '23:35'
      }
    ],
    '08-07': [ // 周四的排期数据
      {
        id: 1,
        title: '胆大党 第二季',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/4a/2b/529431_a7joa.jpg',
        releaseInfo: '5 | 周五 0:05 更',
        genres: ['校园', '奇幻', '恋爱', '搞笑'],
        episode: 5,
        day: '周四',
        time: '0:05'
      },
      {
        id: 2,
        title: '水属性魔法使',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/16/e9/532403_5rfk5.jpg',
        releaseInfo: '5 | 周五 2:35 更',
        genres: ['奇幻', '战斗', '冒险'],
        episode: 5,
        day: '周四',
        time: '2:35'
      },
      {
        id: 3,
        title: '利维坦号战记',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/58/66/497923_8r9Nr.jpg',
        releaseInfo: '7月10日(木)',
        genres: ['动作', '科幻', '历史', '战争'],
        episode: 1,
        day: '周四',
        time: '0:00'
      },
      {
        id: 4,
        title: '石纪元 第四季 Part 2',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/d3/c4/508003_kxgd3.jpg',
        releaseInfo: '4 | 周四 21:35 更',
        genres: ['冒险', '热血', '奇幻'],
        episode: 4,
        day: '周四',
        time: '21:35'
      },
      {
        id: 5,
        title: '双人单身露营',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/c5/51/531344_f65f8.jpg',
        releaseInfo: '4 | 周五 0:37 更',
        genres: ['日常', '恋爱'],
        episode: 4,
        day: '周四',
        time: '0:37'
      },
      {
        id: 6,
        title: '去唱卡拉OK吧!',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/fa/33/519956_R6iFg.jpg',
        releaseInfo: '2 | 周四 20:35 更',
        genres: ['喜剧', '音乐'],
        episode: 2,
        day: '周四',
        time: '20:35'
      },
      {
        id: 7,
        title: '为你着迷',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/61/4f/519958_7rT4r.jpg',
        releaseInfo: '8月21日22点35分开播',
        genres: ['喜剧', '校园', '青春'],
        episode: 1,
        day: '周四',
        time: '22:35'
      },
      {
        id: 8,
        title: '歌声是法式千层酥',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/ef/27/441670_EMJJ5.jpg',
        releaseInfo: '3 | 周四 21:38 更',
        genres: ['原创', '百合', '音乐', '校园'],
        episode: 3,
        day: '周四',
        time: '21:38'
      },
      {
        id: 9,
        title: '欢迎光临流放者食堂！',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/80/16/528831_21GCE.jpg',
        releaseInfo: '5 | 周四 21:45 更',
        genres: ['异世界', '美食'],
        episode: 5,
        day: '周四',
        time: '21:45'
      },
      {
        id: 10,
        title: '神椿市建设中。',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/fb/78/475032_PCVWp.jpg',
        releaseInfo: '建设中',
        genres: ['原创', '音乐', '奇幻', '战斗'],
        episode: 1,
        day: '周四',
        time: '0:00'
      },
      {
        id: 11,
        title: '银河特急 银河☆地铁',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/46/4d/545328_2RRhx.jpg',
        releaseInfo: '2025年7月放送&配信! 更新至第5集',
        genres: ['原创', '科幻', '公路'],
        episode: 5,
        day: '周四',
        time: '0:00'
      },
      {
        id: 12,
        title: 'BULLET/BULLET',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/d4/5b/408467_7lebu.jpg',
        releaseInfo: '更新至第8集',
        genres: ['奇幻', '战斗'],
        episode: 8,
        day: '周四',
        time: '0:00'
      }
    ],
    '08-08': [ // 周五的排期数据
      {
        id: 1,
        title: '宝可梦 地平线',
        imageUrl: 'https://images.weserv.nl/?url=https://lz.sinaimg.cn/large/008w3CKjgy1hcjbwcua2bj307i0amabk.jpg',
        releaseInfo: '更新至第104集',
        genres: ['动画', '冒险'],
        episode: 104,
        day: '周五',
        time: '0:00'
      },
      {
        id: 2,
        title: '药屋少女的呢喃第二季',
        imageUrl: 'https://vip.dytt-img.com/upload/vod/20250215-1/eb1eca66dbff33adbf10940fd6c60c1c.jpg',
        releaseInfo: '薬屋のひとりごと',
        genres: ['推理', '恋爱'],
        episode: 1,
        day: '周五',
        time: '0:00'
      },
      {
        id: 3,
        title: '为丑女献上花束',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/5a/25/406857_pIL9z.jpg',
        releaseInfo: '5 | 周五 22:55 更',
        genres: ['校园', '恋爱'],
        episode: 5,
        day: '周五',
        time: '22:55'
      },
      {
        id: 4,
        title: '彻夜之歌 第二季',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/15/5f/484623_6EWej.jpg',
        releaseInfo: '5 | 周五 22:38 更',
        genres: ['奇幻', '恋爱', '搞笑', '日常'],
        episode: 5,
        day: '周五',
        time: '22:38'
      },
      {
        id: 5,
        title: '渡君的XX即将崩坏',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/f8/a8/455454_cEllE.jpg',
        releaseInfo: '5 | 周六 0:25 更',
        genres: ['恋爱', '校园', '神作'],
        episode: 5,
        day: '周五',
        time: '0:25'
      },
      {
        id: 6,
        title: '破烂千金被姐姐的原婚约者溺愛着',
        imageUrl: 'https://ts2.tc.mm.bing.net/th/id/OIP-C.o5lllfQkUoAXDreo1kfJhQHaKe?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        releaseInfo: '2025年7月4日(金)放送開始',
        genres: ['恋爱'],
        episode: 1,
        day: '周五',
        time: '0:00'
      },
      {
        id: 7,
        title: '桃源暗鬼',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/b9/09/493546_gT54V.jpg',
        releaseInfo: '4 | 周五 23:08 更',
        genres: ['奇幻', '战斗', '冒险'],
        episode: 4,
        day: '周五',
        time: '23:08'
      },
      {
        id: 8,
        title: '章鱼哔的原罪',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/57/d4/527620_6g9Ln.jpg',
        releaseInfo: '5 | 周五 0:05 更',
        genres: ['校园', '奇幻', '推理', '悬疑'],
        episode: 5,
        day: '周五',
        time: '0:05'
      },
      {
        id: 9,
        title: 'Silent Witch 沉默魔女的秘密',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/a0/60/506677_B74d5.jpg',
        releaseInfo: '5 | 周五 2:35 更',
        genres: ['奇幻', '冒险', '校园'],
        episode: 5,
        day: '周五',
        time: '2:35'
      },
      {
        id: 10,
        title: '卡片战斗先导者 Divinez Deluxe决胜篇',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/d4/3f/440881_HxoO2.jpg',
        releaseInfo: '7月10日(木)',
        genres: ['竞技'],
        episode: 1,
        day: '周五',
        time: '0:00'
      }
    ],
    '08-09': [ // 周六的排期数据
      {
        id: 1,
        title: '真·武士传 剑勇传说',
        imageUrl: 'https://lain.bgm.tv/pic/cover/l/a4/1d/492881_Gk7O7.jpg',
        releaseInfo: '17 | 周六 18:07 更',
        genres: ['战斗', '奇幻'],
        episode: 17,
        day: '周六',
        time: '18:07'
      },
      {
        id: 2,
        title: '安妮·雪莉',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/2c/d5/524801_p2OVT.jpg',
        releaseInfo: '18 | 周六 21:00 更',
        genres: ['日常', '治愈'],
        episode: 18,
        day: '周六',
        time: '21:00'
      },
      {
        id: 3,
        title: '公爵千金的家庭教师',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/ac/67/459616_916Qm.jpg',
        releaseInfo: '5 | 周日 1:05 更',
        genres: ['奇幻', '恋爱', '萝莉控'],
        episode: 5,
        day: '周六',
        time: '1:05'
      },
      {
        id: 4,
        title: '9-nine- 支配者的王冠',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/0a/ad/496973_kUlKl.jpg',
        releaseInfo: '6 | 周六 21:35 更',
        genres: ['奇幻', '冒险', '恋爱'],
        episode: 6,
        day: '周六',
        time: '21:35'
      },
      {
        id: 5,
        title: '失神勇者与暗杀公主',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/8e/92/536363_42Ul2.jpg',
        releaseInfo: '5 | 周六 22:05 更',
        genres: ['奇幻', '喜剧', '冒险'],
        episode: 5,
        day: '周六',
        time: '22:05'
      },
      {
        id: 6,
        title: '怪獣8号 保科の假期',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/33/b2/507122_hUc44.jpg',
        releaseInfo: '3.28',
        genres: ['战斗', '科幻'],
        episode: 1,
        day: '周六',
        time: '0:00'
      },
      {
        id: 7,
        title: '费马的料理',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/5f/98/531945_ptCCC.jpg',
        releaseInfo: '停播1周4 | 周六 22:38 更',
        genres: ['美食'],
        episode: 4,
        day: '周六',
        time: '22:38'
      },
      {
        id: 8,
        title: '青春笨蛋少年不做圣诞服女郎的梦',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/d3/a3/467930_jH4s4.jpg',
        releaseInfo: '5 | 周日 0:05 更',
        genres: ['恋爱', '校园'],
        episode: 5,
        day: '周六',
        time: '0:05'
      },
      {
        id: 9,
        title: '更衣人偶坠入爱河第二季',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/38/44/398951_M97dM.jpg',
        releaseInfo: '5 | 周日 0:35 更',
        genres: ['日常', '萌系', '治愈', '校园'],
        episode: 5,
        day: '周六',
        time: '0:35'
      }
    ],
    '08-10': [ // 周日的排期数据
      {
        id: 1,
        title: '废渊战鬼',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/ea/10/498947_FHYeb.jpg',
        releaseInfo: '周日 23:05 更',
        genres: ['奇幻', '战斗'],
        episode: 1,
        day: '周日',
        time: '23:05'
      },
      {
        id: 2,
        title: '杀手旅店',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/e7/c7/523426_Jtmze.jpg',
        releaseInfo: '周日 23:35 更',
        genres: ['日常', '战斗'],
        episode: 1,
        day: '周日',
        time: '23:35'
      },
      {
        id: 3,
        title: '肥宅勇者',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/69/01/524593_yyLxl.jpg',
        releaseInfo: '4 | 周日 22:35 更',
        genres: ['奇幻', '战斗'],
        episode: 4,
        day: '周日',
        time: '22:35'
      },
      {
        id: 4,
        title: '活死喵之夜',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/3b/e5/481745_O6iKr.jpg',
        releaseInfo: '7月7日 更新至第4集',
        genres: ['喜剧', '奇幻'],
        episode: 4,
        day: '周日',
        time: '0:00'
      },
      {
        id: 5,
        title: '异世界默示录米诺戈拉 ～从灭亡的文明开始的世界征服～',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/f5/b1/500825_i02ef.jpg',
        releaseInfo: '4 | 周日 21:35 更',
        genres: ['冒险', '奇幻'],
        episode: 4,
        day: '周日',
        time: '21:35'
      },
      {
        id: 6,
        title: '小城日常 CITY THE ANIMATION',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/b2/c2/514358_oRoZH.jpg',
        releaseInfo: '周日 23:40 更',
        genres: ['喜剧', '日常'],
        episode: 1,
        day: '周日',
        time: '23:40'
      },
      {
        id: 7,
        title: '你与偶像光之美少女',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/0a/40/526104_i2616.jpg',
        releaseInfo: '更新至第26集',
        genres: ['魔法', '奇幻'],
        episode: 26,
        day: '周日',
        time: '0:00'
      },
      {
        id: 8,
        title: '与游戏中心的少女异文化交流的故事',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/55/d5/510256_09w10.jpg',
        releaseInfo: '4 | 周日 23:08 更',
        genres: ['恋爱', '日常', '萝莉控'],
        episode: 4,
        day: '周日',
        time: '23:08'
      },
      {
        id: 9,
        title: '公主的管弦乐团',
        imageUrl: 'https://lain.bgm.tv/r/400/pic/cover/l/4c/f7/499169_Lq2RK.jpg',
        releaseInfo: '更新至第16集',
        genres: ['魔法少女', '音乐'],
        episode: 16,
        day: '周日',
        time: '0:00'
      }
    ]
  },
  
  // Actions
  // 选择日期
  selectDate: (date) => {
    set({ currentSelectedDate: date })
    get().fetchScheduleData(date)
  },
  
  // 获取排期数据
  fetchScheduleData: async (date) => {
    set({ isLoading: true, error: null })
    
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const data = get().mockScheduleData[date] || []
      set({ 
        scheduleItems: data,
        isLoading: false 
      })
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false 
      })
    }
  },
  
  // 初始化数据
  initializeSchedule: () => {
    const currentDate = get().currentSelectedDate
    get().fetchScheduleData(currentDate)
  },
  
  // 清除错误
  clearError: () => {
    set({ error: null })
  }
})) 