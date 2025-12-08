# Render

## 基础用法

通过 `src` 传入 markdown 字符串，渲染对应的 HTML 内容。

::: demo
render/Basic.vue
:::

## 常用预设规则

使用 `preset-name` 可以快捷地设置 markdown 规则。内置三种常用规则：
[default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs) 规则，类似 GFM。[commonmark](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) 规则，详情[请看](https://commonmark.org/)。[zero](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs) 规则，所有规则都不会启用。

::: tip 提示
和 `markdown-it` 的默认规则稍有不同，这里的 `html` 选项默认是开启的。
:::

::: demo
render/PresetName.vue
:::

## markdown-it 插件

通过 `plugins` 可以传入 `markdown-it` 插件。支持两种传参方式：第一种是直接传入单个插件。第二种可通过数组传入多个插件，数组中的每一项可以是单个插件，也可以是插件和参数组成的数组（如：`[插件, [插件, 参数1, 参数2, ...]]`）。

::: demo
render/Plugins.vue
:::

## 单行模式

使用 `inline` 时会跳过块级元素的解析，并且生成结果不会被包裹到 `<p>` 标签中。

::: demo
render/Inline.vue
:::

## 解析 HTML 标签

使用 `html` 可以控制是否解析 markdown 中的 HTML 标签。

::: demo
render/Html.vue
:::

## HTML 标签净化

使用 `sanitize` 可以对生成结果中的 HTML 标签进行净化，以预防 XSS 等网络攻击。开启 `sanitize` 可能会影响 HTML 标签的生成效果，如果最终结果不符合预期且你对安全性要求较低，可以尝试关闭 `sanitize` 选项，但请注意这是非常危险的行为。如果你对安全性要求比较高，建议直接关闭 `html` 选项

::: demo
render/Sanitize.vue
:::

## XHTML 输出

使用 `xhtml-out` 可以使生成结果符合 XHTML 标准

::: demo
render/XhtmlOut.vue
:::

## 换行处理

使用 `breaks` 可以将 markdown 文本中的 `\n` 解析为 `<br>` 标签。

::: demo
render/Breaks.vue
:::

## 代码块语法高亮

使用 `highlight` 可以将 markdown 中的代码块根据其编程语言进行语法高亮。当传入布尔值时，会使用 [highlight.js](https://highlightjs.org/) 作为语法高亮工具，此时你可以通过 [highlightOptions](https://highlightjs.readthedocs.io/en/latest/api.html#configure) 来配置它。当默认语法高亮无法满足需求时，`highlight` 也支持通过函数来自定义高亮语法规则。

::: demo
render/Highlight.vue
:::

## 自定义语法高亮样式

通过 `lang-prefix` 修改代码块样式名前缀来自定义语法高亮样式。

::: demo
render/LangPrefix.vue
:::

## 自动转换链接

使用 `linkify` 可以将 markdown 中类似 url 的文本转换为链接

::: demo
render/Linkify.vue
:::

## 常见符号处理

使用 `typographer` 可以将 markdown 中的一些特定文本替换为[常见的符号](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs)。当 `typographer` 开启时，还可以通过 `quotes` 自定义引号，这在多语言环境中很有用。

::: demo
render/Typographer.vue
:::

## Emoji 表情

通过 `emoji` 可以将 markdown 中的[特定文本](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)解析为 emoji 表情。除了支持布尔值传参外，还可以通过传入对象来配置 emoji 表情，详细配置项[请参考](https://github.com/markdown-it/markdown-it-emoji?tab=readme-ov-file#init)

::: demo
render/Emoji.vue
:::

## 标题锚点

通过 `anchor` 可以为所有标题元素添加唯一标识符（ID），这可以帮助导航组件（如 TOC 组件）实现锚点定位。当开启 `anchor` 时默认会在所有标题前面添加永久链接，你可以通过 `permalink` 控制它的显示隐藏。`anchor` 还支持传入对象或函数来自定义标题的渲染，更多配置项[请参考](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#usage)

::: demo
render/Anchor.vue
:::

## 自定义样式

默认使用 [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) 作为生成结果的样式，也可以通过 `markdown-class` 来自定义你的样式

::: demo
render/MarkdownClass.vue
:::

<!-- ## 获取 markdown-it 实例

通过 `mdInstance` 可以获取组件内部的 `markdown-it` 实例，以便为 markdown 解析提供更加灵活的操作

::: demo
render/MdInstance.vue
::: -->

<!-- ## 监听 env 变化

通过 `envChange` 可以监听env 的变化，从而可以接收某些 markdown-it 插件通过 env 传递的信息。

::: demo
render/EnvChange.vue
::: -->

## API

### Props

| 属性名           | 说明                                                                                                                                                                       | 类型                                                                   | 默认值        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------- |
| src              | markdown 字符串                                                                                                                                                            | `string` / `number`                                                    | ''            |
| presetName       | markdown 预设规则                                                                                                                                                          | `'default' \| 'commonmark' \| 'zero'`                                  | default       |
| plugins          | `markdown-it` 插件                                                                                                                                                         | `PluginSimple` / `Array<PluginSimple \| [PluginWithParams, ...any[]]>` | []            |
| inline           | 是否启用单行模式                                                                                                                                                           | `boolean`                                                              | false         |
| html             | 是否解析 markdown 中的 HTML 标签                                                                                                                                           | `boolean`                                                              | true          |
| sanitize         | 是否对生成结果中的 HTML 标签进行净化。支持布尔值或者 [DOMPurify 配置](https://github.com/cure53/DOMPurify?tab=readme-ov-file#can-i-configure-dompurify)                    | `boolean` / `SanitizeOptions`                                          | true          |
| xhtmlOut         | 是否生成符合 XHTML 标准的结果                                                                                                                                              | `boolean`                                                              | false         |
| breaks           | 是否将 `\n` 解析为 `<br>` 标签                                                                                                                                             | `boolean`                                                              | false         |
| highlight        | 是否启用代码块语法高亮                                                                                                                                                     | `boolean` / `(str: string, lang: string, attrs: string) => string`     | true          |
| highlightOptions | 代码块语法高亮配置，仅在 `highlight` 为 `true` 时生效。详情请参考 [highlight.js 配置](https://highlightjs.readthedocs.io/en/latest/api.html?highlight=configure#configure) | `HLJSOptions`                                                          | -             |
| langPrefix       | 代码块样式名前缀                                                                                                                                                           | `string`                                                               | language-     |
| linkify          | 是否将类似 url 的文本转换为链接                                                                                                                                            | `boolean`                                                              | false         |
| typographer      | 是否将特定文本替换为[常见的符号](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs)                                                   | `boolean`                                                              | false         |
| quotes           | 自定义引号，仅在 `typographer` 开启时生效                                                                                                                                  | `string` / `Array<string>`                                             | “”‘’          |
| emoji            | 是否将特定文本解析为 emoji 表情。支持布尔值或者 [markdown-it-emoji 配置](https://github.com/markdown-it/markdown-it-emoji#init)                                            | `boolean` / `EmojiOptions`                                             | true          |
| anchor           | 标题渲染配置。支持布尔值、[markdown-it-anchor 配置](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#usage)或函数                                  | `boolean` / `AnchorOptions` / `(anchor: Anchor) => AnchorOptions`      | true          |
| permalink        | 是否开启标题永久链接，仅在 `anchor` 为 `true` 时生效                                                                                                                       | `boolean`                                                              | true          |
| markdownClass    | 自定义 markdown 样式名                                                                                                                                                     | `string`                                                               | markdown-body |

### 事件

| 事件名    | 说明                                   | 回调参数 |
| --------- | -------------------------------------- | -------- |
| envChange | 当 `markdown-it` 中的 `env` 变化时触发 | {}       |

### 方法

| 方法名     | 说明                            | 类型         |
| ---------- | ------------------------------- | ------------ |
| mdInstance | 获取组件内部 `markdown-it` 实例 | `MarkdownIt` |
| htmlStr    | 获取渲染结果的字符串            | `string`     |

<!-- ### 类型定义

```ts [type.ts]
import type { PluginSimple, PluginWithParams, SanitizeOptions } from 'vue-markdown-design'
``` -->
