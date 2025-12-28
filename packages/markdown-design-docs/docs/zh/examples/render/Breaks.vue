<template>
  <div>
    <p>
      <label>
        <input v-model="breaks" name="checkbox" type="checkbox" />
        启用 breaks
      </label>
    </p>
    <h4>解析结果：</h4>
    <div style="background: #fff; padding: 32px">
      {{ renderRef?.htmlStr }}
    </div>
    <h4>渲染结果：</h4>
    <vmd-render ref="renderRef" :src="md" :breaks="breaks" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const renderRef = ref(null)
const breaks = ref(true)

const md = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nMorbi maximus elit fermentum pellentesque vehicula. 
  `
</script>
