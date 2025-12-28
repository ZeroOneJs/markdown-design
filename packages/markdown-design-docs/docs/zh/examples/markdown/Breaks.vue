<template>
  <div>
    <div style="margin-bottom: 16px">
      <label>
        <input v-model="breaks" type="checkbox" />
        启用 breaks
      </label>
    </div>
    <p>解析结果：</p>
    <p>{{ markdownRef?.htmlStr }}</p>
    <p>渲染结果：</p>
    <vue-markdown ref="markdownRef" :src="md" :breaks="breaks" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const markdownRef = ref(null)
const breaks = ref(true)

const md = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nMorbi maximus elit fermentum pellentesque vehicula. 
  `
</script>
