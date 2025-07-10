# 快速开始

## 安装

选择一个你喜欢的包管理器进行安装

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
