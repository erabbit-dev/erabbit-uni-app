# uni-app 基础

## 创建 uni-app 项目方式

**uni-app 支持两种方式创建项目：**

1. 通过 HBuilderX 创建

2. 通过命令行创建

其中，方式 1 需安装 HBuilderX 编辑器，方式 2 需安装 Node.js 环境。

## HBuilderX 创建 uni-app 项目

### 创建步骤

**1.下载安装 HbuilderX 编辑器**

![下载安装 HbuilderX 编辑器](./assets/uniapp_picture_1.png)

**2.通过 HbuilderX 创建 uni-app vue3 项目**

![通过 HbuilderX 创建 uni-app vue3 项目](./assets/uniapp_picture_2.png)

**3.安装 uni-app vue3 编译器插件**

![安装 uni-app vue3 编译器插件](./assets/uniapp_picture_3.png)

**4.编译成微信小程序端代码**

![编译成微信小程序端代码](./assets/uniapp_picture_4.png)

**5.开启服务端口**

![开启服务端口](./assets/uniapp_picture_5.png)

**小技巧分享：模拟器窗口分离和置顶**

![模拟器窗口分离和置顶](./assets/uniapp_picture_6.png)

**Hbuildex 和 微信开发者工具 关系**

![Hbuildex 和 微信开发者工具 关系](./assets/uniapp_picture_7.png)

温馨提示：**Hbuildex** 和 **uni-app** 都属于 [DCloud](https://dcloud.io) 公司的产品。

## pages.json 和 tabBar 案例

### 目录结构

我们先来认识 uni-app 项目的目录结构。

```sh
├─pages            业务页面文件存放的目录
│  └─index
│     └─index.vue  index页面
├─static           存放应用引用的本地静态资源的目录(注意：静态资源只能存放于此)
├─unpackage        非工程代码，一般存放运行或发行的编译结果
├─index.html       H5端页面
├─main.js          Vue初始化入口文件
├─App.vue          配置App全局样式、监听应用生命周期
├─pages.json       **配置页面路由、导航栏、tabBar等页面类信息**
├─manifest.json    **配置appid**、应用名称、logo、版本等打包信息
└─uni.scss         uni-app内置的常用样式变量
```

### 解读 pages.json

用于配置页面路由、导航栏、tabBar 等页面类信息

### 案例练习

**效果预览**
![案例练习](./assets/uniapp_case_1.png)

**参考代码**

```json
{
  // 页面路由
  "pages": [
    {
      "path": "pages/index/index",
      // 页面样式配置
      "style": {
        "navigationBarTitleText": "首页"
      }
    },
    {
      "path": "pages/my/my",
      "style": {
        "navigationBarTitleText": "我的"
      }
    }
  ],
  // 全局样式配置
  "globalStyle": {
    "navigationBarTextStyle": "white",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#27BA9B",
    "backgroundColor": "#F8F8F8"
  },
  // tabBar 配置
  "tabBar": {
    "selectedColor": "#27BA9B",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "static/tabs/home_default.png",
        "selectedIconPath": "static/tabs/home_selected.png"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的",
        "iconPath": "static/tabs/user_default.png",
        "selectedIconPath": "static/tabs/user_selected.png"
      }
    ]
  }
}
```

## uni-app 和原生小程序开发区别

### 主要区别

uni-app 项目每个页面是一个 `.vue` 文件，数据绑定及事件处理同 `Vue.js` 规范：

1. 属性绑定 `src="{ { url }}"` 升级成 `:src="url"`

2. 事件绑定 `bindtap="eventName"` 升级成 `@tap="eventName"`，**支持（）传参**

3. 支持 Vue 常用**指令** `v-for`、`v-if`、`v-show`、`v-model` 等

### 其他区别补充

1. 调用接口能力，**建议前缀** `wx` 替换为 `uni` ，养成好习惯，支持多端开发。
2. `<style>` 页面样式不需要写 `scoped`，小程序是多页面应用，不同页面的样式自带隔离。
3. **生命周期分三部分**：应用生命周期(小程序)，页面生命周期(小程序)，组件生命周期(Vue)

### 案例练习

**主要功能**

1.  滑动轮播图
2.  点击大图预览

**效果预览**
![案例练习](./assets/uniapp_case_2.png)

**参考代码**

```vue
<template>
  <swiper class="banner" indicator-dots circular :autoplay="false">
    <swiper-item v-for="item in pictures" :key="item.id">
      <image @tap="onPreviewImage(item.url)" :src="item.url"></image>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      pictures: [
        {
          id: '1',
          url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_1.jpg',
        },
        {
          id: '2',
          url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_2.jpg',
        },
        {
          id: '3',
          url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_3.jpg',
        },
        {
          id: '4',
          url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_4.jpg',
        },
        {
          id: '5',
          url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_5.jpg',
        },
      ],
    }
  },
  methods: {
    onPreviewImage(url) {
      // 大图预览
      uni.previewImage({
        urls: this.pictures.map((v) => v.url),
        current: url,
      })
    },
  },
}
</script>

<style>
.banner,
.banner image {
  width: 750rpx;
  height: 750rpx;
}
</style>
```

## 命令行创建 uni-app 项目

**优势**

通过命令行创建 uni-app 项目，**不必依赖 HBuilderX**，TypeScript 类型支持友好。

**命令行创建** **uni-app** **项目：**

vue3 + ts 版

```sh
# 通过 npx 从 github 下载
npx degit dcloudio/uni-preset-vue#vite-ts 项目名称

# 通过 git 克隆下载 (备用)
git clone -b vite-ts https://gitee.com/dcloud/uni-preset-vue.git
```

创建其他版本可查看：[uni-app 官网](https://uniapp.dcloud.net.cn/quickstart-cli.html)

### 编译和运行 uni-app 项目

1. 安装依赖 `pnpm install`
2. 编译成微信小程序 `pnpm dev:mp-weixin`
3. 导入微信开发者工具

温馨提示:

- 在 `manifest.json` 文件添加小程序 `appid` 方便真机预览
- `npx` 命令需依赖 Node.js 环境，[Node.js 下载地址](https://nodejs.org/zh-cn)
- `npx` 命令下载失败，请尝试换成手机热点后重试

## 用 VS Code 开发 uni-app 项目

### 为什么选择 VS Code？

- VS Code 对 **TS 类型支持友好**，前端开发者**主流的编辑器**
- HbuilderX 对 TS 类型支持暂不完善，期待官方完善 👀

### 用 VS Code 开发配置

- 前置工作：安装 Vue3 插件，[点击查看官方文档](https://cn.vuejs.org/guide/typescript/overview.html#ide-support)
  - 安装 **Vue Language Features (Volar)** ：Vue3 语法提示插件
  - 安装 **TypeScript Vue Plugin (Volar)** ：Vue3+TS 插件
  - **工作区禁用** Vue2 的 Vetur 插件(Vue3 插件和 Vue2 冲突)
  - **工作区禁用** @builtin typescript 插件（禁用后开启 Vue3 的 TS 托管模式）
- 安装 uni-app 开发插件
  - **uni-create-view** ：快速创建 uni-app 页面
  - **uni-helper uni-app** ：代码提示
  - **uniapp 小程序扩展** ：鼠标悬停查文档
- TS 类型校验
  - 安装 **类型声明文件** `pnpm i -D miniprogram-api-typings @uni-helper/uni-app-types`
  - 配置 `tsconfig.json`
- JSON 注释问题
  - 设置文件关联，把 `manifest.json` 和 `pages.json` 设置为 `jsonc`

`tsconfig.json` 参考

```json {11,12,14-17}
// tsconfig.json
{
  "extends": "@vue/tsconfig/tsconfig.json",
  "compilerOptions": {
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "lib": ["esnext", "dom"],
    // 添加类型声明文件，"miniprogram-api-typings", "@uni-helper/uni-app-types"
    "types": ["@dcloudio/types", "miniprogram-api-typings", "@uni-helper/uni-app-types"]
  },
  // vue 编译器类型，校验标签类型
  "vueCompilerOptions": {
    "nativeTags": ["block", "component", "template", "slot"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

**工作区设置参考**

```json
// .vscode/settings.json
{
  // 在保存时格式化文件
  "editor.formatOnSave": true,
  // 文件格式化配置
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 配置语言的文件关联
  "files.associations": {
    "pages.json": "jsonc", // pages.json 可以写注释
    "manifest.json": "jsonc" // manifest.json 可以写注释
  }
}
```

**温馨提示**

- 原依赖 `@types/wechat-miniprogram` 现升级为 `miniprogram-api-typings`。
- 原配置 `experimentalRuntimeMode` 现升级为 `nativeTags`。
- 这一步处理很关键，否则无法校验组件属性类型。

## 开发工具回顾

选择自己习惯的编辑器开发 uni-app 项目即可。

**HbuilderX 和 微信开发者工具 关系**
![HbuilderX 和 微信开发者工具 关系](./assets/uniapp_picture_7.png)

**VS Code 和 微信开发者工具 关系**
![VS Code 和 微信开发者工具 关系](./assets/uniapp_picture_8.png)

## 用 VS Code 开发课后练习

使用 `VS Code` 编辑器写代码，实现 tabBar 案例 + 轮播图案例。

::: tip 温馨提示

`VS Code` 可通过快捷键 `Ctrl + i` 唤起代码提示。

:::
