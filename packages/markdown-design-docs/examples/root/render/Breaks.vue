<template>
  <div>
    <p>
      <label>
        <input v-model="breaks" name="checkbox" type="checkbox" />
        Enable breaks
      </label>
    </p>
    <h4>Parsed:</h4>
    <div style="background: #fff; padding: 32px">
      {{ renderRef?.htmlStr }}
    </div>
    <h4>Rendered:</h4>
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
