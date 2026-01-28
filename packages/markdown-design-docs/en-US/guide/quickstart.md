# Quick Start

## Installation

Choose the package manager your project uses to install the package.

::: code-group

```sh [npm]
$ npm i vue-markdown-design
```

```sh [pnpm]
$ pnpm add vue-markdown-design
```

```sh [yarn]
$ yarn add vue-markdown-design
```

:::

## Usage

::: tip
The demo below only shows how to import the full-featured component. The core components follow the same pattern. For details, see [Advanced Usage](./advanced).
:::

### Global Registration

With global registration, you can use the component anywhere in your project.

```js [main.js]
// Import component
import { VueMarkdown } from 'vue-markdown-design'

import { createApp } from 'vue'

const app = createApp()

// Register component
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

### Manual Import

If you only use the component in a few places, manual import is recommended.

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
