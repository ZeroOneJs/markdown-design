<template>
  <div>
    <div style="margin-bottom: 16px">
      <input v-model="clearable" id="clearable" type="checkbox" />
      <label for="clearable"> 启用 clearable</label>
    </div>
    <vmd-search v-model="keyword" :clearable="clearable" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('vue-markdown-design')
const clearable = ref(true)
</script>
