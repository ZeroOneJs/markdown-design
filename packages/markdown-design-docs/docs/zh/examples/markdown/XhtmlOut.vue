<template>
  <div>
    <div style="margin-bottom: 16px">
      <label>
        <input v-model="xhtmlOut" type="checkbox" />
        启用 xhtml-out
      </label>
    </div>
    <p>解析结果：</p>
    <p>{{ markdownRef?.htmlStr }}</p>
    <p>渲染结果：</p>
    <vue-markdown ref="markdownRef" :src="md" :xhtml-out="xhtmlOut" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const markdownRef = ref(null)
const xhtmlOut = ref(true)

const md = `
  ---
  `
</script>
