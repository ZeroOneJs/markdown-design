# markdown-it-headers

一个用于提取 markdown 标题信息的 markdown-it 插件，主要返回的标题信息请看 [MditHeadings](#MditHeadings)。

## 快速上手

### 安装

```sh
npm i @markdown-design/markdown-it-headers
```

### 使用

```js
// demo.js

import markdownit from 'markdown-it'
import { headers } from '@markdown-design/markdown-it-headers'

const md = markdownit()
md.use(headers)

const env = {}
md.render(`# foo\n## bar\nbaz`, env)
const { headings = [] } = env
console.log(headings)
// 输出：
// [
//     {
//         "level": 1,
//         "text": "foo"
//     },
//     {
//         "level": 2,
//         "text": "bar"
//     }
// ]
```

### TypeScript

```ts
// demo.ts
import { type MditHeadersEnv } from '@markdown-design/markdown-it-headers'

const env: MditHeadersEnv = {}
```

#### MditHeadersEnv

| 名称     | 类型                            |
| -------- | ------------------------------- |
| headings | [MditHeadings](#MditHeadings)[] |

#### MditHeadings

| 名称  | 说明           | 类型   |
| ----- | -------------- | ------ |
| level | 标题的级别     | number |
| text  | 标题包含的内容 | string |

## 开源协议

本项目基于 [MIT](./LICENSE) 协议。
