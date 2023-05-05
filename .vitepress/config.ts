import { defineConfig } from 'vitepress'
import mdItCustomAttrs from 'markdown-it-custom-attrs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    lineNumbers: true,
    config: (md) => {
      // use more markdown-it plugins!
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': 'gallery',
      })
    },
  },
  lang: 'zh-CN',
  title: '小兔鲜儿小程序',
  titleTemplate: 'uniapp+vue3+ts',
  description: '小兔鲜儿小程序项目, vue3+ts+小程序项目实战',
  base: '/uni-app-shop-note/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: './favicon.ico',
      },
    ],
    // use more markdown-it plugins!
    [
      'link',
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css' },
    ],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js' }],
  ],
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.png',
    siteTitle: '小兔鲜儿-小程序',
    returnToTopLabel: '返回顶部',
    outline: {
      label: '目录',
      level: 'deep',
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    footer: {
      message: '根据 MIT 许可证发布',
      copyright: `Copyright © 2022-${new Date().getFullYear()} 黑马程序员`,
    },
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: 'https://gitee.com/Megasu/uni-app-shop-note/edit/master/:path',
      text: '在 Gitee 上编辑此页面',
    },
    lastUpdatedText: '最近更新',
    nav: [
      { text: 'uni-app', link: '/uni-app/' },
      { text: '小兔鲜儿项目', link: '/rabbit-shop/' },
      {
        text: '接口文档',
        link: 'https://apifox.com/apidoc/shared-0e6ee326-d646-41bd-9214-29dbf47648fa/doc-1521513',
      },
    ],

    sidebar: {
      '/uni-app/': [
        {
          text: 'uni-app',
          items: [
            { text: 'uni-app 核心', link: '/uni-app/' },
            { text: '小兔鲜儿项目', link: '/rabbit-shop/' },
          ],
        },
      ],
      '/rabbit-shop/': [
        {
          text: '小兔鲜儿项目',
          items: [
            { text: '1.项目起步', link: '/rabbit-shop/' },
            { text: '2.首页模块', link: '/rabbit-shop/home' },
            { text: '3.推荐模块', link: '/rabbit-shop/hot' },
            { text: '4.分类模块', link: '/rabbit-shop/category' },
            { text: '5.详情模块', link: '/rabbit-shop/goods' },
            { text: '6.登录模块', link: '/rabbit-shop/login' },
            { text: '7.用户模块', link: '/rabbit-shop/member' },
            { text: '8.地址模块', link: '/rabbit-shop/address' },
            { text: '9.SKU模块', link: '/rabbit-shop/sku' },
            { text: '10.购物车模块', link: '/rabbit-shop/cart' },
            { text: '11.订单模块', link: '/rabbit-shop/order' },
            { text: '12.项目打包', link: '/rabbit-shop/build' },
            { text: '13.解决方案', link: '/rabbit-shop/solution' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://gitee.com/Megasu/heima-shop-vue3-ts-uniapp' }],
  },
})
