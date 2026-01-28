# Markdown

Provides real-time Markdown rendering, table of contents generation, and full-text search.

## Basic Usage

Use `src` to pass a Markdown string and render the corresponding HTML output.

::: demo
markdown/Basic
:::

## Parse HTML Tags

Use `html` to control whether HTML tags inside Markdown are parsed.

::: demo
markdown/Html
:::

## Sanitize HTML Tags

Use `sanitize` to sanitize HTML tags in the output to prevent XSS and other web attacks. Enabling `sanitize` may affect how some HTML tags are rendered. If the result is not what you expect and your security requirements are low, you can try disabling `sanitize`, but this is extremely risky. If you have strict security requirements, consider disabling `html` instead.

::: demo
markdown/Sanitize
:::

## Preset Name

Use `preset-name` to quickly switch Markdown syntax rules. Three commonly used presets are built in:
[default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs) (similar to GFM), [commonmark](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) (see [CommonMark](https://commonmark.org/)), and [zero](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs) (disables all syntax rules).

::: tip
Compared to markdown-it's default preset, the `html` option is enabled by default here.
:::

::: demo
markdown/PresetName
:::

## markdown-it Plugins

Use `plugins` to pass markdown-it plugins. Two forms are supported: pass a single plugin directly, or pass an array of plugins where each item can be a plugin or a plugin-with-params tuple (e.g., `[plugin, [plugin, param1, param2, ...], ...]`).

::: demo
markdown/Plugins
:::

## Syntax Highlighting

Use `highlight` to syntax-highlight fenced code blocks based on their language. When a boolean is provided, [highlight.js](https://highlightjs.org/) is used as the syntax highlighter and can be configured via `highlight-options` (see [highlight.js configuration](https://highlightjs.readthedocs.io/en/latest/api.html#configure)). If the default highlighting is not enough, `highlight` also supports providing a function to customize highlighting.

::: demo
markdown/Highlight
:::

## Custom Highlight Class

Use `lang-prefix` to change the CSS class prefix used for code blocks, so you can customize highlight styles.

::: demo
markdown/LangPrefix
:::

## Linkify

Use `linkify` to automatically convert URL-like text in Markdown into links.

::: demo
markdown/Linkify
:::

## Typographer

Use `typographer` to replace certain text in Markdown with [typographic symbols](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs). When `typographer` is enabled, you can also customize quotation marks via `quotes`, which is useful in multilingual environments.

::: demo
markdown/Typographer
:::

## Emoji

Use `emoji` to parse [specific text](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs) in Markdown into emoji. In addition to boolean values, you can also pass an options object (see [markdown-it-emoji options](https://github.com/markdown-it/markdown-it-emoji?tab=readme-ov-file#init)).

::: demo
markdown/Emoji
:::

## Heading Anchors

Use `anchor` to add unique IDs to all headings. This helps navigation components (such as [Toc](./toc.md)) perform anchor scrolling. When `anchor` is enabled, permalinks are enabled by default for all headings; you can toggle them with `permalink`. `anchor` also supports passing an options object or a function to customize heading rendering (see [markdown-it-anchor options](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#usage)).

::: demo
markdown/Anchor
:::

## More Render Options

The rendering features support rich configuration such as custom Markdown styles, accessing the internal markdown-it instance, and breaks. For more details, see the [Render](./render). Its [API](./render#api) also applies to the Markdown component.

::: demo
markdown/RenderMore
:::

## Search

Use `search` to enable searching. You can also bind the keyword via `keyword`. When the keyword is present, it will automatically scroll to the match and highlight it.

::: demo
markdown/Search
:::

## More Search Options

The search feature supports rich configuration such as border, size, and disabled. For more details, see the [Search](./search). When using it through the Markdown component, prefix Search props in its [API](./search#api) with `search-`.

::: demo
markdown/SearchMore
:::

## TOC

Use `toc` to enable the TOC feature. The component generates a TOC based on the rendered content.

::: demo
markdown/Toc
:::

## More TOC Options

The TOC feature supports rich configuration such as plain text, ordered list, and heading level range. For more details, see the [Toc](./toc). When using it through the Markdown component, prefix Toc props in its [API](./toc#api) with `toc-`.

::: demo
markdown/TocMore
:::

## Action Buttons

Use `show-btn` to display a group of action buttons at the bottom of the component, used to toggle the visibility of Search and TOC. When set to `true`, both search and TOC buttons are shown by default. When set to an array or object, you can customize which buttons are displayed.

::: demo
markdown/ShowBtn
:::

## Sticky Offset

All helper components use sticky positioning. Use `top-offset` to control the sticky top offset for the search and TOC, and `bottom-offset` to control the sticky bottom offset for the action buttons. When nested inside multiple scroll containers, sticky behavior and offsets only apply to the nearest scroll container.

::: demo
markdown/StickyOffset
:::

## Scroll Offset

By default, `top-offset` is also used as the scroll offset for TOC anchor navigation. To set a TOC offset separately, use `toc-offset`. Search index navigation does not inherit this behavior; use `search-offset` to set it explicitly. Both `toc-offset` and `search-offset` support numbers and string positions (`center`, `start`, `end`, `nearest`). When nested inside multiple scroll containers, scrolling behavior and offsets only apply to the nearest scroll container.

::: tip
When the search is visible and `toc-offset` is a number or `start`, the TOC will automatically add the search input height as an extra scroll offset.
:::

::: demo
markdown/ScrollOffset
:::

## Mobile Layout

Use `mini-screen-width` to set the width threshold for mobile devices. When the component width is less than or equal to this value, it will automatically switch to the mobile layout.

::: demo
markdown/MiniScreenWidth
:::

## API

### Props

| Name               | Description                                                                                                                                                                                                                           | Type                                                                             | Default       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------- |
| src                | Markdown string                                                                                                                                                                                                                       | `string` / `number`                                                              | ''            |
| html               | Whether to parse HTML tags in Markdown                                                                                                                                                                                                | `boolean`                                                                        | true          |
| sanitize           | Whether to sanitize HTML tags in the output. Accepts a boolean or [DOMPurify options](https://github.com/cure53/DOMPurify?tab=readme-ov-file#can-i-configure-dompurify)                                                               | `boolean` / `SanitizeOptions`                                                    | true          |
| preset-name        | Markdown preset name                                                                                                                                                                                                                  | `'default' \| 'commonmark' \| 'zero'`                                            | default       |
| plugins            | markdown-it plugins                                                                                                                                                                                                                   | `PluginSimple` / `Array<PluginSimple \| [PluginWithParams, ...any[]]>`           | []            |
| inline             | Whether to enable inline mode                                                                                                                                                                                                         | `boolean`                                                                        | false         |
| xhtml-out          | Whether to generate XHTML-compliant output                                                                                                                                                                                            | `boolean`                                                                        | false         |
| breaks             | Whether to render `\n` as `<br>`                                                                                                                                                                                                      | `boolean`                                                                        | false         |
| highlight          | Whether to enable syntax highlighting for code blocks                                                                                                                                                                                 | `boolean` / `(str: string, lang: string, attrs: string) => string`               | true          |
| highlight-options  | Syntax highlighting options. Only effective when `highlight` is `true`. See [highlight.js configuration](https://highlightjs.readthedocs.io/en/latest/api.html?highlight=configure#configure)                                         | `HLJSOptions`                                                                    | -             |
| lang-prefix        | CSS class prefix for code blocks                                                                                                                                                                                                      | `string`                                                                         | language-     |
| linkify            | Whether to convert URL-like text into links                                                                                                                                                                                           | `boolean`                                                                        | false         |
| typographer        | Whether to replace certain text with [common typographic symbols](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs)                                                                             | `boolean`                                                                        | false         |
| quotes             | Custom quotation marks. Only effective when `typographer` is enabled                                                                                                                                                                  | `string` / `Array<string>`                                                       | “”‘’          |
| emoji              | Whether to parse [specific text](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs) into emojis. Accepts a boolean or [markdown-it-emoji options](https://github.com/markdown-it/markdown-it-emoji#init) | `boolean` / `EmojiOptions`                                                       | true          |
| anchor             | Heading anchor configuration. Accepts a boolean, [markdown-it-anchor options](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#usage), or a function                                                          | `boolean` / `AnchorOptions` / `(anchor: Anchor) => AnchorOptions`                | true          |
| permalink          | Whether to enable permalinks. Only effective when `anchor` is `true`                                                                                                                                                                  | `boolean`                                                                        | true          |
| markdown-class     | Custom Markdown CSS class                                                                                                                                                                                                             | `string`                                                                         | markdown-body |
| show-btn           | Whether to show the bottom action buttons                                                                                                                                                                                             | `boolean` / `Array<('search' \| 'toc')>` / `{ search?: boolean; toc?: boolean }` | false         |
| top-offset         | Global top offset: sticky top offset and the default scroll offset for TOC anchor navigation                                                                                                                                          | `number` / `string`                                                              | 0             |
| bottom-offset      | Global bottom offset for sticky bottom positioning                                                                                                                                                                                    | `number` / `string`                                                              | 0             |
| mini-screen-width  | Mobile width threshold. When the component width is less than or equal to this value, it switches to the mobile layout                                                                                                                | `number` / `string`                                                              | 768           |
| v-model:search     | Whether to show the search                                                                                                                                                                                                            | `boolean`                                                                        | false         |
| v-model:keyword    | Search keyword                                                                                                                                                                                                                        | `string` / `number`                                                              | ''            |
| search-clearable   | Whether to show the clear button in the search                                                                                                                                                                                        | `boolean`                                                                        | true          |
| search-close-icon  | Whether to show the close button in the search                                                                                                                                                                                        | `boolean`                                                                        | true          |
| search-border      | Whether to show the bottom border of the search                                                                                                                                                                                       | `boolean`                                                                        | true          |
| search-size        | Search input size                                                                                                                                                                                                                     | `'huge' \| 'large' \| 'normal' \| 'small'`                                       | huge          |
| search-disabled    | Whether to disable the search                                                                                                                                                                                                         | `boolean`                                                                        | false         |
| search-placeholder | Search input placeholder text                                                                                                                                                                                                         | `string`                                                                         | -             |
| search-offset      | Scroll offset when switching the search match index                                                                                                                                                                                   | `number` / `'start'\|'end'\|'center'\|'nearest'`                                 | center        |
| search-smooth      | Whether to enable smooth scrolling when navigating between search matches                                                                                                                                                             | `boolean`                                                                        | false         |
| search-input-attrs | Attributes passed to the internal search input element                                                                                                                                                                                | `object`                                                                         | {}            |
| v-model:toc        | Whether to show the TOC                                                                                                                                                                                                               | `boolean`                                                                        | false         |
| toc-plain-text     | Whether to generate a plain-text TOC                                                                                                                                                                                                  | `boolean`                                                                        | false         |
| toc-ordered-list   | Whether to generate an ordered TOC                                                                                                                                                                                                    | `boolean`                                                                        | false         |
| toc-start-level    | Start heading level for the TOC                                                                                                                                                                                                       | `number` / `string`                                                              | 1             |
| toc-end-level      | End heading level for the TOC                                                                                                                                                                                                         | `number` / `string`                                                              | 6             |
| toc-ignore         | Heading levels to ignore in the TOC                                                                                                                                                                                                   | `Array<number \| string>`                                                        | []            |
| toc-empty-text     | Text displayed when the TOC is empty                                                                                                                                                                                                  | `string`                                                                         | No Data       |
| toc-offset         | Scroll offset during TOC anchor navigation                                                                                                                                                                                            | `number` / `'start'\|'end'\|'center'\|'nearest'`                                 | start         |
| toc-smooth         | Whether to enable smooth scrolling when navigating via the TOC                                                                                                                                                                        | `boolean`                                                                        | false         |
| toc-change-hash    | Whether to update the page hash when navigating via the TOC                                                                                                                                                                           | `boolean`                                                                        | true          |

### Events

| Name                | Description                                                                    | Arguments                 |
| ------------------- | ------------------------------------------------------------------------------ | ------------------------- |
| env-change          | Triggered when `env` in markdown-it changes                                    | value: `{}`               |
| search-input        | Triggered when the search keyword changes                                      | event: `Event`            |
| search-blur         | Triggered when the search input loses focus                                    | event: `FocusEvent`       |
| search-focus        | Triggered when the search input gains focus                                    | event: `FocusEvent`       |
| search-change       | Triggered only when the search input blurs or Enter is pressed                 | event: `Event`            |
| search-clear        | Triggered when clicking the search clear button                                | -                         |
| search-close        | Triggered when clicking the search close button                                | -                         |
| search-step-click   | Triggered when clicking the search previous/next buttons                       | value: `'prev' \| 'next'` |
| search-total-change | Triggered when the total search match count changes                            | value: `number`           |
| search-index-change | Triggered when the current search match index changes                          | value: `number`           |
| toc-click           | Triggered when clicking a TOC item. For arguments see [TocItem](./toc#tocitem) | tocItem: `TocItem`        |
| toc-change          | Triggered when the active TOC item changes                                     | id: `string`              |

### Expose

| Name          | Description                           | Type                                                                    |
| ------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| mdInstance    | Get the internal markdown-it instance | `MarkdownIt`                                                            |
| htmlStr       | Get the parsed HTML string            | `string`                                                                |
| searchFocus   | Focus the search input                | `() => void`                                                            |
| searchBlur    | Blur the search input                 | `() => void`                                                            |
| searchClear   | Clear the search keyword              | `() => void`                                                            |
| searchToggle  | Switch the current search match index | `(index: number \| 'prev' \| 'next', ignoreDisabled?: boolean) => void` |
| searchRefresh | Refresh search results manually       | `(resetIndex?: boolean) => void`                                        |
| tocScrollTo   | Scroll to a given heading in the TOC  | `(href: string) => void`                                                |
| tocRefresh    | Regenerate the TOC                    | `() => void`                                                            |
