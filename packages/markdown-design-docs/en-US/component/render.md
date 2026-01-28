# Render

Parses Markdown text in real-time and renders it into safe, polished HTML.

## Basic Usage

Use `src` to pass a Markdown string and render the corresponding HTML output.

::: demo
render/Basic
:::

## Parse HTML Tags

Use `html` to control whether HTML tags inside Markdown are parsed.

::: demo
render/Html
:::

## Sanitize HTML Tags

Use `sanitize` to sanitize HTML tags in the output to prevent XSS and other web attacks. Enabling `sanitize` may affect how some HTML tags are rendered. If the result is not what you expect and your security requirements are low, you can try disabling `sanitize`, but this is extremely risky. If you have strict security requirements, consider disabling `html` instead.

::: demo
render/Sanitize
:::

## Preset Name

Use `preset-name` to quickly switch Markdown syntax rules. Three commonly used presets are built-in:
[default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs) (similar to GFM), [commonmark](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) (see [CommonMark](https://commonmark.org/)), and [zero](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs) (disables all syntax rules).

::: tip
Compared to markdown-it's default preset, the `html` option is enabled by default here.
:::

::: demo
render/PresetName
:::

## markdown-it Plugins

Use `plugins` to pass markdown-it plugins. Two forms are supported: pass a single plugin directly, or pass an array of plugins where each item can be a plugin or a plugin-with-params tuple (e.g., `[plugin, [plugin, param1, param2, ...], ...]`).

::: demo
render/Plugins
:::

## Inline

Use `inline` to skip block rules parsing and render output without a `<p>` wrapper.

::: demo
render/Inline
:::

## XHTML

Use `xhtml-out` to generate XHTML-compliant output.

::: demo
render/XhtmlOut
:::

## Breaks

Use `breaks` to render `\n` in Markdown as `<br>`.

::: demo
render/Breaks
:::

## Syntax Highlighting

Use `highlight` to syntax-highlight fenced code blocks based on their language. When a boolean is provided, [highlight.js](https://highlightjs.org/) is used as the syntax highlighter and can be configured via `highlight-options` (see [highlight.js configuration](https://highlightjs.readthedocs.io/en/latest/api.html#configure)). If the default highlighting is not enough, `highlight` also supports providing a function to customize highlighting.

::: demo
render/Highlight
:::

## Custom Highlight Class

Use `lang-prefix` to change the CSS class prefix used for code blocks, so you can customize highlight styles.

::: demo
render/LangPrefix
:::

## Linkify

Use `linkify` to automatically convert URL-like text in Markdown into links.

::: demo
render/Linkify
:::

## Typographer

Use `typographer` to replace certain text in Markdown with [typographic symbols](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs). When `typographer` is enabled, you can also customize quotation marks via `quotes`, which is useful in multilingual environments.

::: demo
render/Typographer
:::

## Emoji

Use `emoji` to parse [specific text](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs) in Markdown into emoji. In addition to boolean values, you can also pass an options object (see [markdown-it-emoji options](https://github.com/markdown-it/markdown-it-emoji?tab=readme-ov-file#init)).

::: demo
render/Emoji
:::

## Heading Anchors

Use `anchor` to add unique IDs to all headings. This helps navigation components (such as [Toc](./toc.md)) perform anchor scrolling. When `anchor` is enabled, permalinks are enabled by default for all headings; you can toggle them with `permalink`. `anchor` also supports passing an options object or a function to customize heading rendering (see [markdown-it-anchor options](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#usage)).

::: demo
render/Anchor
:::

## Custom Styles

By default, [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) is used to style the rendered output. You can also provide your own styles via `markdown-class`.

::: demo
render/MarkdownClass
:::

## API

### Props

| Name              | Description                                                                                                                                                                                                                           | Type                                                                   | Default       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------- |
| src               | Markdown string                                                                                                                                                                                                                       | `string` / `number`                                                    | ''            |
| html              | Whether to parse HTML tags in Markdown                                                                                                                                                                                                | `boolean`                                                              | true          |
| sanitize          | Whether to sanitize HTML tags in the output. Accepts a boolean or [DOMPurify options](https://github.com/cure53/DOMPurify?tab=readme-ov-file#can-i-configure-dompurify)                                                               | `boolean` / `SanitizeOptions`                                          | true          |
| preset-name       | Markdown preset name                                                                                                                                                                                                                  | `'default' \| 'commonmark' \| 'zero'`                                  | default       |
| plugins           | markdown-it plugins                                                                                                                                                                                                                   | `PluginSimple` / `Array<PluginSimple \| [PluginWithParams, ...any[]]>` | []            |
| inline            | Whether to enable inline mode                                                                                                                                                                                                         | `boolean`                                                              | false         |
| xhtml-out         | Whether to generate XHTML-compliant output                                                                                                                                                                                            | `boolean`                                                              | false         |
| breaks            | Whether to render `\n` as `<br>`                                                                                                                                                                                                      | `boolean`                                                              | false         |
| highlight         | Whether to enable syntax highlighting for code blocks                                                                                                                                                                                 | `boolean` / `(str: string, lang: string, attrs: string) => string`     | true          |
| highlight-options | Syntax highlighting options. Only effective when `highlight` is `true`. See [highlight.js configuration](https://highlightjs.readthedocs.io/en/latest/api.html?highlight=configure#configure)                                         | `HLJSOptions`                                                          | -             |
| lang-prefix       | CSS class prefix for code blocks                                                                                                                                                                                                      | `string`                                                               | language-     |
| linkify           | Whether to convert URL-like text into links                                                                                                                                                                                           | `boolean`                                                              | false         |
| typographer       | Whether to replace certain text with [common typographic symbols](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs)                                                                             | `boolean`                                                              | false         |
| quotes            | Custom quotation marks. Only effective when `typographer` is enabled                                                                                                                                                                  | `string` / `Array<string>`                                             | “”‘’          |
| emoji             | Whether to parse [specific text](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs) into emojis. Accepts a boolean or [markdown-it-emoji options](https://github.com/markdown-it/markdown-it-emoji#init) | `boolean` / `EmojiOptions`                                             | true          |
| anchor            | Heading anchor configuration. Accepts a boolean, [markdown-it-anchor options](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#usage), or a function                                                          | `boolean` / `AnchorOptions` / `(anchor: Anchor) => AnchorOptions`      | true          |
| permalink         | Whether to enable permalinks. Only effective when `anchor` is `true`                                                                                                                                                                  | `boolean`                                                              | true          |
| markdown-class    | Custom Markdown CSS class                                                                                                                                                                                                             | `string`                                                               | markdown-body |

### Events

| Name       | Description                                 | Arguments   |
| ---------- | ------------------------------------------- | ----------- |
| env-change | Triggered when `env` in markdown-it changes | value: `{}` |

### Expose

| Name       | Description                           | Type         |
| ---------- | ------------------------------------- | ------------ |
| mdInstance | Get the internal markdown-it instance | `MarkdownIt` |
| htmlStr    | Get the parsed HTML string            | `string`     |
