<template>
  <div>
    <h4>Markdown:</h4>
    <pre style="background: #fff; overflow: auto"><code>{{ md }}</code></pre>
    <h4>Output:</h4>
    <vue-markdown :src="md" />
  </div>
</template>

<script setup>
const md = `
  <p style="background: rgba(9, 105, 218, 0.14); padding: 10px">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <iframe//src=jAva&Tab;script:alert(3)>def
  </p>
  `
</script>
