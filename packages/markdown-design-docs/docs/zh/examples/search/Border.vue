<template>
  <div>
    <div style="margin-bottom: 16px">
      <input v-model="border" id="border" type="checkbox" />
      <label for="border"> 启用 border</label>
    </div>
    <vmd-search :border="border" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const border = ref(true)
</script>
