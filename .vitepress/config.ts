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
  title: 'uni-app-小兔鲜儿',
  titleTemplate: 'vue3+ts',
  description: '小兔鲜儿小程序项目, vue3+ts+小程序项目实战',
  base: '/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    // use more markdown-it plugins!
    [
      'link',
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css' },
    ],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js' }],
  ],
  themeConfig: {
    logo: '/public/logo.png',
    siteTitle: 'uni-app小程序',
    returnToTopLabel: '返回顶部',
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '帮我改正',
    },
    nav: [
      { text: 'uni-app', link: '/uni-app/' },
      { text: '小兔鲜儿项目', link: '/rabbit-shop/' },
    ],

    sidebar: {
      '/uni-app/': [{ text: 'uni-app 核心', link: '/uni-app/' }],
      '/rabbit-shop/': [
        {
          text: '小兔鲜儿项目',
          items: [
            { text: '1.项目起步', link: '/rabbit-shop/' },
            { text: '2.首页模块', link: '/rabbit-shop/home' },
            { text: '3.推荐模块', link: '/rabbit-shop/#3' },
            { text: '4.分类模块', link: '/rabbit-shop/#4' },
            { text: '5.详情模块', link: '/rabbit-shop/#5' },
            { text: '6.登录模块', link: '/rabbit-shop/#6' },
            { text: '7.地址模块', link: '/rabbit-shop/#7' },
            { text: '8.SKU模块', link: '/rabbit-shop/#8' },
            { text: '9.购物车模块', link: '/rabbit-shop/#9' },
            { text: '10.订单模块', link: '/rabbit-shop/#10' },
            { text: '11.项目打包', link: '/rabbit-shop/#11' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://gitee.com/Megasu/heima-shop-vue3-ts-uniapp' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present 黑马程序员',
    },
  },
})
