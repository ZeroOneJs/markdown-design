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

## 显示按钮

::: demo
markdown/ShowBtn.vue
:::

## 关键字/当前选中

::: demo
markdown/Keyword.vue
:::

## toc/tocOffset/offsetTop

::: demo
markdown/TocOffset.vue
:::
