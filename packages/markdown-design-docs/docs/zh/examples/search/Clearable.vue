<template>
  <div>
    <p>
      <label>
        <input v-model="clearable" name="checkbox" type="checkbox" />
        启用 clearable
      </label>
    </p>
    <vmd-search v-model="keyword" :clearable="clearable" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('vue-markdown-design')
const clearable = ref(true)
</script>
