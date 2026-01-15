# Markdown

为 Markdown 提供实时渲染，目录生成和全文搜索等功能。

## 基础用法

通过 `src` 传入 Markdown 字符串，渲染对应的 HTML 内容。

::: demo
markdown/Basic
:::

## 解析 HTML 标签

使用 `html` 可以控制是否解析 Markdown 中的 HTML 标签。

::: demo
markdown/Html
:::

## HTML 标签安全过滤

使用 `sanitize` 可以对生成结果中的 HTML 标签进行安全过滤，以预防 XSS 等网络攻击。开启 `sanitize` 可能会影响 HTML 标签的生成效果，如果最终结果不符合预期且您对安全性要求较低，可以尝试关闭 `sanitize` 选项，但请注意这是非常危险的行为。如果您对安全性要求比较高，建议直接关闭 `html` 选项。

::: demo
markdown/Sanitize
:::

## 常用预设规则

使用 `preset-name` 可以快捷地设置 Markdown 规则。内置三种常用规则：
[default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs) 规则，类似 GFM；[commonmark](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) 规则，详情[请看](https://commonmark.org/)；[zero](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs) 规则，所有规则都不会启用。

::: tip 提示
和 `markdown-it` 的 default 规则稍有不同，这里的 `html` 选项默认是开启的。
:::

::: demo
markdown/PresetName
:::

## markdown-it 插件

通过 `plugins` 可以传入 `markdown-it` 插件。支持两种传参方式：第一种是直接传入单个插件。第二种可通过数组传入多个插件，数组中的每一项可以是单个插件，也可以是插件和参数组成的数组（如：`[插件, [插件, 参数1, 参数2, ...], ...]`）。

::: demo
markdown/Plugins
:::

## 代码块语法高亮

使用 `highlight` 可以将 Markdown 中的代码块根据其编程语言进行语法高亮。当传入布尔值时，会使用 [highlight.js](https://highlightjs.org/) 作为语法高亮工具，此时您可以通过 `highlight-options` 来配置它，详细配置[请参考](https://highlightjs.readthedocs.io/en/latest/api.html#configure)。当默认语法高亮无法满足需求时，`highlight` 也支持通过函数来自定义高亮语法规则。

::: demo
markdown/Highlight
:::

## 自定义语法高亮样式

通过 `lang-prefix` 修改代码块样式名前缀来自定义语法高亮样式。

::: demo
markdown/LangPrefix
:::

## 自动转换链接

使用 `linkify` 可以将 Markdown 中类似 url 的文本转换为链接。

::: demo
markdown/Linkify
:::

## 常见符号处理

使用 `typographer` 可以将 Markdown 中的一些特定文本替换为[常见的符号](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs)。当 `typographer` 开启时，还可以通过 `quotes` 自定义引号，这在多语言环境中非常实用。

::: demo
markdown/Typographer
:::

## Emoji 表情

通过 `emoji` 可以将 Markdown 中的[特定文本](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)解析为 Emoji 表情。除了支持布尔值传参外，还可以通过传入对象来配置 Emoji 表情，详细配置[请参考](https://github.com/markdown-it/markdown-it-emoji?tab=readme-ov-file#init)。

::: demo
markdown/Emoji
:::

## 标题锚点

通过 `anchor` 可以为所有标题元素添加唯一标识符（ID），这可以帮助导航组件（如 [Toc](./toc.md) 组件）实现锚点定位。当开启 `anchor` 时会默认在所有标题前面添加永久链接，您可以通过 `permalink` 控制它的显示隐藏。`anchor` 还支持传入对象或函数来自定义标题的渲染，更多配置项[请参考](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#usage)。

::: demo
markdown/Anchor
:::

## 渲染更多配置

渲染功能支持丰富的配置，包括自定义 Markdown 样式、获取组件内部 `markdown-it` 实例、换行处理等。更多用法请参考 [Render 组件](./render)，其 [API](./render#api) 在 Markdown 组件中同样适用。

::: demo
markdown/RenderMore
:::

## 搜索

通过 `search` 可以开启搜索功能。并且可以通过 `keyword` 绑定搜索内容，内容如果存在则会自动滚动到所在位置并高亮标记。

::: demo
markdown/Search
:::

## 搜索更多配置

搜索功能支持丰富的配置，包括边框样式、尺寸设置、禁用状态等。更多用法请参考 [Search 组件](./search)，使用时只需在其 [API](./search#api) 前面添加 `search-` 前缀即可。

::: demo
markdown/SearchMore
:::

## 目录

通过 `toc` 可以开启目录功能，组件会根据渲染内容生成相应的目录。

::: demo
markdown/Toc
:::

## 目录更多配置

目录功能支持丰富的配置，包括纯文本目录、有序目录、目录范围等。更多用法请参考 [Toc 组件](./toc)，使用时只需在其 [API](./toc#api) 前面添加 `toc-` 前缀即可。

::: demo
markdown/TocMore
:::

## 交互按钮

通过 `show-btn` 可以在组件底部显示一组交互按钮，用于控制搜索和目录的显示隐藏。当传参为 `true` 时，默认显示搜索和目录按钮；当传参为数组或对象时，则可以自定义任意按钮的显示状态。

::: demo
markdown/ShowBtn
:::

## 粘性布局偏移量

所有辅助组件均采用粘性布局，可通过 `top-offset` 控制搜索框和目录的吸顶偏移量，通过 `bottom-offset` 控制交互按钮的吸底偏移量。当组件嵌套在多层滚动容器中时，粘性布局效果和偏移量只对离它最近的滚动容器生效。

::: demo
markdown/StickyOffset
:::

## 滚动距离偏移量

默认情况下，`top-offset` 的值会自动作为目录锚点跳转的滚动偏移量。如需单独设置目录偏移量，可使用 `toc-offset`。搜索切换索引的滚动偏移量则没有这种默认行为，需要通过 `search-offset` 单独设置。`toc-offset` 和 `search-offset` 均支持数值和字符串位置（包含 `center`、`start`、`end`、`nearest`）。当组件嵌套在多层滚动容器中时，滚动效果和偏移量只对离它最近的滚动容器生效。

::: tip 提示
当显示搜索框且 `toc-offset` 为数值或者 `start` 时，目录会自动叠加搜索框高度作为额外的滚动偏移量。
:::

::: demo
markdown/ScrollOffset
:::

## 移动端布局

通过 `mini-screen-width` 可以设置移动设备的宽度，当组件宽度小于或等于该值时，会自动切换为移动端布局。

::: demo
markdown/MiniScreenWidth
:::

## API

### Props

| 属性名             | 说明                                                                                                                                                                                                              | 类型                                                                             | 默认值        |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------- |
| src                | Markdown 字符串                                                                                                                                                                                                   | `string` / `number`                                                              | ''            |
| html               | 是否解析 Markdown 中的 HTML 标签                                                                                                                                                                                  | `boolean`                                                                        | true          |
| sanitize           | 是否对生成结果中的 HTML 标签进行安全过滤。支持布尔值或者 [DOMPurify 配置](https://github.com/cure53/DOMPurify?tab=readme-ov-file#can-i-configure-dompurify)                                                       | `boolean` / `SanitizeOptions`                                                    | true          |
| preset-name        | Markdown 预设规则                                                                                                                                                                                                 | `'default' \| 'commonmark' \| 'zero'`                                            | default       |
| plugins            | `markdown-it` 插件                                                                                                                                                                                                | `PluginSimple` / `Array<PluginSimple \| [PluginWithParams, ...any[]]>`           | []            |
| inline             | 是否启用单行模式                                                                                                                                                                                                  | `boolean`                                                                        | false         |
| xhtml-out          | 是否生成符合 XHTML 标准的结果                                                                                                                                                                                     | `boolean`                                                                        | false         |
| breaks             | 是否将 `\n` 解析为 `<br>` 标签                                                                                                                                                                                    | `boolean`                                                                        | false         |
| highlight          | 是否启用代码块语法高亮                                                                                                                                                                                            | `boolean` / `(str: string, lang: string, attrs: string) => string`               | true          |
| highlight-options  | 代码块语法高亮配置，仅在 `highlight` 为 `true` 时生效。详情请参考 [highlight.js 配置](https://highlightjs.readthedocs.io/en/latest/api.html?highlight=configure#configure)                                        | `HLJSOptions`                                                                    | -             |
| lang-prefix        | 代码块样式名前缀                                                                                                                                                                                                  | `string`                                                                         | language-     |
| linkify            | 是否将类似 url 的文本转换为链接                                                                                                                                                                                   | `boolean`                                                                        | false         |
| typographer        | 是否将特定文本替换为[常见的符号](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs)                                                                                          | `boolean`                                                                        | false         |
| quotes             | 自定义引号，仅在 `typographer` 开启时生效                                                                                                                                                                         | `string` / `Array<string>`                                                       | “”‘’          |
| emoji              | 是否将[特定文本](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)解析为 Emoji 表情。支持布尔值或者 [markdown-it-emoji 配置](https://github.com/markdown-it/markdown-it-emoji#init) | `boolean` / `EmojiOptions`                                                       | true          |
| anchor             | 标题渲染配置。支持布尔值、[markdown-it-anchor 配置](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#usage)或函数                                                                         | `boolean` / `AnchorOptions` / `(anchor: Anchor) => AnchorOptions`                | true          |
| permalink          | 是否开启标题永久链接，仅在 `anchor` 为 `true` 时生效                                                                                                                                                              | `boolean`                                                                        | true          |
| markdown-class     | 自定义 Markdown 样式名                                                                                                                                                                                            | `string`                                                                         | markdown-body |
| show-btn           | 是否显示底部交互按钮                                                                                                                                                                                              | `boolean` / `Array<('search' \| 'toc')>` / `{ search?: boolean; toc?: boolean }` | false         |
| top-offset         | 全局顶部偏移量，包括粘性布局的吸顶偏移量和目录锚点跳转的默认滚动偏移量                                                                                                                                            | `number` / `string`                                                              | 0             |
| bottom-offset      | 全局底部偏移量，用于粘性布局的吸底偏移量                                                                                                                                                                          | `number` / `string`                                                              | 0             |
| mini-screen-width  | 移动端宽度，当组件宽度小于或等于该值时，会切换为移动端布局                                                                                                                                                        | `number` / `string`                                                              | 768           |
| v-model:search     | 是否显示搜索框                                                                                                                                                                                                    | `boolean`                                                                        | false         |
| v-model:keyword    | 搜索内容                                                                                                                                                                                                          | `string` / `number`                                                              | ''            |
| search-clearable   | 是否显示搜索框清空按钮                                                                                                                                                                                            | `boolean`                                                                        | true          |
| search-close-icon  | 是否显示搜索框关闭按钮                                                                                                                                                                                            | `boolean`                                                                        | true          |
| search-border      | 是否显示搜索框下边框                                                                                                                                                                                              | `boolean`                                                                        | true          |
| search-size        | 搜索框尺寸                                                                                                                                                                                                        | `'huge' \| 'large' \| 'normal' \| 'small'`                                       | huge          |
| search-disabled    | 是否禁用搜索框                                                                                                                                                                                                    | `boolean`                                                                        | false         |
| search-placeholder | 搜索框占位文本                                                                                                                                                                                                    | `string`                                                                         | -             |
| search-offset      | 搜索框切换索引时的滚动偏移量                                                                                                                                                                                      | `number` / `'start'\|'end'\|'center'\|'nearest'`                                 | center        |
| search-smooth      | 是否开启搜索在内容跳转时的平滑滚动                                                                                                                                                                                | `boolean`                                                                        | false         |
| search-input-attrs | 传递给搜索框内部 `input` 元素的原生属性                                                                                                                                                                           | `object`                                                                         | {}            |
| v-model:toc        | 是否显示目录                                                                                                                                                                                                      | `boolean`                                                                        | false         |
| toc-plain-text     | 是否生成纯文本目录                                                                                                                                                                                                | `boolean`                                                                        | false         |
| toc-ordered-list   | 是否生成有序目录                                                                                                                                                                                                  | `boolean`                                                                        | false         |
| toc-start-level    | 目录获取的开始标题级别                                                                                                                                                                                            | `number` / `string`                                                              | 1             |
| toc-end-level      | 目录获取的结束标题级别                                                                                                                                                                                            | `number` / `string`                                                              | 6             |
| toc-ignore         | 目录忽略的标题级别                                                                                                                                                                                                | `Array<number \| string>`                                                        | []            |
| toc-empty-text     | 目录为空时的文本                                                                                                                                                                                                  | `string`                                                                         | No Data       |
| toc-offset         | 目录锚点跳转时的滚动偏移量                                                                                                                                                                                        | `number` / `'start'\|'end'\|'center'\|'nearest'`                                 | start         |
| toc-smooth         | 是否开启目录在锚点跳转时的平滑滚动                                                                                                                                                                                | `boolean`                                                                        | false         |
| toc-change-hash    | 目录锚点跳转时是否改变页面的 hash                                                                                                                                                                                 | `boolean`                                                                        | true          |

### Emits

| 事件名              | 说明                                                     | 回调参数                  |
| ------------------- | -------------------------------------------------------- | ------------------------- |
| env-change          | 当 `markdown-it` 中的 `env` 变化时触发                   | value: `{}`               |
| search-input        | 搜索框内容变化时触发                                     | event: `Event`            |
| search-blur         | 搜索框失去焦点时触发                                     | event: `FocusEvent`       |
| search-focus        | 搜索框获得焦点时触发                                     | event: `FocusEvent`       |
| search-change       | 仅在搜索框失焦或按下回车时触发                           | event: `Event`            |
| search-clear        | 点击搜索框清除按钮时触发                                 | -                         |
| search-close        | 点击搜索框关闭按钮时触发                                 | -                         |
| search-step-click   | 点击搜索框上一项或下一项按钮时触发                       | value: `'prev' \| 'next'` |
| search-total-change | 搜索匹配总数变化时触发                                   | value: `number`           |
| search-index-change | 当前搜索索引值变化时触发                                 | value: `number`           |
| toc-click           | 点击目录时触发，回调参数[请参考](./toc#tocitem-数据结构) | tocItem: `TocItem`        |
| toc-change          | 选中目录改变时触发                                       | id: `string`              |

### Expose

| 方法名        | 说明                            | 类型                                                                    |
| ------------- | ------------------------------- | ----------------------------------------------------------------------- |
| mdInstance    | 获取组件内部 `markdown-it` 实例 | `MarkdownIt`                                                            |
| htmlStr       | 获取解析结果的字符串            | `string`                                                                |
| searchFocus   | 使搜索框获得焦点                | `() => void`                                                            |
| searchBlur    | 使搜索框失去焦点                | `() => void`                                                            |
| searchClear   | 清空搜索内容                    | `() => void`                                                            |
| searchToggle  | 切换当前搜索索引值              | `(index: number \| 'prev' \| 'next', ignoreDisabled?: boolean) => void` |
| searchRefresh | 手动刷新搜索结果                | `(resetIndex?: boolean) => void`                                        |
| tocScrollTo   | 滚动到指定标题                  | `(href: string) => void`                                                |
| tocRefresh    | 重新生成目录                    | `() => void`                                                            |
