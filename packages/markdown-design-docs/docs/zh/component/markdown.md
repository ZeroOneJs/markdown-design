<script setup>
const returnToTop = () => document.documentElement.scrollTop = 0
window.addEventListener('scroll', returnToTop);
setTimeout(() => {
  window.removeEventListener('scroll', returnToTop);
}, 300);
</script>

# Markdown

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

## 基本用法

::: demo
markdown/Basic.vue
:::

## showBtn

::: demo
markdown/ShowBtn.vue
:::

## search/keyword/current/offsetTop

::: demo
markdown/Keyword.vue
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
