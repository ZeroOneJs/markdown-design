# 快速开始

## 安装

选择一个你正在使用的包管理器进行安装

::: code-group

```sh [npm]
$ npm add vue-markdown-design
```

```sh [pnpm]
$ pnpm add vue-markdown-design
```

```sh [yarn]
$ yarn add vue-markdown-design
```

:::

## 使用

### 全局引入

全局引入组件，可以在项目中的任意组件中使用

```js [main.ts]
// 引入组件
import { VueMarkdown } from 'vue-markdown-design'

import { createApp } from 'vue'

const app = createApp()

// 注册组件
app.use(VueMarkdown)

app.mount('#app')
```

### 按需引入

如果不想全局引入，也可以在组件中单独引入

```vue [App.vue]
<template>
  <vue-markdown :src="`# 标题\n内容`" />
</template>

<script setup>
import { VueMarkdown } from 'vue-markdown-design'
</script>
```
