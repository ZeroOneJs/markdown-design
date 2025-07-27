<template>
  <vue-markdown :src="md" />
</template>

<script setup lang="ts">
const md = `<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>`
</script>
