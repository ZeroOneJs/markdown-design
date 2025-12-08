<template>
  <vue-markdown :src="md" :emoji="emoji" />
</template>

<script setup lang="ts">
const md = `
笑脸：:smile:

哭脸：:cry:

礼物：:gift:

自定义符号：:>
`

const emoji = { shortcuts: { laughing: ':>' } }
</script>
