<template>
  <div>
    <div style="margin-bottom: 16px">
      <b>{{ md }}</b>
      <p>以上通过 iframe 标签注入的脚本将被过滤</p>
    </div>
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
