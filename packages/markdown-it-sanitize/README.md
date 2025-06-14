# markdown-it-sanitize

A markdown-it plugin built on [DOMPurify](https://github.com/cure53/DOMPurify). The plugin sanitizes the output HTML when the html option of markdown-it is enabled, to prevent XSS attacks.

## Quick Start

### Installation

```sh
npm i @markdown-design/markdown-it-sanitize
```

### Usage

```js
// demo.js

import markdownit from 'markdown-it'
import { sanitize } from '@markdown-design/markdown-it-sanitize'

const md = markdownit({ html: true })
md.use(sanitize)

const html = md.render('<span>foo<img src=x onerror=alert(1)//></span>')
console.log(html)
// Outputs: <p><span>foo<img src="x"></span></p>
```

### Configuration

You can pass the DOMPurify [configuration](https://github.com/cure53/DOMPurify#can-i-configure-dompurify) to the plugin like this:

```js
// demo.js
import markdownit from 'markdown-it'
import { sanitize } from '@markdown-design/markdown-it-sanitize'

const md = markdownit({ html: true })
md.use(sanitize, { ALLOWED_TAGS: ['p', '#text'] })

const html = md.render(
  '<iframe//src=JavScript:alert&lpar;1)></ifrAMe><br>goodbye</p><h1>not me!</h1>'
)
console.log(html)
// Outputs: <p>&lt;iframe//src=JavScript:alert(((1)&gt;goodbye<p></p>not me!</p>
```

## License

[MIT](./LICENSE).
