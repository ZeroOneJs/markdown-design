<template>
  <div>
    <vmd-render :src="srcString" />
    <vmd-render :src="srcNumber" />
  </div>
</template>

<script setup lang="ts">
const srcString = `# 字符串类型的 Markdown 源码

这是通过字符串传入的 Markdown 内容。`

const srcNumber = 12345
</script>
