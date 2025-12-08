<template>
  <vue-markdown :src="md" topOffset="112" toc />
</template>

<script setup lang="ts">
const md = `
# 标题 1
## 小标题

内容

# 标题 2
`
</script>
