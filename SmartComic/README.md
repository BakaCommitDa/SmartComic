# react  追漫 APP

## 技术栈
- React全家桶
   React 组件开发
   组件的封装
   第三方组件库
   受控和受控组件
   hooks编程  自定义hooks 
   React-Router-DOM
        SPA
        路由守卫
        懒加载
   Zustand
- mock 接口模拟
- axios 请求拦截和代理
- jwt 登录 
- module css
- vite 配置

## 项目的架构
- components
- pages
- store
- hooks
- api
- mock src外 分离

## 开发前的准备
- 安装的包
    react-router-dom  zustand axios
    react-vant(UI组件库) lib-flexible(移动端适配库)  mockjs(生成随机数据并模拟 Ajax 请求响应的JavaScript库)  vite-plugin-mock(vite-plugin-mock)      
    (pnpm i react-router-dom zustand axios react-vant lib-flexible @react-vant/icons mockjs vite-plugin-mock )
    开发期间的依赖(加-D 开发期间使用)
    vite-plugin-mock  jwt 
    (pnpm i -D vite-plugin-mock jwt)

## 项目亮点
- 移动端适配：使用lib-flexible + postcss-pxtorem实现响应式布局
- 图片懒加载：IntersectionObserver API实现图片按需加载
- 状态管理：Zustand轻量级状态管理，支持异步操作
- 组件封装：可复用的Loading、ErrorMessage、LazyImage等组件
- 路由优化：React.lazy + Suspense实现代码分割和懒加载
- 性能优化：React.memo、useCallback、useMemo实现组件和函数缓存
- 搜索框设计：胶囊形状搜索框，支持垂直居中和响应式适配
- 数据集成：Home页面集成排行榜和排期表数据，实现数据复用

## 功能模块
- UI组件库
    - react-vant  第三方组件库  70%的组件已经有了，不用写
    - 选择一个适合业务都UI组件库 或者公司内部的组件库
- 配置路由及懒加载
    - 懒加载
    - 路由守卫
    - Layout 组件
        - 嵌套路由由Outle 分路由配置
        - 网页有几个模板 Layout
             - Route 不加path 对应的路由自动选择
             - tabbar 模板
             - blank 模板
    - tabbar
        - react-vant + @react-vant/icons
        - value + onChange 响应式
        - 直接点击连接分享 active 的设置
- Home页面功能
    - 胶囊形状搜索框，支持垂直居中和响应式适配
    - 轮播图Banner组件，支持自动播放和手动切换
    - 标签切换功能，支持热门、排期、排行榜三个标签
    - 数据集成：复用排行榜和排期表数据，实现数据共享
    - 性能优化：使用React.memo、useCallback、useMemo缓存机制

## 项目的亮点和难点
- 亮点：
  - 完整的移动端适配方案
  - 模块化CSS设计
  - 组件化开发，高复用性
  - 状态管理清晰，数据流可控
  - 性能优化：React.memo、useCallback、useMemo缓存机制
  - 搜索框设计：胶囊形状，垂直居中，响应式适配
  - 数据集成：Home页面复用排行榜和排期表数据
- 难点：
  - 图片懒加载的性能优化
  - 移动端不同屏幕尺寸的适配
  - 组件间状态同步和更新
  - React Vant组件样式覆盖和自定义
  - 搜索框垂直居中和响应式高度调整

## 项目遇到过什么问题，怎么解决的
- 自定义Hooks
    - useTitle
    一定要设置

- 项目迭代
    - 功能由浅入深
    - chatbot deepseek 简单chat
    - deepseek-r1 推理模型
    - 流式输出
    - 上下文 LRU
    - coze 工作流接口调用

- 排行榜页面数据切换问题
  - 问题：标签切换时数据不更新
  - 解决：修复useMemo依赖项，直接依赖activeTab而不是getCurrentRankings函数

- 图片加载失败处理
  - 问题：placeholder图片无法正常加载
  - 解决：替换为picsum.photos随机图片，添加友好的错误占位符

- Home页面搜索框样式问题
  - 问题：React Vant Search组件样式难以覆盖，移动端高度调整不生效
  - 解决：使用多重样式覆盖（CSS !important + 内联样式），添加display:flex和align-items:center实现垂直居中

- 搜索框胶囊形状实现
  - 问题：搜索框圆角不够明显，无法呈现真正的胶囊形状
  - 解决：使用border-radius: 100px，远大于高度值，确保左右两端呈现明显的半圆形

- 移动端搜索框高度调整
  - 问题：移动端搜索框高度调整后没有明显变化
  - 解决：通过CSS强制覆盖 + React内联样式双重保障，确保高度设置生效

## 通用组件开发
- Loading
    - 居中方案
        position:fixed + tlrb0 + margin:auto
   - React.memo  无状态的组件，不重新渲染
   - animation

- LazyImage
  - IntersectionObserver实现懒加载
  - 加载状态、错误状态处理
  - 占位符和fallback图标

- TabSelector
  - 标签切换组件
  - 激活状态样式管理
  - 响应式设计适配

- ScheduleCard
  - 排期表卡片组件
  - React.memo性能优化
  - LazyImage图片懒加载
  - 响应式布局适配

- RankingCard
  - 排行榜卡片组件
  - React.memo性能优化
  - 评分显示和标签展示
  - LazyImage图片懒加载