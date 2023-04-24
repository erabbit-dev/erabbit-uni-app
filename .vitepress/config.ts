import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
  ],
  themeConfig: {
    logo: '/public/logo.png',
    siteTitle: 'uni-app小程序',
    returnToTopLabel: '返回顶部',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'uni-app基础', link: '/uni-app/' },
      { text: '小兔鲜儿项目', link: '/rabbit-shop/' },
    ],

    sidebar: {
      '/uni-app/': [{ text: 'uni-app基础', link: '/uni-app/' }],
      '/rabbit-shop/': [
        {
          text: '小兔鲜儿项目',
          items: [{ text: '项目首页', link: '/rabbit-shop/' }],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://gitee.com/Megasu/heima-shop-vue3-ts-uniapp' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023 黑马程序员',
    },
  },
})
