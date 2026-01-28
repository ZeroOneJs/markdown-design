# Search

Provides full-text search for the rendered Markdown.

## Basic Usage

Use `target` to specify the element to search. It supports `CSS selector`, `DOM element`, `component instance`, or a `function` that returns any of these. You can also bind the keyword via `v-model`. When the keyword matches the content, it automatically scrolls to the match and highlights it.

::: demo
search/Basic
:::

## Clearable

Use `clearable` to show a clear button in the search. Click it to clear the keyword.

::: demo
search/Clearable
:::

## Close Button

Use `close-icon` to show a close button. Clicking it triggers the `close` event.

::: demo
search/CloseIcon
:::

## Border

Use `border` to show the bottom border of the search input.

::: demo
search/Border
:::

## Size

Use `size` to set the search size. It supports `huge`, `large`, `normal`, and `small`.

::: demo
search/Size
:::

## Disabled

Use `disabled` to disable the search. When disabled, searching and related actions are unavailable.

::: demo
search/Disabled
:::

## Placeholder

Use `placeholder` to customize the placeholder text of the search input.

::: demo
search/Placeholder
:::

## Scroll Offset

When switching between matches triggers scrolling, you can set `offset` to adjust the scroll position. It supports numbers and string positions (`center`, `start`, `end`, `nearest`). When the component is nested inside multiple scroll containers, the scroll behavior and offset only apply to the nearest scroll container.

::: tip
The scrolling mode is [if-needed](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded). In short, scrolling only happens when the next match is outside the visible area.
:::

::: demo
search/Offset
:::

## Smooth Scrolling

Use `smooth` to enable smooth scrolling when navigating to matches.

::: demo
search/Smooth
:::

## Input Attributes

Use `input-attrs` to pass attributes to the internal input element.

::: demo
search/InputAttrs
:::

## Toggle Current Match

Use the `toggle` method to manually switch the current match index. It accepts two parameters: the first is the target index (a number or a string: `prev` / `next`). It automatically clamps out-of-range values and returns a safe index via `index-change`. The second parameter controls whether to ignore the disabled state. It defaults to `true`, meaning `toggle` can still switch the index even when the search is disabled.

::: demo
search/Toggle
:::

## Manual Refresh

Use the `refresh` method to refresh search results manually. It accepts a boolean parameter that defaults to `true`, indicating that the current index will be reset while refreshing results.

::: tip
If you use a [Render](./render.md) component instance as the search target, manual refresh is usually unnecessary because Search automatically refreshes when the content changes.
:::

::: demo
search/Refresh
:::

## API

### Props

| Name        | Description                                                               | Type                                                                                   | Default |
| ----------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------- |
| v-model     | Search keyword                                                            | `string` / `number`                                                                    | ''      |
| target      | Search target element                                                     | `string` / `HTMLElement` / `VueInstance` / `()=> string \| HTMLElement \| VueInstance` | -       |
| clearable   | Whether to show the clear button in the search                            | `boolean`                                                                              | true    |
| close-icon  | Whether to show the close button in the search                            | `boolean`                                                                              | true    |
| border      | Whether to show the bottom border of the search                           | `boolean`                                                                              | true    |
| size        | Search input size                                                         | `'huge' \| 'large' \| 'normal' \| 'small'`                                             | huge    |
| disabled    | Whether to disable the search                                             | `boolean`                                                                              | false   |
| placeholder | Search input placeholder text                                             | `string`                                                                               | -       |
| offset      | Scroll offset when switching the search match index                       | `number` / `'start'\|'end'\|'center'\|'nearest'`                                       | center  |
| smooth      | Whether to enable smooth scrolling when navigating between search matches | `boolean`                                                                              | false   |
| input-attrs | Attributes passed to the internal search input element                    | `object`                                                                               | {}      |

### Events

| Name         | Description                                                    | Arguments                 |
| ------------ | -------------------------------------------------------------- | ------------------------- |
| input        | Triggered when the search keyword changes                      | event: `Event`            |
| blur         | Triggered when the search input loses focus                    | event: `FocusEvent`       |
| focus        | Triggered when the search input gains focus                    | event: `FocusEvent`       |
| change       | Triggered only when the search input blurs or Enter is pressed | event: `Event`            |
| clear        | Triggered when clicking the search clear button                | -                         |
| close        | Triggered when clicking the search close button                | -                         |
| step-click   | Triggered when clicking the search previous/next buttons       | value: `'prev' \| 'next'` |
| total-change | Triggered when the total search match count changes            | value: `number`           |
| index-change | Triggered when the current search match index changes          | value: `number`           |

### Methods

| Name    | Description                           | Type                                                                    |
| ------- | ------------------------------------- | ----------------------------------------------------------------------- |
| focus   | Focus the search input                | `() => void`                                                            |
| blur    | Blur the search input                 | `() => void`                                                            |
| clear   | Clear the search keyword              | `() => void`                                                            |
| toggle  | Switch the current search match index | `(index: number \| 'prev' \| 'next', ignoreDisabled?: boolean) => void` |
| refresh | Refresh search results manually       | `(resetIndex?: boolean) => void`                                        |
