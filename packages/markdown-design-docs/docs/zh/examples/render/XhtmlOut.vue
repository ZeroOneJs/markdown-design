<template>
  <div>
    <div style="margin-bottom: 16px">
      <label>
        <input v-model="xhtmlOut" type="checkbox" />
        启用 xhtml-out
      </label>
    </div>
    <p>解析结果：</p>
    <p>{{ renderRef?.htmlStr }}</p>
    <p>渲染结果：</p>
    <vmd-render ref="renderRef" :src="md" :xhtml-out="xhtmlOut" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const renderRef = ref(null)
const xhtmlOut = ref(true)

const md = `
  ---
  `
</script>
