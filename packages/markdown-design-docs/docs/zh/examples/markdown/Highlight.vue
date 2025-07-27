<template>
  <vue-markdown :src="md" :highlightOptions="{ languages: ['ts'] }" />
</template>

<script setup lang="ts">
const md = `
\`\`\`
console.log('hello world')
\`\`\`
`
</script>
