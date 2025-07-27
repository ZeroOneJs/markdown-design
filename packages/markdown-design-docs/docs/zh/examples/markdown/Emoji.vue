<template>
  <vue-markdown :src="md" :emoji="{ shortcuts: { laughing: [':)', ':-)'] } }" />
</template>

<script setup lang="ts">
const md = `
:-)
`
</script>
