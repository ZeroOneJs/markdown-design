# Vue Markdown Design

一个基于 [markdown-it](https://github.com/markdown-it/markdown-it) 的 Vue 3 开箱即用 Markdown 组件，主要功能有 Markdown 渲染，目录生成，关键字搜索。同时内置其他常用功能，包括支持 markdown-it 插件，emoji 表情，标题永久链接，防御 XSS 攻击，支持 TypeScript 等。

## 快速上手

### 安装

```sh
npm i vue-markdown-design
```

### 使用

```js
// main.js

// 引入组件
import VueMarkdown from 'vue-markdown-design'

import { createApp } from 'vue'

const app = createApp()

// 注册组件
app.use(VueMarkdown)

app.mount('#app')
```

```vue
<!-- demo.vue -->

<vue-markdown :src="`# 标题\n内容`" />
```

## 更多

详细文档即将发布，敬请期待！

## 开源协议

本项目基于 [MIT](../../LICENSE) 协议。
