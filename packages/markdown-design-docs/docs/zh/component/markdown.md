<script setup>
import { initScrollTop } from '../../.vitepress/utils/initScrollTop'

initScrollTop() // 屏蔽文档中某些组件初始化时改变 scrollTop
</script>

# Markdown

## 基本用法

::: demo
markdown/Basic.vue
:::

## 单行文本

使用 `inline` 可以使生成的结果不会被包装到 `<p>` 标签中。

::: demo
markdown/Inline.vue
:::

## 预设模式

使用 `presetName` 可以方便快捷地启用/禁用markdown语法规则，分别提供以下三种预设模式：

[default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs)：默认模式，类似GFM。
[commonmark](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs)：[CommonMark](https://commonmark.org/)模式。
[zero](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs)：禁用所有语法规则

::: tip 提示
这里的 html 选项都是默认开启的，和 markdown-it 的预设模式稍有不同
:::

::: demo
markdown/PresetName.vue
:::

## 自定义 markdown 样式

组件默认使用 [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) 作为 markdown 的样式，你可以通过 markdownClass 来自定义你的样式

::: demo
markdown/MarkdownClass.vue
:::

## XSS 过滤

使用 sanitize 可以对 markdown中的 html 标签进行过滤。由于是基于 dompurify 实现的过滤，因此可能会影响 html 标签部分的生成效果。如果这种结果不符合你的预期且你对安全性要求较低，可以尝试关闭sanitize选项，但这里不建议这么做，因为这种方式很容易受到 XSS 攻击。如果你对安全性要求比较高，建议将 html 选项关闭

::: demo
markdown/Sanitize.vue
:::

## 代码高亮

通过 highlight 传入布尔值开启/禁用代码高亮，或者传入函数来自定义代码高亮样式。组件默认使用 highlight.js 作为代码高亮样式，可以通过 highlightOptions 来配置highlight.js，更多配置[请参考](https://highlightjs.readthedocs.io/en/latest/api.html#configure)。

::: demo
markdown/Highlight.vue
:::

## emoji 表情

内置 [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji) 插件，可通过 emoji 传入布尔值来开启/禁用emoji，或者传入对象来配置markdown-it-emoji，详细配置项[请参考](https://github.com/markdown-it/markdown-it-emoji?tab=readme-ov-file#init)

::: demo
markdown/Emoji.vue
:::

## 永久链接

组件在所有标题前面都会添加永久链接，可以通过 permalink 来启用/禁用生成永久链接。

如果你想自定义永久链接，可以通过 anchor 来实现，这个属性是基于 markdown-it-anchor 插件来实现的，可以传入对象或者函数来配置 markdown-it-anchor 插件，更多配置项[请参考](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#overview)。该属性也支持布尔值，可以开启/禁用标题生成对应id以供锚点定位。

::: tip 提示
当 anchor 为禁用状态时，VmdTOC 组件将无法实现锚点跳转，此时将生成纯文本目录
:::
::: tip 提示
当通过 anchor 自定义永久链接或者禁用 anchor 时，permalink配置将失效。
:::

::: demo
markdown/Anchor.vue
:::

## markdown-it 插件

通过 `plugins` 可以传入 markdown-it 插件。由于组件底层是基于 markdown-it 实现的，所以理论上能兼容markdown-it 大部分插

::: demo
markdown/Plugins.vue
:::

## 获取 markdown-it 实例

通过 mdInstance 可以获取 markdown-it 实例，可以为 markdown 的生成提供更灵活的操作。

::: demo
markdown/MdInstance.vue
:::

## 更多配置

以上介绍的配置都是继承自 VmdRender 组件的同名配置，因此 VmdRender 组件的所有配置在该组件中同样适用，更多配置请参考 VmdRender

::: tip 提示
vue-markdown 和 VmdRender 组件的区别在于， VmdRender 只拥有单纯的 markdown 渲染功能，而 vue-markdown 除拥有同样的 markdown 渲染功能外，还有集成搜索和目录等功能
:::

::: demo
markdown/More.vue
:::

## 搜索

使用 `search` 来显示和隐藏搜索栏，并且可以通过 `keyword` 来传入关键字或者接收搜索框输入的关键字。

::: demo
markdown/Search.vue
:::

## 切换选中关键字

除了支持按钮切换选中的关键字，还可通过 `searchToggle` 方法实现手动触发。

该方法接收两个参数，第一个参数为指定索引值，可以传入数值/`prev`（上一个）/`next`（下一个），它会自动处理越界索引，并通过 `searchIndexChange` 返回安全的索引值；第二个参数可以检查当前搜索栏是否禁用，若禁用则阻止切换。

::: demo
markdown/SearchToggle.vue
:::

## 更多搜索配置

## 目录

组件会根据内容自动生成目录，可以使用 `toc` 来显示和隐藏目录

::: demo
markdown/TOC.vue
:::

## 更多目录配置

## 显示按钮

使用 `showBtn` 可以在组件中显示一组按钮，用户可以通过点击按钮来切换搜索/目录的显示隐藏。

支持使用布尔值统一控制按钮的状态，或数组和对象精确控制搜索/目录按钮各自的状态。

::: demo
markdown/ShowBtn.vue
:::

## 粘性布局偏移量

很多辅助组件都采用粘性布局，使用 `topOffset` 可以控制搜索栏和目录的吸顶距离，使用 `bottomOffset` 可以控制按钮的吸底距离

::: tip 提示
当遇到多个滚动布局层层嵌套时，该偏移量只对最内层元素有效
:::

::: demo
markdown/StickyOffset.vue
:::

## 滚动距离偏移量

`topOffset` 同样也对点击目录产生的滚动偏移量有效果，但是面对多个滚动布局层层嵌套时，由于`topOffset`只针对最内层的滚动元素有效果，这时就要使用 `tocOffset` 来单独对目录的滚动距离设置偏移量，他可以接受数值、对应位置（"center" | "end" | "nearest" | "start"）和函数。针对搜索滚动也有对应的`searchOffset`。

当参数为数值时，`topOffset` 、 `tocOffset` 和 `searchOffset` 设置相同值时产生的滚动偏移量效果是一致的，三者的区别在于，`tocOffset`（目录）和`searchOffset`（搜索）关注的是各自组件的滚动偏移量，而`topOffset`关注的是目录滚动时的默认偏移量和所有粘性布局组件的吸顶偏移量

当参数为函数时，组件会将每层滚动对象传递给函数，此时可根据对应的滚动对象返回相应的偏移量数值。

::: tip 提示
当目录和搜索同时开启时，目录会自动根据搜索栏的高度加上相应的滚动偏移量
:::

::: demo
markdown/OffsetWhenNumber.vue
:::

::: demo
markdown/OffsetWhenScrollLogicalPosition.vue
:::

::: demo
markdown/OffsetWhenFunction.vue
:::

## 移动端布局

使用 `miniScreenWidth` 来设置移动设备的宽度，当屏幕宽度小于该值时，组件会自动切换为移动端布局

::: demo
markdown/MiniScreenWidth.vue
:::

<!-- ## Placeholder

::: demo
markdown/Placeholder.vue
:::

## Disabled

::: demo
markdown/Disabled.vue
:::

## Size

::: demo
markdown/Size.vue
:::

## Border

::: demo
markdown/Border.vue
:::

## clearable

::: demo
markdown/Clearable.vue
:::

## markdownClass

::: demo
markdown/MarkdownClass.vue
:::

## permalink

::: demo
markdown/Anchor.vue
:::

## anchor

::: demo
markdown/Anchor.vue
:::





## sanitize

::: demo
markdown/Sanitize.vue
:::

## plugins

::: demo
markdown/Plugins.vue
:::

## showBtn/offsetBottom

::: demo
markdown/OffsetBottom.vue
:::



## markdown-it 配置 inline/preset/html/xhtmlOut/breaks/langPrefix/linkify/typographer/quotes -->
