<template>
  <div>
    <h4>markdown 文本：</h4>
    <pre style="background: #fff"><code>{{ md }}</code></pre>
    <h4>渲染结果：</h4>
    <vmd-render :src="md" />
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
