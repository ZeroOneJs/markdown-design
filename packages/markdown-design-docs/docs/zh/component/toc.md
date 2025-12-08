# TOC

## 基础用法

通过 `target` 可以指定生成目录的目标元素，支持 `CSS 选择器`、`DOM 元素`、`组件实例` 或者返回以上任意一种类型的 `函数`，默认为整个文档，即 `document.documentElement`。

::: demo
toc/Basic.vue
:::

## 纯文本目录

使用 `plain-text` 可以生成纯文本目录，此时点击目录不会触发锚点跳转。

::: demo
toc/PlainText.vue
:::

## 直接使用 markdown 文本

通过 `markdown` 可以直接使用 markdown 文本来生成纯文本目录。如果 `target` 和 `markdown` 同时传参，会优先渲染 `target` 中的内容

::: demo
toc/Markdown.vue
:::

## 有序目录

使用 `ordered-list` 可以生成有序目录

::: demo
toc/OrderedList.vue
:::

## 目录获取的范围

通过 `start-level` 和 `end-level` 设置开始结束标题级别，来控制目录获取的范围。

::: demo
toc/Level.vue
:::

## 忽略指定目录

通过 `ignore` 设置忽略的标题级别，可以在目录生成时，过滤指定的目录

::: demo
toc/Ignore.vue
:::

## 空目录文本

使用 `empty-text` 可以自定义目录为空时的文本。

::: demo
toc/EmptyText.vue
:::

## 滚动距离偏移量

当点击目录触发锚点跳转时，可以通过 `offset` 设置滚动的偏移量，支持数值和字符串位置（包含 `center`、`start`、`end`、`nearest`）。当组件嵌套在多层滚动容器中时，滚动效果和偏移量只对离它最近的滚动容器生效

::: demo
toc/Offset.vue
:::

## 平滑滚动

使用 `smooth` 可以开启平滑滚动。

::: demo
toc/Smooth.vue
:::

## 改变页面 hash

当点击目录触发锚点跳转时，可以通过 `change-hash` 来设置是否改变页面的 hash。

::: demo
toc/ChangeHash.vue
:::

## 自定义目录项内容

通过设置 `item` 插槽可以自定义目录项的内容。

::: demo
toc/Slot.vue
:::

## API

### Props

| 属性名       | 说明                                      | 类型                                                                                   | 默认值                   |
| ------------ | ----------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------ |
| target       | 生成目录的目标元素                        | `string` / `HTMLElement` / `VueInstance` / `()=> string \| HTMLElement \| VueInstance` | document.documentElement |
| plain-text   | 是否生成纯文本目录                        | `boolean`                                                                              | false                    |
| markdown     | markdown 文本，可以根据内容生成纯文本目录 | `string`                                                                               | ''                       |
| ordered-list | 是否生成有序目录                          | `boolean`                                                                              | false                    |
| start-level  | 目录获取的开始标题级别                    | `number` / `string`                                                                    | 1                        |
| end-level    | 目录获取的结束标题级别                    | `number` / `string`                                                                    | 6                        |
| ignore       | 忽略的标题级别                            | `Array<number \| string>`                                                              | []                       |
| empty-text   | 目录为空时的文本                          | `string`                                                                               | No Data                  |
| offset       | 锚点跳转时的滚动偏移量                    | `number` / `'start'\|'end'\|'center'\|'nearest'`                                       | start                    |
| smooth       | 是否开启平滑滚动                          | `boolean`                                                                              | false                    |
| change-hash  | 锚点跳转时是否改变页面的 hash             | `boolean`                                                                              | true                     |

### 事件

| 事件名 | 说明               | 回调参数           |
| ------ | ------------------ | ------------------ |
| click  | 点击目录时触发     | tocItem: `TOCItem` |
| change | 选中目录改变时触发 | id: `string`       |

### Expose

| 方法名   | 说明           | 类型                     |
| -------- | -------------- | ------------------------ |
| refresh  | 重新生成目录   | `() => void`             |
| scrollTo | 滚动到指定标题 | `(href: string) => void` |

### Slots

| 插槽名 | 说明             | 参数               |
| ------ | ---------------- | ------------------ |
| item   | 自定义目录项内容 | tocItem: `TOCItem` |

### TOCItem 数据结构

| 属性名        | 说明                                                     | 类型      |
| ------------- | -------------------------------------------------------- | --------- |
| id            | 目录的唯一标识                                           | `string`  |
| level         | 当前目录的标题级别                                       | `number`  |
| relativeLevel | 相对于 `start-level` 的标题级别，始终从0开始计算标题级别 | `number`  |
| text          | 目录的文本内容                                           | `string`  |
| isActive      | 当前目录是否被选中                                       | `boolean` |
| top           | 对应标题的滚动位置                                       | `number`  |
