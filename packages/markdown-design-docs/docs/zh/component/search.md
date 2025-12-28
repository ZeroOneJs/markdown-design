<script setup>
// import { initScrollTop } from '../../.vitepress/utils/initScrollTop'

// initScrollTop() // 屏蔽文档中某些组件初始化时改变 scrollTop
</script>

# Search

为指定的 Markdown 渲染内容提供全文搜索功能。

## 基础用法

通过 `target` 可以指定搜索的目标元素，支持 `CSS 选择器`、`DOM 元素`、`组件实例` 或者返回以上任意一种类型的 `函数`。并且可以通过 `v-model` 绑定搜索内容，内容如果存在则会自动滚动到所在位置并高亮标记。

::: demo
search/Basic.vue
:::

## 一键清空

使用 `clearable` 可以在搜索框中显示清空按钮，点击可以一键清空搜索内容。

::: demo
search/Clearable.vue
:::

## 关闭按钮

使用 `close-icon` 可以显示关闭按钮，点击后会触发 `close` 事件。

::: demo
search/CloseIcon.vue
:::

## 边框样式

使用 `border` 可以显示搜索框下边框。

::: demo
search/Border.vue
:::

## 搜索框尺寸

使用 `size` 可以设置搜索框尺寸，支持 `huge`、`large`、`normal`、`small` 四种尺寸。

::: demo
search/Size.vue
:::

## 禁用搜索框

使用 `disabled` 可以禁用搜索框，禁用状态下无法进行搜索等操作。

::: demo
search/Disabled.vue
:::

## 占位文本

使用 `placeholder` 可以自定义搜索框占位文本。

::: demo
search/Placeholder.vue
:::

## 滚动距离偏移量

当搜索框切换索引触发内容跳转时，可以通过 `offset` 设置滚动的偏移量，支持数值和字符串位置（包含 `center`、`start`、`end`、`nearest`）。当组件嵌套在多层滚动容器中时，滚动效果和偏移量只对离它最近的滚动容器生效。

::: tip 提示
搜索框的滚动模式采用的是 [if-needed](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoViewIfNeeded) 模式。简而言之，只有当下一个索引超出可视区域时才会触发滚动效果。
:::

::: demo
search/Offset.vue
:::

## 平滑滚动

使用 `smooth` 可以在内容跳转时开启平滑滚动。

::: demo
search/Smooth.vue
:::

## 输入框原生属性

通过 `input-attrs` 将属性传递给组件内部的 input 元素。

::: demo
search/InputAttrs.vue
:::

## 切换当前索引

通过 `toggle` 方法可以手动切换当前索引。该方法接收两个参数：第一个参数为指定索引值，可以传入数值和字符串（包含 `prev` 和 `next`），它会自动处理越界索引，并通过 `index-change` 返回安全的索引值；第二个参数可以指定是否忽略搜索框禁用状态，默认为 `true`，即在搜索框禁用状态下调用 `toggle` 方法依然可以触发索引值切换。

::: demo
search/Toggle.vue
:::

## 手动刷新

通过 `refresh` 方法可以手动刷新搜索结果。该方法接收一个布尔值，默认为 `true`，表示在重新获取搜索结果的同时重置索引值。

::: tip 提示
如果您使用 [Render](./render.md) 组件实例作为搜索目标元素，大部分情况下不需要手动刷新，因为 Search 组件会在内容变化时自动刷新搜索结果。
:::

::: demo
search/Refresh.vue
:::

## API

### Props

| 属性名      | 说明                                    | 类型                                                                                   | 默认值 |
| ----------- | --------------------------------------- | -------------------------------------------------------------------------------------- | ------ |
| v-model     | 搜索内容                                | `string` / `number`                                                                    | ''     |
| target      | 搜索目标元素                            | `string` / `HTMLElement` / `VueInstance` / `()=> string \| HTMLElement \| VueInstance` | -      |
| clearable   | 是否显示搜索框清空按钮                  | `boolean`                                                                              | true   |
| close-icon  | 是否显示搜索框关闭按钮                  | `boolean`                                                                              | true   |
| border      | 是否显示搜索框下边框                    | `boolean`                                                                              | true   |
| size        | 搜索框尺寸                              | `'huge' \| 'large' \| 'normal' \| 'small'`                                             | huge   |
| disabled    | 是否禁用搜索框                          | `boolean`                                                                              | false  |
| placeholder | 搜索框占位文本                          | `string`                                                                               | -      |
| offset      | 搜索框切换索引时的滚动偏移量            | `number` / `'start'\|'end'\|'center'\|'nearest'`                                       | center |
| smooth      | 是否开启搜索在内容跳转时的平滑滚动      | `boolean`                                                                              | false  |
| input-attrs | 传递给搜索框内部 `input` 元素的原生属性 | `object`                                                                               | {}     |

### 事件

| 事件名       | 说明                               | 回调参数                  |
| ------------ | ---------------------------------- | ------------------------- |
| input        | 搜索框内容变化时触发               | event: `Event`            |
| blur         | 搜索框失去焦点时触发               | event: `FocusEvent`       |
| focus        | 搜索框获得焦点时触发               | event: `FocusEvent`       |
| change       | 仅在搜索框失焦或按下回车时触发     | event: `Event`            |
| clear        | 点击搜索框清除按钮时触发           | -                         |
| close        | 点击搜索框关闭按钮时触发           | -                         |
| step-click   | 点击搜索框上一项或下一项按钮时触发 | value: `'prev' \| 'next'` |
| total-change | 搜索匹配总数变化时触发             | value: `number`           |
| index-change | 当前索引值变化时触发               | value: `number`           |

### 方法

| 方法名  | 说明               | 类型                                                                    |
| ------- | ------------------ | ----------------------------------------------------------------------- |
| focus   | 使搜索框获得焦点   | `() => void`                                                            |
| blur    | 使搜索框失去焦点   | `() => void`                                                            |
| clear   | 清空搜索内容       | `() => void`                                                            |
| toggle  | 切换当前搜索索引值 | `(index: number \| 'prev' \| 'next', ignoreDisabled?: boolean) => void` |
| refresh | 手动刷新搜索结果   | `(resetIndex?: boolean) => void`                                        |
