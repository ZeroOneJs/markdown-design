English | [中文](./README.zh-CN.md)

# Vue Markdown Design

A Vue 3 out-of-the-box Markdown component built on [markdown-it](https://github.com/markdown-it/markdown-it). It mainly features Markdown rendering, TOC generation, and keyword search. It also includes other common functionalities such as support for markdown-it plugins, emoji, heading permalinks, XSS sanitization, and TypeScript.

## Quick Start

### Installation

```sh
npm i vue-markdown-design
```

### Usage

```js
// main.js

// Import component
import VueMarkdown from 'vue-markdown-design'

import { createApp } from 'vue'

const app = createApp()

// Register component
app.use(VueMarkdown)

app.mount('#app')
```

```vue
<!-- demo.vue -->

<vue-markdown :src="`# Title\nContent`" />
```

## More

More documentation coming soon!

## License

[MIT](./LICENSE).
