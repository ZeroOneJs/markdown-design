English | [中文](./README.zh-CN.md)

# Vue Markdown Design

[![NPM Version](https://img.shields.io/npm/v/vue-markdown-design)](https://www.npmjs.com/package/vue-markdown-design) [![codecov](https://codecov.io/github/ZeroOneJs/markdown-design/graph/badge.svg?token=US6XWJTP8H)](https://codecov.io/github/ZeroOneJs/markdown-design) [![GitHub License](https://img.shields.io/github/license/ZeroOneJs/markdown-design)](https://github.com/ZeroOneJs/markdown-design/blob/main/packages/vue-markdown-design/LICENSE) [![Release](https://github.com/ZeroOneJs/markdown-design/actions/workflows/release.yml/badge.svg)](https://github.com/ZeroOneJs/markdown-design/actions/workflows/release.yml)

An out-of-the-box Markdown rendering component for Vue 3, built on [markdown-it](https://github.com/markdown-it/markdown-it).

## Key Features

🚀 **Core** - Real-time Markdown rendering, table of contents generation, and full-text search

📦 **Builtins** - Includes commonly used Markdown features such as emoji, permalinks, and syntax highlighting

🎨 **Theming** - Replaceable Markdown themes and component styles configurable via CSS variables

🔌 **Plugins** - Compatible with markdown-it plugins for flexible extensibility

📱 **Responsive** - Optimized for both desktop and mobile with responsive layouts

🧩 **Modular** - Import core features on demand and compose components for flexible layouts

🛡️ **Security** - HTML sanitization is enabled by default to mitigate XSS and other attacks

📋 **Typings** - Written in TypeScript with complete type definitions

🧪 **Testing** - Achieves 99% coverage in both E2E and unit tests, ensuring component stability and reliability

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
<!-- App.vue -->

<vue-markdown :src="`# Title\nContent`" />
```

## More

For detailed documentation, visit https://markdown-design.pages.dev.

## License

Released under the [MIT](./LICENSE) license.
