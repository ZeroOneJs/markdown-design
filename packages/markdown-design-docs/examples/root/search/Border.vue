<template>
  <div>
    <p>
      <label>
        <input v-model="border" name="checkbox" type="checkbox" />
        Enable border
      </label>
    </p>
    <vmd-search :border="border" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const border = ref(true)
</script>
