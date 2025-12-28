# 快速开始

## 安装

选择一个您正在使用的包管理器进行安装。

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

::: tip 提示
以下示例仅展示全功能组件的引入方式。核心功能组件同样适用，具体使用方法请参考[进阶用法](./advanced)。
:::

### 全局引入

通过全局引入，组件可以在项目的任意位置直接使用。

```js [main.js]
// 引入组件
import { VueMarkdown } from 'vue-markdown-design'

import { createApp } from 'vue'

const app = createApp()

// 注册组件
app.use(VueMarkdown)

app.mount('#app')
```

```vue [App.vue]
<template>
  <vue-markdown :src="md" />
</template>

<script setup>
const md = `
  # Lorem ipsum

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus elit fermentum pellentesque vehicula. Suspendisse potenti. Donec iaculis consectetur erat nec placerat. Suspendisse facilisis justo sit amet hendrerit sollicitudin. Suspendisse commodo malesuada massa, ac elementum risus. Ut eu facilisis neque. Fusce tincidunt, ligula vitae eleifend venenatis, purus purus ultrices purus, nec maximus tellus lectus nec leo. Sed auctor magna sed quam dapibus dapibus. Nullam ornare ultricies sem, a iaculis sapien volutpat euismod. Sed ac dictum nulla. Duis euismod tellus vitae diam hendrerit, sit amet vestibulum mauris rhoncus.
  `
</script>
```

### 手动引入

如果组件仅在少数位置使用，推荐采用手动引入的方式。

```vue [App.vue]
<template>
  <vue-markdown :src="md" />
</template>

<script setup>
import { VueMarkdown } from 'vue-markdown-design'

const md = `
  # Lorem ipsum

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus elit fermentum pellentesque vehicula. Suspendisse potenti. Donec iaculis consectetur erat nec placerat. Suspendisse facilisis justo sit amet hendrerit sollicitudin. Suspendisse commodo malesuada massa, ac elementum risus. Ut eu facilisis neque. Fusce tincidunt, ligula vitae eleifend venenatis, purus purus ultrices purus, nec maximus tellus lectus nec leo. Sed auctor magna sed quam dapibus dapibus. Nullam ornare ultricies sem, a iaculis sapien volutpat euismod. Sed ac dictum nulla. Duis euismod tellus vitae diam hendrerit, sit amet vestibulum mauris rhoncus.
  `
</script>
```
