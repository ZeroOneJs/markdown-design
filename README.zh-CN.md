# Vue Markdown Design

一个基于 [markdown-it](https://github.com/markdown-it/markdown-it) 的 Vue 3 开箱即用 Markdown 渲染组件。

## 主要特性

🚀 **核心功能** - 提供 Markdown 实时渲染，目录生成和全文搜索功能

📦 **开箱即用** - 集成 Markdown 常用功能，包括 Emoji 表情、标题永久链接、代码高亮等

🎨 **主题定制** - 可替换的 Markdown 主题，可通过 CSS 变量配置的组件样式

🔌 **生态兼容** - 兼容 markdown-it 插件，支持丰富的功能扩展

📱 **跨端适配** - 适配 PC 端和移动端，支持响应式布局

🧩 **模块设计** - 核心功能支持按需引入，自由组合满足多样化布局需求

🛡️ **安全防护** - 默认启用 HTML 内容安全过滤，有效防范 XSS 等网络攻击

📋 **类型提示** - 使用 TypeScript 开发，提供完整的类型定义

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
<!-- App.vue -->

<vue-markdown :src="`# 标题\n内容`" />
```

## 更多

详细开发文档请前往 https://markdown-design.pages.dev/zh-CN

## 开源协议

本项目基于 [MIT](./LICENSE) 协议。
