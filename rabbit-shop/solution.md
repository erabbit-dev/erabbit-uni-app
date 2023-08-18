# 小程序面试问答(解决方案)

## 问：uni-app 组件库的解决方案？（xx 分钟）

### 必答

（总）我们项目使用的是 `uni-ui` 组件库，这是官方出品的组件库，有官方的技术支持和持续维护并且 uni-ui 组件库比较相对精简，组件自动按需导入，有利于减小项目体积。

（分）两个核心步骤是：

1. 安装 `@dcloudio/uni-ui`(组件库) 和 `scss`。
2. 在 `pages.json` 文件中配置 `easycom` 规则，实现 `uni-ui` 组件的自动导入和注册。

### 加分

虽然 `uni-ui`官方并没有类型声明文件，但我们在项目中还配置了 `uni-ui` 的 `TS` 组件类型支持，可以校验组件的属性，类型更安全，书写时也有代码提示。

实现类型支持其实也就多了两个步骤：

1. 安装 `@uni-helper/uni-ui-type` 第三方类型声明文件。
2. 再配置 `tsconfig.json`，将类型声明文件添加到 `types` 数组就可以了。

### 深入

::: tip

准备充分的同学，可以自己**融入加分回答中**，或者**引导面试官往自己准备的方向提问**。

:::

其实 `uni-app` 和 `uni-ui` 目前还没有 TS 官方支持，所以默认情况下组件是没有类型校验的，如果自己手写组件类型声明**效率太低了**。基于这个问题，我们团队做过一些充分的调研，`uni-helper` 虽然是非官方组织，但这个第三方组织是 uni-app 生态类型声明文件做的非常好，更新频率也非常及时。其实在我们开发的过程中遇到些[小问题](https://github.com/uni-helper/uni-ui-types/issues?q=is%3Aissue+is%3Aclosed)，我们在 [github](https://github.com/uni-helper/uni-ui-types) 仓库提的 [issue](https://github.com/uni-helper/uni-ui-types/issues?q=is%3Aissue+is%3Aclosed) 也有及时解决。最后，我们也保持关注官方文档和更新，确保项目的稳定性和兼容性。

### 再深入

- ❓ 问: 为什么项目中使用 `uni-ui` 而不选择 `uview-ui`。

- 🙋‍♂️ 答: 我们团队主要是考虑以下三点做出的选择：

  1. `uni-ui` 是官方出品的组件库，**有官方的技术支持和持续维护**(最重要)。
  2. `uni-ui` 比较相对精简，有利于减小项目体积。
  3. `uview-ui` 暂不支持 `Vue3` 开发，稍微落后。

当然 `uview-ui` 组件库也不错，是目前 `uni-app` 插件市场下载量最高的第三方 Vue2 组件库，社区中也有热心的小伙伴为 `uview-ui` 做了 Vue3 版，但目前可能作者太忙了，处于没更新状态，不稳定，所以综合考虑，我们选择官方维护的 `uni-ui`。

### 参考链接

- [uni-ui 组件库](https://uniapp.dcloud.net.cn/component/uniui/quickstart.html)
- [uview-ui 组件库](https://www.uviewui.com/)
- [vk-uview-ui 组件库-不更新](https://gitee.com/vk-uni/vk-uview-ui)
- [uni-helper 组织](https://github.com/uni-helper)
- [uni-ui-types 类型声明](https://github.com/uni-helper/uni-ui-types)
- [uni-helper 组织的 VS Code 插件-下载量 14k](https://marketplace.visualstudio.com/items?itemName=uni-helper.uni-app-snippets-vscode)
- [uView，有计划支持 vue3.0 吗？](https://github.com/umicro/uView2.0/issues/700)

::: tip 类似问题

- 如何在 uni-app 中引入和使用第三方组件库？
- 请介绍几个常用的 uni-app 组件库，以及它们的特点和使用场景？
- 组件库的 TS 类型怎么处理？

:::

## 问：在 uni-app 中，如何进行全局状态管理？请介绍一下你对 Vuex 和 Pinia 的了解。

### 必答

（总）我们项目使用的是 Pinia 进行全局状态管理，Vuex 或 Pinia 都是官方提供的状态管理库。

（分）我先说一下我对 VueX 的了解：
Vuex 采用单一状态树的概念，将全局状态集中管理，方便追踪状态变化。Vuex 主要包含以下几个核心概念：

- State：用于存储全局状态。
- Getter：用于从 State 中派生出一些状态，例如计算属性。
- Mutation：用于同步修改 State，严格遵循单向数据流。
- Action：用于异步操作，可以包含异步 API 请求、异步提交 Mutation 等。

我对 Pinia 的了解是 Pinia 可以理解为就是 [Vuex5](https://pinia.vuejs.org/zh/introduction.html#comparison-with-vuex)，是一个**轻量级的、兼容 Vue 3 和 Vue 2 的状态管理库**。Pinia 和 VueX 主要区别是**废弃了**经常被认为是**极其冗余的 mutation**，Pinia 主要包含以下几个核心概念：

- Store：用于存储全局状态和处理状态变化的方法，类似于 Vuex 的 State、Getter 和 Action 的集合。
- 可以创建和使用多个 Store 实例，每个 Store 都有自己独立的状态和方法。

（总）所以我们项目最终选择的是 Pinia 进行全局状态管理。

### 加分

（总）其实我们的项目还配置了 pinia 的持久化存储方案。

（分）我们用到了 [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate) 插件实现持久化，周下载量 [61k](https://www.npmjs.com/package/pinia-plugin-persistedstate)，但是这个插件默认使用 [localStorage](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html#storage) 实现持久化，小程序端不兼容，所以必须修改一下配置，替换为 `uni-app` 支持多端的持久化 API，也就是 `uni.setStorageSync()` 和 `uni.getStorageSync()`。

（总）持久化存储配置完成后，就会自动将用户数据保存在客户端，即使用户关闭了小程序，数据依然可以保留。

配置参考

```ts {7-20}
// stores/modules/member.ts
export const useMemberStore = defineStore(
  'member',
  () => {
    //…省略
  },
  {
    // 配置持久化
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value) // [!code warning]
        },
        getItem(key) {
          return uni.getStorageSync(key) // [!code warning]
        },
      },
    },
  },
)
```

### 参考链接

- [Vuex 官方文档](https://vuex.vuejs.org/zh/)
- [Pinia 官方文档](https://pinia.vuejs.org/zh/introduction.html)
- [Pinia 对比 Vuex 3.x/4.x 官方说明](https://pinia.vuejs.org/zh/introduction.html#comparison-with-vuex-3-x-4-x)
- [pinia-plugin-persistedstate 插件的 storage 配置](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html#storage)

::: tip 类似问题

- 在 uni-app 中如何实现全局状态管理？
- 在 uni-app 中如何实现持久化存储？

:::

## 问：uni-app 中的组件和 Vue.js 中的组件有什么区别？

### 必答

（总）uni-app 是基于 Vue.js 构建的跨平台开发框架，因此 **uni-app 中的组件与 Vue.js 中的组件在很多方面是相似的**。然而，由于 uni-app 需要支持多个平台，包括微信小程序、App 端和 H5 端，所以在某些方面会有一些差异。

（分）**根据自身理解，选其中几点回答即可：**

以下是 uni-app 中的组件与 Vue.js 中的组件的一些主要区别：

1. 跨平台：Vue.js 主要用于开发网页应用，而 uni-app 可以让你用同一套代码开发微信小程序、App、H5 等多个平台的应用。

2. 基础组件：uni-app 提供了一套与 Vue.js 不同的基础组件。这些组件是为了适应不同平台的 UI 要求而设计的，它们在微信小程序、App 端和 H5 端上有统一的表现。在使用这些组件时，需要注意它们在不同平台之间的差异，封装自定义组件的时候更推荐 `<view>`、`<text>` 等基础组件，而非 `<div>`、`<span>`。

3. 生命周期：虽然 uni-app 和 Vue.js 的组件都有生命周期钩子，但是 uni-app 为了适应不同平台而引入了一些额外的生命周期钩子，例如 **`onLaunch`**、**`onShow`** 和 **`onHide`**。

4. 样式差异：某些 CSS 选择器不受支持如 `*` 通配符选择器。此外，uni-app 支持一种叫做 **`rpx`** 的相对单位，它可以自动适应不同屏幕尺寸。

5. 条件编译：由于 uni-app 支持多个平台，所以提供了条件编译功能。开发者可以通过条件编译在特定平台上使用平台特有的 API 或组件，从而实现平台相关的功能。

（总）总的来说，uni-app 和 Vue.js 的组件在很多方面是相似的，但是由于 uni-app 需要支持多个平台，所以在一些细节上会有所区别，平时开发时要注意平台相关的组件、生命周期、样式的差异。

### 加分

可以展开 uni-app 生命周期，分为三部分：

- 应用生命周期：与 **小程序** 应用的生命周期一致（onLaunch、onShow、onHide 等）
- 页面生命周期：与 **小程序** 页面的生命周期一致（onLoad、onUnload、onShow 等）
- 组件生命周期：与 **Vue.js** 组件的生命周期一致（mounted、created 等）

我们的购物车页面需要借助 **onShow** 生命周期钩子获取最新的购物车列表数据，因为在商品详情页中进行添加购物车操作。添加成功后，打开购物车页面应展示最新的购物车数据。因此，每次 **购物车页面 onShow** 时，都应获取最新的购物车列表数据。收货地址列表页同理。

### 深入

（总）小程序是一个独立的应用平台，有自己的一套生命周期，如 onLaunch、onShow、onHide，在 uni-app 项目还支持 Vue 的生命周期钩子。

（分）

- `onLaunch` 生命周期钩子在 App.vue 根组件中就类似 `created` 或 `mounted` 钩子。

- `Vue.js` 本身并没有提供 `onShow` 和 `onHide` 生命周期钩子，但是可以通过监听页面的 `visibilitychange` 事件来模拟实现这两个钩子。从而在一定程度上模拟 onShow 和 onHide 的行为。

（总）我们的 uni-app 项目主要是做小程序端，所以我们的**页面组件优先使用小程序的生命周期钩子**，也就是 onShow、onHide 这些，普通组件就用 Vue 生命周期钩子。

**参考代码**

```ts
mounted() {
  document.addEventListener('visibilitychange', this.handleVisibilityChange);
},
beforeDestroy() {
  document.removeEventListener('visibilitychange', this.handleVisibilityChange);
},
methods: {
  handleVisibilityChange() {
    if (document.hidden) {
      this.onHide();
    } else {
      this.onShow();
    }
  },
  onShow() {
    console.log('页面显示');
  },
  onHide() {
    console.log('页面隐藏');
  }
}
```

这样，当页面变为隐藏状态时，**onHide** 方法会被调用；当页面重新显示时，**onShow** 方法会被调用。

注意，在组件销毁时，要记得移除 **visibilitychange** 事件监听，以避免内存泄漏。

### 参考链接

- [uni-app 应用生命周期](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)
- [uni-app 页面生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)
- [uni-app 组件生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#componentlifecycle)
- [WebAPI - visibilitychange 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilitychange_event)

::: tip 类似问题

- uni-app 与 Vue 区别？
- 在 uni-app 中实现自定义组件，有什么区别吗？
- 在 uni-app 中如何处理 CSS 样式的差异？
- 请介绍 uni-app 的生命周期函数，以及它们在不同平台下的差异。
- 谈谈 uni-app 组件的生命周期，以及它们与 Vue.js 组件生命周期的异同。
- 如何实现 uni-app 中的跨平台开发？请谈谈 uni-app 的条件编译。

:::

## 问：请介绍一下 uni-app 的网络请求库 uni.request 与 axios 相比，它有哪些优缺点？

### 必答

（总）uni-app 的 `uni.request` 是一个用于发起网络请求的 API。它是 uni-app 框架内置的网络请求库，兼容多端（包括小程序、App、H5 等），无需额外安装。使用 `uni.request` 可以发起 GET、POST、PUT、DELETE 等 HTTP 请求。

（分）与 axios 相比，`uni.request` 的优缺点如下：

优点：

1. 内置于 uni-app 框架，不需要额外安装和引入第三方库。
2. 兼容多端，可以方便地在不同平台上使用。

缺点：

1. 功能相对于 axios 较为简单，缺少一些高级功能，例如拦截器需要自己实现。
2. 错误处理不如 axios 完善。axios 可以轻松区分网络错误和业务错误，而在 `uni.request` 中需要手动判断状态码。

（总）其实在我们的项目中也借鉴 axios 的思想，基于 `uni.request` 封装了自己的网络请求库，可以用于处理常见的请求场景。

### 加分

（总）我们自己实现了一个基于 uni-app 的网络请求库。通过添加拦截器，实现了对请求前处理和请求后的处理，提高了代码的复用性。

（分）具体来说，代码实现了以下功能：

1. 添加拦截器：拦截 `request` 请求和 `uploadFile` 文件上传。
2. 非 `http` 开头的请求 URL 自动拼接基础地址 `baseURL`。
3. 如果存在 token，则将其添加到请求头 `Authorization`。
4. 封装了一个 `http` 函数，该函数返回一个 Promise 对象，支持泛型，方便处理返回数据的类型。
5. 当请求成功时（状态码为 2xx），执行 `resolve()` 表示成功，并提取核心数据`res.data`。
6. 当请求失败时：
   - 如果状态码为 401，则清除用户信息并跳转到登录页面。
   - 如果是其他错误，则根据后端错误信息进行提示。
   - 如果是网络错误，则提示用户更换网络。

（总）我们借鉴 axios 的思想，基于 `uni.request` 封装了自己的网络请求库，可以用于处理常见的请求场景。

**参考代码**

```ts
import { useMemberStore } from '@/stores'

// 服务器基地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2. 请求超时, 默认 60s
    options.timeout = 10000
    // 3. 添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 4. 添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

// 添加拦截器
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

type Data<T> = {
  code: string
  msg: string
  result: T
}
// 2.2 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success(res) {
        // 状态码 2xx， axios 就是这样设计的
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}
```

### 参考链接

[uni.request 网络请求](https://uniapp.dcloud.net.cn/api/request/request.html)

[uni.uploadFile 上传文件](https://uniapp.dcloud.net.cn/api/request/network-file.html)

[uni.addInterceptor 拦截器](https://uniapp.dcloud.net.cn/api/interceptor.html)

[拓展阅读 - uni 拦截器其他用法](https://juejin.cn/post/6844904104427257870)

## 问：为什么用 VSCode 开发 uni-app 项目而不使用 Hbuilder？

### 必答

（总）其实 Hbuilder 我也有使用，不过最终体验下来还是选择了 `VS Code` 。

（分）我主要是有 2 个出发点考虑：

1. 熟悉度：VSCode 是我最熟悉并习惯使用的代码编辑器，常用的代码片段，快捷键，可以我的开发效率。
2. 插件生态：我针对 uni-app 项目安装了对应的插件，代码提示，快速新建页面并注册路由，鼠标悬停查文档，这些功能我都在 VSCode 找到对应的插件，非常好用。

（总）其实还是我自己不想换开发工具，也不是刻意去比较两者谁好谁坏，哪一个编辑器自己用起来更习惯，能提高效率就用哪个。

温馨提示：Hbuilder 编辑器对 TS 的类型支持还不够完善，就好比 image 组件的 mode 取值写错了，之前用 Hbuilder 的时候校验不出来，而 VSCode 可以校验出错误，期待 Hbuilder 的进步。（如果面试官特别喜欢用 Hbuilder 就不建议提这个，尊重每个人的喜好）

### 加分

如果面试官对 VS Code 的配置感兴趣，可以继续展开如何配置：

（总）用 VS Code 开发 uni-app 进行 3 步配置就可以了，也可以给面试官您分享一下：

（分）

1. 安装 uni-app 插件

   - **uni-create-view** ：快速创建 uni-app 页面
   - **uni-helper** ：uni-app 代码提示
   - **uniapp 小程序扩展** ：鼠标悬停查文档

2. JSON 注释报错问题，设置文件关联即可，把 `manifest.json` 和 `pages.json` 设置为 `jsonc`

3. 针对 TS 项目增加 TS 类型校验

   - 安装类型声明文件 `pnpm i -D miniprogram-api-typings @uni-helper/uni-app-types`
   - 配置 `tsconfig.json`

（总） HBuilder 也有它的优点，针对 uni-app 开发的专属功能、内置的调试工具，如果要打包和调试 App 端还要用到 Hbuilder 工具。选择哪一个编辑器写代码取决于开发者的个人喜好和项目需求。

### 参考链接

- [uni-helper 插件](https://marketplace.visualstudio.com/items?itemName=uni-helper.uni-helper-vscode)
- [uni-create-view 插件](https://marketplace.visualstudio.com/items?itemName=mrmaoddxxaa.create-uniapp-view)
- [VSCode 开发 uni-app 教程-Vue2 版](https://juejin.cn/post/7090532271257714695)

## 问：如何在 uni-app 中实现自定义导航栏？

### 必答

我们项目的首页，订单详情页，个人信息页，等页面都用到了自定义导航栏，核心步骤如下：

1. 隐藏默认导航栏：在 `pages.json` 文件中按需设置 `navigationStyle` 为 `"custom"` 。
2. 按设计稿要求编写自定义导航栏的结构、样式和脚本。
3. 封装左上角返回按钮，通过 `getCurrentPages` 获取路由栈，如果路由栈数组长度只有 1，通过 [switchTab](https://uniapp.dcloud.net.cn/api/router#switchtab) 返回首页，其他情况应该是用 [navigateBack](https://uniapp.dcloud.net.cn/api/router#navigateback) 返回上一页。
4. 最后，还可以根据需要抽离封装成一个通用的组件，预留标题插槽等，方便复用。

如果自定义导航栏要求不高，其实也可以直接用 uni-ui 的 [uni-nav-bar](https://uniapp.dcloud.net.cn/component/uniui/uni-nav-bar.html) ，或者从 [插件市场](https://ext.dcloud.net.cn/search?q=%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AF%BC%E8%88%AA%E6%A0%8F) 中下载与项目要求接近的插件，再进行二次开发适配自己的项目。

### 加分

我们项目中的自定义导航栏其实还做了安全区的样式适配，通过 `uni.getSystemInfoSync()` 获取顶部到安全区的距离，在模板中绑定行内样式，**避免刘海屏或前置摄像头遮挡**导航栏标题或 logo 等重要内容。

如果左侧按钮要对齐右侧的胶囊，还可以通过 [wx.getMenuButtonBoundingClientRect](https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html) 获取胶囊信息实现对齐。

**参考代码**

```json
// src/pages.json
{
  "path": "pages/index/index",
  "style": {
    "navigationStyle": "custom" // 隐藏默认导航
  }
}
```

```vue
<!-- CustomNavbar.vue -->
<script setup lang="ts">
// 获取页面栈
const pages = getCurrentPages()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <!-- 顶部安全区占位 -->
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="wrap">
      <navigator
        v-if="pages.length > 1"
        open-type="navigateBack"
        class="back icon-left"
      ></navigator>
      <navigator v-else url="/pages/index/index" open-type="switchTab" class="back icon-home">
      </navigator>
      <view class="title">
        <!-- 插槽 -->
        <slot>导航栏标题</slot>
      </view>
    </view>
  </view>
</template>
```

### 深入

其实我们项目的订单详情页（或者某个页），给自定义导航栏加了滚动驱动动画，增强用户视觉效果：

1. `scroll-view` 滚动容器设置一个 `id`，用于绑定动画效果和滚动容器偏移量。
2. 获取当前页面实例，因为这个功能目前只有微信小程序端支持，H5 端不支持，还需要写条件编译。
3. onReady 绑定生命周期钩子中，通过 animate 设置动画配置，并通过 `id` 绑定滚动容器，设置触发偏移量等信息。

```vue
<script setup lang="ts">
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 获取页面栈
const pages = getCurrentPages()

// #ifdef MP-WEIXIN
// 获取当前页面实例，数组最后一项
const pageInstance = pages.at(-1) as any

// 页面渲染完毕，绑定动画效果
onReady(() => {
  // 动画效果,导航栏背景色
  pageInstance.animate(
    '.navbar',
    [{ backgroundColor: 'transparent' }, { backgroundColor: '#f8f8f8' }],
    1000,
    {
      scrollSource: '#scroller',
      timeRange: 1000,
      startScrollOffset: 0,
      endScrollOffset: 50,
    },
  )
})
// #endif
</script>

<template>
  <!-- 自定义导航栏: 默认透明不可见, scroll-view 滚动到 50 时展示 -->
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="wrap">
      <navigator
        v-if="pages.length > 1"
        open-type="navigateBack"
        class="back icon-left"
      ></navigator>
      <navigator v-else url="/pages/index/index" open-type="switchTab" class="back icon-home">
      </navigator>
      <view class="title">订单详情</view>
    </view>
  </view>
  <scroll-view class="viewport" scroll-y enable-back-to-top id="scroller">
    ...滚动容器
  </scroll-view>
</template>
```

### 参考链接

- [uni-nav-bar 自定义导航栏](https://uniapp.dcloud.net.cn/component/uniui/uni-nav-bar.html)
- [插件市场 自定义导航栏](https://ext.dcloud.net.cn/search?q=%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AF%BC%E8%88%AA%E6%A0%8F)
- [获取系统信息](https://uniapp.dcloud.net.cn/api/system/info.html#getsysteminfosync)
- [滚动驱动的动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html#%E6%BB%9A%E5%8A%A8%E9%A9%B1%E5%8A%A8%E7%9A%84%E5%8A%A8%E7%94%BB)

## 问：如何在 uni-app 项目中进行代码优化或性能优化？

### 必答

（总）其实代码优化和性能优化是一个持续进行的过程，我们的项目主要是做了以下的优化：

（分）**根据自身理解，选其中几点回答即可，大部分其实在项目中都有体现：**

1. 页面加载优化：
   - 按需加载：使用图片懒加载，只在需要时加载（商品图片添加 lazy-load 属性即可）。
   - 分包加载：项目模块拆分为多个包，**按需加载**对应的包，降低初始加载时间。（项目的分包，分包页面的图片等资源也可放到分包的文件夹中，减少主包资源体积）
2. 代码优化：
   - 代码分层：按功能模块化代码，提高代码可读性和可维护性（goods.ts、home.ts 等划分）。
   - 使用枚举：枚举提供了一种更有意义的命名方式，使代码更具可读性，类型也更安全 。
   - 条件编译：在处理多端的时候，按条件编译平台所需代码，减少冗余。（登录界面等）
   - 类型安全：为组件 TS 提供了静态类型检查，有助于在编译阶段发现潜在的类型错误。这可以减少运行时错误，提高代码的可靠性。(安装 uni-app-types、uni-ui-types)
3. 数据处理优化：
   - 数据获取：仅获取和处理需要的数据，避免不必要的数据处理，分页时设计合理的页容量，减少一次性渲染的节点数量。 （如：订单列表的容量为 5，因为订单信息较多，实际情况是屏幕大概能放 3 个）
   - 数据缓存：缓存获取的数据，减少不必要的数据请求（配置持久化存储）。
   - 优化数据更新：在 uni-app 中，定义在 data/ref 里面的数据每次变化时都会通知视图层重新渲染页面。所以如果不是视图所需要的变量，可以不定义在 data/ref 中，可定义普通变量，以避免造成资源浪费。（如分页的参数，仅用于发送请求和判断条件，不用于界面渲染，没有用 ref 定义这份变化的数据）
4. 组件化开发：
   - 组件复用：对于通用功能，将其封装为组件，提高代码复用性。（猜你喜欢组件，轮播图组件）
5. 优化资源文件：
   - 减少本地图片：除了 tabBar 图片，logo 等重要的图片，其他图片进可能使用 CND 图片。
   - 压缩图片：避免使用大图，对图片进行压缩，减少图片文件大小。（素材已压缩尺寸，[在线压缩图片](https://tinypng.com/)）
   - 网络环境适配：获取设备的网络类型，可以在应用中根据网络环境做出相应调整，如在较慢的网络环境下降低图片质量、限制大文件下载等。
6. 使用 CDN 加速：
   - 将静态资源文件放在 CDN 上，加速资源文件的加载速度。（公司已购买，由运维管理，项目商品图都已开启 CDN 加速）
7. 页面渲染优化：
   - 使用条件渲染语句（如 `wx:if`）合理控制组件渲染：减少不必要的组件渲染。（空购物车，订单状态等，v-if 可以减少 DOM 树的大小，从而减少重绘成本，而 v-show 通过 CSS 来控制显示，适用于频繁切换的场景。）
   - 避免不必要的组件重绘：减少不必要的数据变动，避免组件频繁重绘。（v-for 的 key 值有助于 Vue 识别和复用已存在的元素，减少重绘次数。v-if、v-show 的合理使用也是减少重绘成本）
   - 骨架屏提升用户体验：使用户感知到数据正在加载，降低用户等待时的焦虑感，避免页面白屏闪烁。(微信开发者工具自动生成，**项目首页**和部分**请求数据量较大的页面**记得添加骨架屏)
   - 避免视图层和逻辑层频繁进行通讯：减少 `scroll-view` 组件的 `scroll` 事件监听，注意 onPageScroll 的使用。（项目中没有使用 scroll 和 onPageScroll，如果一定要使用可以**添加防抖** 减少视图层频繁渲染，防抖和节流函数 lodash 都有现成的）
   - 多使用组件自带动画，css 动画，而不是通过 js 的定时器操作界面做动画（swiper 滑动动画是自带的，订单列表页 Tabs 的滑块使用了 css 动画，滚动驱动的动画是小程序自带的并非手动监听 scroll 事件）
8. 优化网络请求：
   - 使用请求拦截和响应拦截：对请求和响应进行拦截处理，提高请求效率。（http.ts 的封装）

（总）总的来说，性能优化是一个持续进行的过程，通过不断地优化和调整，提高项目的性能和用户体验。

### 加分

理论上越多越好，**按照自己的理解情况回答**，回答时可提及项目中的业务场景适当展开。

### 深入

如何在 uni-app 项目中使用使用防抖或节流函数。

1. 安装 lodash 工具库 `pnpm i lodash`，在 TS 项目中安装类型声明文件 `pnpm i -D @types/lodash`。
2. 导入 `debounce` 防抖函数。
3. 用 `debounce` 函数包裹原事件函数并设置合理的延迟时间（结合真机调试取合适毫秒值）。

**参考代码**

组合式 API 写法：

```vue {2,14-18,23}
<script setup lang="ts">
import { throttle } from 'lodash'
import { ref } from 'vue'

// 响应式数据
const scrollTop = ref(0)

// 普通的事件函数
const onScroll2 = (ev: UniHelper.ScrollViewOnScrollEvent) => {
  // 🔴触发频率非常高，视图层频繁渲染
  scrollTop.value = ev.detail.scrollTop
}

// 添加节流的事件函数
const onScroll = throttle((ev: UniHelper.ScrollViewOnScrollEvent) => {
  // 🟢在 100 秒内最多执行一次函数，更新视图层
  scrollTop.value = ev.detail.scrollTop
}, 100)
</script>

<template>
  <!-- 滚动容器 -->
  <scroll-view scroll-y @scroll="onScroll">
    <!-- 打印坐标 -->
    <view style="position: fixed; top: 100rpx; left: 50rpx; background-color: pink">
      scrollTop:{{ scrollTop }}
    </view>
    <view style="height: 5000rpx"> 内容 </view>
  </scroll-view>
</template>
```

选项式 API 写法：

```vue
<script lang="ts">
import { debounce } from 'lodash'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      scrollTop: 0,
      debouncedScroll: null as any,
    }
  },
  created() {
    // 防抖的处理函数，🟢适当延迟 50 毫秒后，再更新视图层
    this.debouncedScroll = debounce(this.onScroll, 50)
  },
  unmounted() {
    // 最好是在组件卸载时,清除掉防抖计时器
    this.debouncedScroll.cancel()
  },
  methods: {
    // 普通的事件处理函数
    onScroll(ev: UniHelper.ScrollViewOnScrollEvent) {
      this.scrollTop = ev.detail.scrollTop
    },
  },
})
</script>

<template>
  <!-- 滚动容器 -->
  <scroll-view scroll-y @scroll="debouncedScroll">
    <!-- 打印坐标 -->
    <view style="position: fixed; top: 100rpx; left: 50rpx; background-color: pink">
      scrollTop:{{ scrollTop }}
    </view>
    <view style="height: 5000rpx"> 内容 </view>
  </scroll-view>
</template>
```

### 再深入-防抖和节流

(总) 防抖（debounce）和节流（throttle）函数在处理高频触发事件时都非常实用。

**debounce（防抖）函数**：该函数会从上一次被调用后，延迟 `wait` 毫秒后调用`func` 函数。

**throttle （节流）函数**：在 `wait` 秒内最多执行 `func` 一次的函数。

**根据自身理解，选其中几点回答即可：**

（分 1）防抖（debounce）函数在以下应用场景中非常实用：

1. 输入框实时搜索：当用户在输入框中输入时，可以使用防抖函数来延迟触发搜索请求。这样可以减少服务器请求次数，提高性能。
2. 按钮点击：在一些场景下，如表单提交、购物车结算等，为避免用户频繁点击按钮导致重复提交数据，可以使用防抖函数控制按钮点击事件的触发。
3. 滚动事件：在处理滚动事件时，可以使用防抖函数来限制事件处理函数的执行频率。例如，当用户滚动页面时，可以使用防抖函数来延迟加载图片或触发其他与滚动相关的操作。
4. 用户操作监听：在实时监控用户操作（如鼠标移动、点击等）的场景中，可以使用防抖函数来减少事件处理函数的执行次数，降低系统资源消耗。

（分 2）节流（throttle）函数在以下应用场景中非常实用：

1. 滚动加载：在无限滚动列表或页面滚动加载数据的场景中，可以使用节流函数控制滚动事件处理函数的执行频率，以减轻服务器压力和提高性能。（组件库一般有实现）
2. 页面滚动时的动画效果：当用户滚动页面时，可以使用节流函数来控制动画效果的触发频率，以保持流畅的动画表现，避免性能抖动。（微信小程序的滚动驱动动画内部实现）
3. 实时监控鼠标移动：在需要实时监控鼠标移动的场景中，可以使用节流函数限制事件处理函数的执行频率，降低系统资源消耗。
4. 浏览器窗口大小调整：当用户调整浏览器窗口大小时，可以使用节流函数来限制与窗口大小相关的布局调整或重绘的执行频率，提高页面性能。
5. 实时数据采集：在需要实时采集用户行为数据的场景中，可以使用节流函数来控制数据发送频率，减轻服务器压力。

（总）虽然防抖和节流的应用场景看似有所重叠，但它们的工作原理和应用场景有所不同：

1. 工作原理：

防抖（debounce）：当事件触发后，防抖函数会等待一定时间（设定的延迟时间），如果在这段时间内事件没有再次触发，则执行事件处理函数。如果在这段时间内事件再次触发，那么重新开始等待延迟时间。简单来说，防抖就是让事件处理函数在事件触发后的一段时间内不执行，只有当事件停止触发一段时间后，才会执行。

节流（throttle）：节流函数会在一定时间间隔内执行事件处理函数，即使在这段时间内事件多次触发，也只会执行一次事件处理函数。简言之，节流就是让事件处理函数以固定的频率执行。

2. 应用场景：

它们在不同的场景下有各自的优势：

**防抖**适用于需要等待一段时间后才执行的场景，如：**搜索框输入实时搜索、按钮点击避免重复提交**等。这些场景中，只关心事件触发的最后一次，而不关心事件在中间的过程。

**节流**适用于需要以一定频率执行的场景，如：**滚动加载、窗口大小调整、鼠标移动监控**等。这些场景中，关心事件在整个过程中的表现，而不仅仅是最后一次触发。

**总结：防抖关注事件触发后的延迟执行，节流关注事件在整个过程中以固定频率执行。在选择使用防抖或节流时，需要根据具体的应用场景和需求来决定。**

### 参考链接

- [uni-app 优化建议-官方整理](https://uniapp.dcloud.net.cn/tutorial/performance.html#%E4%BC%98%E5%8C%96%E5%BB%BA%E8%AE%AE)
- [智能 WebP, PNG 和 JPEG 压缩](https://tinypng.com/)
- [防抖的事件处理器 - Vue 官方文档](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#stateful-methods)
- [创建一个防抖 ref - Vue 官方文档](https://cn.vuejs.org/api/reactivity-advanced.html#customref)
- [lodash 防抖 debounce 函数用法](https://www.lodashjs.com/docs/lodash.debounce)
- [lodash 节流 throttle 函数用法](https://www.lodashjs.com/docs/lodash.throttle#_throttlefunc-wait0-options)

::: tip 类似问题

- 请谈谈如何在 uni-app 中实现页面的按需加载？
- 请谈谈防抖和节流的理解和应用场景？

:::

## 在 uni-app 中，如何实现下拉刷新和上拉加载更多功能？

参考首页的下拉刷新，猜你喜欢组件和热门推荐页的上拉加载分页。

### 必答-下拉刷新

我们是通过 `scroll-view` 组件 实现的下拉刷新，步骤如下：

1. 启用下拉刷新： 添加 `refresher-enabled` 属性。
2. 下拉刷新事件：绑定 `@refresherrefresh` 事件。
3. 添加 下拉刷新状态 标记： 添加 `refresher-triggered` 属性，用于关闭动画的。
4. 下拉刷新事件内部：主要是重新获取数据，当数据获取成功后，主动关闭下拉刷新动画。注意在多个请求的情况下，需要用 `Promise.all()` 等所有请求都结束了，再关闭动画。

**参考代码**

```vue
<script setup lang="ts">
// 当前下拉刷新状态
const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  // 加载数据
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  // 关闭动画
  isTriggered.value = false
}
</script>

<template>
  <!-- 滚动容器 -->
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
    scroll-y
  >
    ....
  </scroll-view>
</template>
```

### 必答-分页加载

上拉加载更多其实就是分页加载，主要步骤如下。

1. 定义 `pageParams` 对象，存储分页参数，包括页码 `page` 和每页数据量 `pageSize`。
2. 定义 `finish` 响应式引用，表示是否已加载完所有数据。
3. 滚动触底事件：给 `scroll-view` 组件绑定 `@scrolltolower` 事件。
4. 在事件内部需要判断是否已加载完所有数据，没有结束就继续发送请求，同时页码要累加，获取的数据要追加到原数组后，如果分页已结束，就更新 `finish` 标记，并提醒用户。

```vue
<script setup lang="ts">
// 分页参数
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
}
// 猜你喜欢的列表
const guessList = ref<GuessItem[]>([])
// 已结束标记
const finish = ref(false)
// 获取猜你喜欢数据
const getHomeGoodsGuessLikeData = async () => {
  // 退出分页判断
  if (finish.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  const res = await getHomeGoodsGuessLikeAPI(pageParams)
  // 数组追加
  guessList.value.push(...res.result.items)
  // 分页条件
  if (pageParams.page < res.result.pages) {
    // 页码累加
    pageParams.page++
  } else {
    finish.value = true
  }
}
// 重置数据
const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  finish.value = false
}
// 组件挂载完毕
onMounted(() => {
  getHomeGoodsGuessLikeData()
})
</script>

<template>
  <!-- 滚动容器 -->
  <scroll-view @scrolltolower="onScrolltolower" scroll-y>
    <!-- 猜你喜欢列表 -->
    <view class="guess">
      <navigator
        class="guess-item"
        v-for="item in guessList"
        :key="item.id"
        :url="`/pages/goods/goods?id=${item.id}`"
      >
        <image class="image" mode="aspectFill" :src="item.picture"></image>
        <view class="name"> {{ item.name }} </view>
        <view class="price">
          <text class="small">¥</text>
          <text>{{ item.price }}</text>
        </view>
      </navigator>
    </view>
    <view class="loading-text">
      {{ finish ? '没有更多数据~' : '正在加载...' }}
    </view>
  </scroll-view>
</template>
```

## 如何在 uni-app 中处理表单元素？

### 必答

在我们项目的个人信息页，收货地址表单页等页面都涉及到表单数据的收集。

（总）在 uni-app 中使用的是 ` <input>`、`<radio>` 、`<checkbox>` 和` <picker>` 等组件，能兼容不同平台。

（分）

1. `input` 支持 `v-model` 双向绑定，收集数据比较便利。
2. `<radio>` 、`<checkbox>` 和` <picker>` 等不支持 `v-model` 指令，可以使用 `:value` 和 `@change` 代替 `v-model` 来实现类似的效果。

（总） **小程序端的表单组件具有一些特有的属性，外观和功能都有些差异**，如 `input` 组件的 `type` 属性支持的值与网页端有所不同。例如，小程序端的 `input` 组件有一个 `idcard` 类型，而网页端没有。所以**不要完全凭借网页端的经验处理小程序的表单**，尽管部分表单组件的名称和网页端同名，也要应该要查阅 uni-app 组件部分的文档了解差异。

**参考代码**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const switchValue = ref(false)

const onSwitchChange = (ev: UniHelper.SwitchOnChangeEvent) => {
  switchValue.value = ev.detail.value
}
</script>

<template>
  <view>
    <switch :value="switchValue" @change="onSwitchChange" />
  </view>
</template>
```

（总）在这个例子中，我们使用 `ref` 函数创建了一个名为 `switchValue` 的响应式引用，并使用 `:value` 将 `switchValue` 的值传递给 `<switch>` 组件。我们还定义了一个名为 `onSwitchChange` 的函数，它在开关状态发生变化时被 `@change` 事件监听器调用，从而根据事件对象中的 `detail.value` 更新 `switchValue` 的值。

### 加分-表单校验

项目中我们还通过 `uni-forms` 实现了表单的校验。

以下是使用 uni-forms 实现表单校验的具体步骤：

1. 创建表单数据和验证规则：使用 `ref` 函数创建表单数据对象 `form` 和验证规则对象 `rules`。
2. 设置 ·uni-forms 属性：在 `<uni-forms>` 组件上设置 `:model` 和 `:rules` 属性，分别绑定到 `form` 和 `rules`。
3. 使用 uni-form-item 组件和 input 组件构建表单：为每个表单项创建一个 `<uni-form-item>` 组件，并设置 `name` 属性。在表单项内部使用 `<input> ` 组件，并使用 `v-model` 指令进行双向数据绑定。
4. 创建表单引用：使用 `ref` 函数创建一个名为 `formRef` 的引用，将其设置为 `<uni-forms>` 组件的 `ref` 属性。
5. 创建表单提交处理函数：定义一个名为 `onSubmit` 的函数，在此函数内部使用 `formRef.value.validate()` 方法进行表单验证。根据验证结果执行相应的逻辑（例如，提交表单或显示错误提示）。
6. 添加提交按钮：在模板中添加一个提交按钮，为其设置 `@tap` 事件监听器，绑定到 `onSubmit` 函数。

**参考代码**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  username: '',
  password: '',
})

const rules: UniHelper.UniFormsRules = {
  username: {
    rules: [{ required: true, errorMessage: '用户名不能为空' }],
  },
  password: {
    rules: [{ required: true, errorMessage: '密码不能为空' }],
  },
}

const formRef = ref<UniHelper.UniFormsInstance>()

const onSubmit = async () => {
  try {
    const result = await formRef.value?.validate!()
    console.log('校验通过，提交数据：', result)
  } catch (error) {
    console.log('校验未通过：', error)
  }
}
</script>

<template>
  <view>
    <uni-forms :model="form" :rules="rules" ref="formRef">
      <uni-forms-item label="用户名：" name="username">
        <input v-model="form.username" placeholder="请输入用户名" />
      </uni-forms-item>
      <uni-forms-item label="密码:" name="password">
        <input password v-model="form.password" placeholder="请输入密码" />
      </uni-forms-item>
      <view>
        <button @tap="onSubmit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>
```

### 参考链接

[普通 form 表单](https://uniapp.dcloud.net.cn/component/form.html)

[uni-forms 表单校验](https://uniapp.dcloud.net.cn/component/uniui/uni-forms.html#%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C)

::: tip 类似问题

- 在 uni-app 中，如何处理不同平台下的表单处理差异？

:::

## 问：请谈谈你在使用 uni-app 过程中遇到的问题，以及如何解决它们。

### 必答

（总）在遇到问题时，我一般都是参考官方文档、社区资源和其他开发者的经验。

（分）根据自身理解，选其中几点回答即可：

1. vue 语法支持问题：uni-app 在发布到 H5 时支持所有 vue 的语法；发布到 App 和小程序时，由于平台限制，无法实现全部 vue 语法。相比 Web 平台， Vue.js 在 uni-app 中使用差异主要集中在两个方面：
   - 新增：uni-app 除了支持 Vue 实例的组件生命周期，还拥有[应用生命周期](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)及[页面的生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)。
   - 受限：相比 Web 平台，在小程序和 App 端部分功能支持不完善，具体见[兼容性列表](https://uniapp.dcloud.net.cn/tutorial/vue3-api.html)。
   - 如：**微信小程序端不支持自定义指令 directive**，可通过封装工具函数实现，[参考方案](https://ask.dcloud.net.cn/article/40459)。
2. 跨平台兼容性问题： 由于 uni-app 需要适配多个平台，开发过程中可能会遇到不同平台的兼容性问题。在遇到此类问题时，可以参考官方文档和社区资源，了解不同平台的特性和限制，然后针对性地解决问题。如果必要，可以使用条件编译，在不同平台下执行不同的代码。
   - 如 H5 端不支持 微信登录，滚动驱动的动画等功能。
3. 性能问题： 在 uni-app 开发过程中，可能会遇到页面性能问题，如加载速度慢等。为了解决这些问题，可以尝试以下方法：
   - 减少本地图片资源，压缩图片，避免使用大图；（素材中已优化，[在线压图工具](https://tinypng.com/)）
   - 减少不必要的计算和渲染；
   - 使用分包加载，按需加载页面和资源；
4. 插件兼容性问题： 当使用第三方插件或库时，可能会遇到兼容性问题。在这种情况下，可以尝试以下方法：
   - 查找针对 uni-app 的插件版本；(如 SKU 组件要筛选支持 Vue3 版的，axios 不支持小程序端则自行封装)
   - 修改插件配置，以适应 uni-app 的环境；(如 Pinia 持久化存储方案需要改默认配置)
   - 寻找替代方案，如使用 uni-app 官方提供的 API 或组件。（如 组件库使用官方的 uni-ui）
5. 更新和维护问题： 随着项目的发展，可能需要更新和维护代码。为了降低维护成本，可以：
   - 保持代码的模块化和组件化；（一直都有保持）
   - 遵循良好的编码规范；（一直都有保持）
   - 编写文档，记录项目结构和功能。（一直都保持，如：封装函数写 JSDoc 注释）

（总）其实 uni-app 官方文档记录了大量的跨平台兼容性问题和解决方案，uni-app 插件市场有大量插件，同时 uni-app 社区也有其他开发者分享的经验，也可以在 uni-app 社区提问题，以找到合适的解决方案。最后，保持良好的编码规范和项目结构，可以降低维护成本，提高开发效率。

### 参考链接

- [uni-app H5 正常但小程序异常的可能性](https://uniapp.dcloud.net.cn/matter.html#h5%E6%AD%A3%E5%B8%B8%E4%BD%86app%E5%BC%82%E5%B8%B8%E7%9A%84%E5%8F%AF%E8%83%BD%E6%80%A7)
- [uni-app 区别于传统 web 开发的注意](https://uniapp.dcloud.net.cn/matter.html#%E5%8C%BA%E5%88%AB%E4%BA%8E%E4%BC%A0%E7%BB%9F-web-%E5%BC%80%E5%8F%91%E7%9A%84%E6%B3%A8%E6%84%8F)
- [uni-app 跨端兼容](https://uniapp.dcloud.net.cn/tutorial/platform.html#%E8%B7%A8%E7%AB%AF%E5%85%BC%E5%AE%B9)
- [uni-app 常见问题-官方整理](https://uniapp.dcloud.net.cn/faq.html)
- [uni-app 优化建议-官方整理](https://uniapp.dcloud.net.cn/tutorial/performance.html#%E4%BC%98%E5%8C%96%E5%BB%BA%E8%AE%AE)
- [uni-app 路由拦截方法使用](https://juejin.cn/post/7140512715453235207)
- [智能 WebP, PNG 和 JPEG 压缩](https://tinypng.com/)

## 问：请简述代码规范在团队协作中的重要性？

### 必答

（总）我们团队是使用 ESLint、Prettier 和 Husky 来确保代码质量和一致性：

（分）**根据自身理解，选其中几点回答即可：**

1. **保持代码一致性**：代码规范可以确保团队成员遵循相同的编码风格和约定。这可以提高代码的可读性，使团队成员更容易理解和维护彼此的代码。
2. **提高代码质量**：通过强制执行一些最佳实践，ESLint 可以帮助开发者避免常见的错误和潜在的风险。这有助于提高代码的质量，减少维护成本。
3. **自动化格式化**：Prettier 可以自动格式化代码，保持代码整洁，减轻开发者在调整代码格式时的负担。它可以帮助开发者专注于编写功能代码，而无需担心代码风格的问题。
4. **预提交检查**：Husky 可以在代码提交到版本控制系统（如 Git）之前执行一些预定义的任务，如运行 ESLint 和 Prettier 检查。这有助于确保仅提交符合规范的代码，从而减少代码审查和后期修复的成本。
5. **更好的协作**：通过遵循相同的代码规范和工具，团队成员之间的协作变得更加顺畅。这有助于提高开发效率，降低沟通成本。
6. **提高开发效率**：使用这些工具可以自动处理一些繁琐的任务（如格式化、检查错误等），从而使开发者可以专注于编写高质量的功能代码，提高开发效率。

（总）总之，**通过遵循统一的规范，团队可以更高效地开发和维护项目**。

### 深入

可以谈谈在 uni-app 项目中是如何应用 ESLint、Prettier 和 Husky 的，以及你遇到的一些挑战和解决方法。

（总）**这些配置是由团队负责人制定，当然也可以由你自己配置，在小兔鲜儿的项目中已全部配置。**

（分）具体步骤可以如下：

1. 首先，我们需要安装 ESLint、Prettier 和 Husky 作为项目的**开发依赖**。
2. 接下来，**配置 ESLint**。在项目根目录下创建一个 .eslintrc.js 或 .eslintrc.json 配置文件，并定义相应的规则。可以根据项目需求，选择使用 Vue 官方推荐的规则或者自定义规则。同时，我们需要在项目的 package.json 文件中的 "scripts" 部分添加一个用于执行 ESLint 检查的脚本，例如：`"lint": "eslint --ext .js,.vue,.ts --fix"`。
3. 接着，**配置 Prettier**。创建一个 .prettierrc.js 或 .prettierrc.json 配置文件，在其中定义代码格式化规则。同时，可以在 .eslintrc.js 或 .eslintrc.json 文件中添加一些与 Prettier 相关的配置，以确保 ESLint 与 Prettier 能够协同工作。
4. 然后，**配置 Husky**。在项目中定义 Git 钩子。例如，在 pre-commit 钩子中执行 ESLint 和 Prettier 检查以确保提交的代码符合规范。
5. 最后，为了确保团队成员能够在各种编辑器中保持一致的代码风格，建议在项目中添加一个 .editorconfig 文件，定义编辑器相关的通用配置。

**在应用这些工具时，其实也遇到了的一些挑战：**

- 在使用 uni. 全局变量的时候报错，针对 uni-app 项目设置全局变量，如：getCurrentPages、uni、wx、UniHelper。
- ESLint、Prettier 和编辑器之间可能存在冲突。为了解决这个问题，可以在 .eslintrc.js 或 .eslintrc.json 文件中添加与 Prettier 相关的配置，并确保编辑器插件正确地应用了这些配置。
- 部分 ESLint 规则可能与项目需求不符。在这种情况下，可以根据项目实际情况，自定义规则或禁用部分不适用的规则。
- 当使用第三方库或组件时，可能会遇到与 ESLint 规则冲突的问题。可以在 .eslintignore 文件中排除这些文件，或者在特定文件中禁用特定规则。

通过克服这些挑战，我们可以在 uni-app 项目中顺利地应用 ESLint、Prettier 和 Husky，确保代码质量和团队协作的高效性。

**参考配置**

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier', // 遇到的挑战2: ESLint、Prettier 存在冲突
  ],
  // 遇到的挑战1: 小程序全局变量
  globals: {
    uni: true,
    wx: true,
    WechatMiniprogram: true,
    getCurrentPages: true,
    UniApp: true,
    UniHelper: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 遇到的挑战2: ESLint、Prettier 存在冲突
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        printWidth: 100,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
    // 遇到的挑战3: 部分 ESLint 规则与项目需求不符
    'vue/multi-word-component-names': ['off'],
    'vue/no-setup-props-destructure': ['off'],
    'vue/no-deprecated-html-element-is': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],
  },
}
```

## 问：请介绍 uni-app 中的条件编译和平台差异化处理?

### 必答

(总)在 uni-app 开发过程中，由于需要适配多个平台，可能会遇到不同平台之间的差异和兼容性问题。为了解决这些问题，uni-app 提供了条件编译和平台差异化处理功能。

(分)

1. **条件编译(常见)：**，条件编译是在编译阶段根据预设条件对代码进行不同分支的编译。在 uni-app 中，可以通过条件编译实现针对不同平台编译不同的代码。 通过在代码中添加特定的注释来实现条件编译。例如：

```ts {1,3,5,7}
// #ifdef H5
console.log('这段代码只编译到H5端')
// #endif

// #ifdef MP-WEIXIN
console.log('这段代码只编译到微信小程序端')
// #endif
```

2.  **平台差异化处理：** 平台差异化处理是在运行时根据当前平台执行不同的代码逻辑。在 uni-app 中，可以通过 `const { osName } = uni.getSystemInfoSync()` 来判断当前平台，然后编写针对不同平台的代码逻辑。例如：

```ts
// 获取系统名称
const { osName } = uni.getSystemInfoSync()
if (osName === 'ios') {
  console.log('ios平台执行的逻辑')
} else if (osName === 'android') {
  console.log('android平台执行的逻辑')
}
```

总结： 条件编译和平台差异化处理是 uni-app 为解决多平台兼容性问题提供的两种方法。条件编译更加常见，在编译阶段根据预设条件对代码进行不同分支的编译，而平台差异化处理是在运行时根据当前平台执行不同的代码逻辑。根据项目需求和场景，可以灵活选择使用这两种方法。

### 加分

条件编译在 uni-app 中有很多应用场景，主要用于处理不同平台间的差异和兼容性问题。以下是一些常见的应用场景：

1. 登录功能差异：不同平台可能有不同的登录方式和 API。例如，微信小程序可以使用微信登录，而 H5 平台可能需要使用其他登录方式，如手机号+验证码。这种情况下，可以使用条件编译为不同平台提供适当的登录实现。

```ts
// #ifdef MP-WEIXIN
// 微信小程序登录
const { code } = wx.login()
// #endif

// #ifdef H5
// H5平台登录，如手机号+验证码
// ...
// #endif
```

2. API 差异：不同平台可能存在 API 差异，有的 API 在某些平台上可能不可用。在这种情况下，可以使用条件编译来处理平台差异。

```ts
// #ifdef H5
navigator.geolocation.getCurrentPosition((position) => {
  // H5获取地理位置
})
// #endif

// #ifdef MP-WEIXIN
wx.getLocation({
  type: 'wgs84',
  success(res) {
    // 微信小程序获取地理位置
  },
})
// #endif
```

3. UI 组件差异：不同平台的 UI 组件可能存在差异，例如 导航栏、底部标签栏，微信小程序的`picker`组件和 H5 平台的`select`元素。可以使用条件编译针对不同平台提供不同的 UI 组件。

```vue
<template>
  <!-- #ifdef H5 -->
  <select>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
  <!-- #endif -->

  <!-- #ifdef MP-WEIXIN -->
  <picker>
    <view>Option 1</view>
    <view>Option 2</view>
  </picker>
  <!-- #endif -->
</template>
```

4. 资源路径差异：有时，不同平台对资源路径的处理方式不同，可以使用条件编译为不同平台提供适当的资源路径。

```vue
<template>
  <!-- #ifdef H5 -->
  <img src="/static/img/logo.png" />
  <!-- #endif -->

  <!-- #ifdef MP-WEIXIN -->
  <image src="/static/img/logo-weixin.png" />
  <!-- #endif -->
</template>
```

总之，条件编译在 uni-app 开发过程中具有广泛的应用场景，主要用于解决不同平台间的差异和兼容性问题。根据具体需求，可以灵活运用条件编译来实现适配不同平台的功能和表现。

::: tip 类似问题

问：如何在 uni-app 的组件中实现跨平台逻辑？

问：如果区分 ios 端和 android 端执行不同的业务？

:::
