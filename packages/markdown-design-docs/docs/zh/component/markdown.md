<script setup>
const returnToTop = () => document.documentElement.scrollTop = 0
window.addEventListener('scroll', returnToTop);
setTimeout(() => {
  window.removeEventListener('scroll', returnToTop);
}, 300);
</script>

# Markdown

## 基本用法

::: demo
markdown/Basic.vue
:::

## 关键字搜索

使用 `search` 来显示搜索栏，并且可以通过 `keyword` 来传入关键字或者接收输入的关键字

::: demo
markdown/Search.vue
:::

## SearchOffset

::: demo
markdown/SearchOffset.vue
:::

## Placeholder

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

## emoji

::: demo
markdown/Emoji.vue
:::

## highlight/highlightOptions

::: demo
markdown/Highlight.vue
:::

## sanitize

::: demo
markdown/Sanitize.vue
:::

## plugins

::: demo
markdown/Plugins.vue
:::

## showBtn

::: demo
markdown/ShowBtn.vue
:::

## toc/tocOffset/offsetTop

::: demo
markdown/TocOffset.vue
:::

## showBtn/offsetBottom

::: demo
markdown/OffsetBottom.vue
:::

## miniScreenWidth

::: demo
markdown/MiniScreenWidth.vue
:::

## markdown-it 配置 inline/preset/html/xhtmlOut/breaks/langPrefix/linkify/typographer/quotes
