<template>
  <div>
    <p>
      <label>
        <input v-model="xhtmlOut" name="checkbox" type="checkbox" />
        Enable xhtml-out
      </label>
    </p>
    <h4>Parsed:</h4>
    <div style="background: #fff; padding: 32px">
      {{ renderRef?.htmlStr }}
    </div>
    <h4>Rendered:</h4>
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
