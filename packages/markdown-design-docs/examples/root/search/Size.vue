<template>
  <div>
    <p>
      <label>
        Select search size:
        <select v-model="size" name="select">
          <option value="huge">huge (default)</option>
          <option value="large">large</option>
          <option value="normal">normal</option>
          <option value="small">small</option>
        </select>
      </label>
    </p>
    <vmd-search placeholder="Type to search" :size="size" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const size = ref('huge')
</script>
