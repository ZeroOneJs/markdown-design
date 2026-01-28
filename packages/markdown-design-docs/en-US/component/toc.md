# Toc

Generates a table of contents for the rendered Markdown.

## Basic Usage

Use `target` to specify the element to generate the TOC. It supports `CSS selector`, `DOM element`, `component instance`, or a `function` that returns any of these. The default is `document.documentElement`.

::: demo
toc/Basic
:::

## Plain Text

Use `plain-text` to generate a plain-text TOC. In this mode, clicking items will not trigger anchor scrolling.

::: demo
toc/PlainText
:::

## Use Markdown Directly

Use `markdown` to generate a plain-text TOC directly from Markdown. If both `target` and `markdown` are provided, `target` takes precedence.

::: demo
toc/Markdown
:::

## Ordered List

Use `ordered-list` to generate an ordered TOC.

::: demo
toc/OrderedList
:::

## Heading Level Range

Use `start-level` and `end-level` to control the heading level range used to build the TOC.

::: demo
toc/Level
:::

## Ignore Headings

Use `ignore` to ignore specific heading levels when generating the TOC.

::: demo
toc/Ignore
:::

## Empty Text

Use `empty-text` to customize the text displayed when the TOC is empty.

::: demo
toc/EmptyText
:::

## Scroll Offset

When clicking a TOC item triggers anchor scrolling, you can use `offset` to adjust the scroll position. It supports numbers and string positions (`center`, `start`, `end`, `nearest`). When the component is nested inside multiple scroll containers, the scroll behavior and offset only apply to the nearest scroll container.

::: demo
toc/Offset
:::

## Smooth Scrolling

Use `smooth` to enable smooth scrolling during anchor navigation.

::: demo
toc/Smooth
:::

## Update Page Hash

When clicking a TOC item triggers anchor navigation, you can use `change-hash` to control whether the page hash is updated.

::: demo
toc/ChangeHash
:::

## Manual Refresh

Use the `refresh` method to refresh the generated TOC manually.

::: tip
If you use a [Render](./render.md) component instance as the TOC target, manual refresh is usually unnecessary because Toc automatically refreshes when the content changes.
:::

::: demo
toc/Refresh
:::

## Custom TOC Item

Use the `item` slot to customize TOC items.

::: demo
toc/Slot
:::

## API

### Props

| Name         | Description                                                    | Type                                                                                   | Default                  |
| ------------ | -------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------ |
| target       | The target element used to build the TOC                       | `string` / `HTMLElement` / `VueInstance` / `()=> string \| HTMLElement \| VueInstance` | document.documentElement |
| plain-text   | Whether to generate a plain-text TOC                           | `boolean`                                                                              | false                    |
| markdown     | Generate a plain-text TOC from Markdown                        | `string`                                                                               | ''                       |
| ordered-list | Whether to generate an ordered TOC                             | `boolean`                                                                              | false                    |
| start-level  | Start heading level for the TOC                                | `number` / `string`                                                                    | 1                        |
| end-level    | End heading level for the TOC                                  | `number` / `string`                                                                    | 6                        |
| ignore       | Heading levels to ignore in the TOC                            | `Array<number \| string>`                                                              | []                       |
| empty-text   | Text displayed when the TOC is empty                           | `string`                                                                               | No Data                  |
| offset       | Scroll offset during TOC anchor navigation                     | `number` / `'start'\|'end'\|'center'\|'nearest'`                                       | start                    |
| smooth       | Whether to enable smooth scrolling when navigating via the TOC | `boolean`                                                                              | false                    |
| change-hash  | Whether to update the page hash when navigating via the TOC    | `boolean`                                                                              | true                     |

### Events

| Name   | Description                                                                | Arguments          |
| ------ | -------------------------------------------------------------------------- | ------------------ |
| click  | Triggered when clicking a TOC item. For arguments, see [TocItem](#tocitem) | tocItem: `TocItem` |
| change | Triggered when the active TOC item changes                                 | id: `string`       |

### Expose

| Name     | Description                          | Type                     |
| -------- | ------------------------------------ | ------------------------ |
| scrollTo | Scroll to a given heading in the TOC | `(href: string) => void` |
| refresh  | Regenerate the TOC                   | `() => void`             |

### Slots

| Name | Description                                                          | SlotProps          |
| ---- | -------------------------------------------------------------------- | ------------------ |
| item | Customize TOC item content. For slot props, see [TocItem](#tocitem). | tocItem: `TocItem` |

### TocItem

| Key           | Description                                                    | Type      |
| ------------- | -------------------------------------------------------------- | --------- |
| id            | Unique ID for the TOC item                                     | `string`  |
| level         | Heading level                                                  | `number`  |
| relativeLevel | Heading level relative to `start-level`, always starting at 0  | `number`  |
| text          | Text content of the TOC item                                   | `string`  |
| isActive      | Whether the item is active                                     | `boolean` |
| top           | Scroll position of the corresponding heading                   | `number`  |
