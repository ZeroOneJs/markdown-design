<template>
  <vue-markdown :src="md" />
</template>

<script setup lang="ts">
const md = `
\\<p\\>abc\\<iframe//src=jAva\\&Tab;script:alert(3)\\>def\\<\\/p\\>

以上的 html 内容经过过滤最终会被渲染成：

<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>
`
</script>
