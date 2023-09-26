import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import type { MarkdownRenderer } from 'vitepress'

// md 添加自定义属性
function MdCustomAttrPugin(md: MarkdownRenderer, type: string, mdOptions: object) {
  const defaultRenderer = md.renderer.rules[type]

  if (defaultRenderer) {
    md.renderer.rules[type] = (tokens, idx, options, env, self) => {
      const token = tokens[idx]
      if (mdOptions) {
        for (let i in mdOptions) {
          token.attrSet(i, mdOptions[i])
        }
      }
      return defaultRenderer(tokens, idx, options, env, self)
    }
  }
}

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    markdown: {
      // 显示行号
      lineNumbers: true,
      // 使用主题
      theme: 'material-theme-palenight',
      // md 配置
      config: (md) => {
        // 大图预览插件配置
        md.use(MdCustomAttrPugin, 'image', { 'data-fancybox': 'gallery' })
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
          href: '/uni-app-shop-note/favicon.ico',
        },
      ],
      // 大图预览插件资源
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
      search: {
        provider: 'local',
        options: {
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              displayDetails: '展开详情',
              noResultsText: '无法找到相关结果',
              resetButtonTitle: '清除查询条件',

              footer: {
                selectText: '选择',
                navigateText: '切换',
              },
            },
          },
        },
      },
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
        text: '帮我修改',
      },
      lastUpdatedText: '最近更新',
      nav: [
        { text: 'uni-app 基础', link: '/uni-app/' },
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
              { text: 'uni-app 基础', link: '/uni-app/' },
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

      socialLinks: [
        {
          icon: 'youtube',
          link: 'https://www.bilibili.com/video/BV1Bp4y1379L/?share_source=copy_web&vd_source=2ac50d29193927b3c8597537dc4bc81d',
        },
        { icon: 'github', link: 'https://github.com/erabbit-dev/erabbit-uni-app/' },
        { icon: 'github', link: 'https://gitee.com/Megasu/uniapp-shop-vue3-ts/' },
      ],
    },
    // pwa 配置
    pwa: {
      outDir: '.vitepress/dist', // 输出目录
      registerType: 'autoUpdate', // 注册类型为自动更新
      manifest: {
        id: 'uni-app-shop-note', // 清单 ID
        name: 'uni-app-itheima', // 应用名称
        short_name: 'uni-app-shop', // 应用的短名称
        description: 'uni-app-shop-note by itheima', // 应用的描述
        theme_color: '#ffffff', // 主题颜色
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/uni-app-shop-note/logo-192x192.png', // 图标路径
            sizes: '192x192', // 图标尺寸
            type: 'image/png', // 图标类型
          },
          {
            src: '/uni-app-shop-note/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'], // 匹配需要缓存的文件类型
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, // 匹配需要缓存的 jsdelivr 资源
            handler: 'NetworkFirst', // 网络优先策略
            options: {
              cacheName: 'jsdelivr-cache', // 缓存名称
              expiration: {
                maxEntries: 10, // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24 * 7, // 缓存有效期，7天
              },
              cacheableResponse: {
                statuses: [0, 200], // 缓存的响应状态码
              },
            },
          },
        ],
      },
    },
  }),
)
