# markdown-it-sanitize

一个基于 [DOMPurify](https://github.com/cure53/DOMPurify) 的 markdown-it 插件。当开启 markdown-it 的 html 配置项时，会过滤输出的 HTML 标签，以预防 XSS 攻击。

## 快速上手

### 安装

```sh
npm i @markdown-design/markdown-it-sanitize
```

### 使用

```js
// demo.js

import markdownit from 'markdown-it'
import { sanitize } from '@markdown-design/markdown-it-sanitize'

const md = markdownit({ html: true })
md.use(sanitize)

const html = md.render('<span>foo<img src=x onerror=alert(1)//></span>')
console.log(html)
// 输出：<p><span>foo<img src="x"></span></p>
```

### 配置

你也可以传入 DOMPurify 的[配置项](https://github.com/cure53/DOMPurify#can-i-configure-dompurify)，如：

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
// 输出：<p>&lt;iframe//src=JavScript:alert(((1)&gt;goodbye<p></p>not me!</p>
```

## 开源协议

本项目基于 [MIT](./LICENSE) 协议。
