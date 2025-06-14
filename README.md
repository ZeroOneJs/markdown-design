# markdown-it-headers

A markdown-it plugin for extracting markdown heading information. For details on the returned heading structure, see [MditHeadings](#MditHeadings).

## Quick Start

### Installation

```sh
npm i @markdown-design/markdown-it-headers
```

### Usage

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
// Outputs:
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

| Name     | Type                            |
| -------- | ------------------------------- |
| headings | [MditHeadings](#MditHeadings)[] |

#### MditHeadings

| Name  | Description     | Type   |
| ----- | --------------- | ------ |
| level | Heading level   | number |
| text  | Heading content | string |

## License

[MIT](./LICENSE).
