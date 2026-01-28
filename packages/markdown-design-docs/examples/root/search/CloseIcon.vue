<template>
  <div>
    <p>
      <label>
        <input v-model="closeIcon" name="checkbox" type="checkbox" />
        Enable close-icon
      </label>
    </p>
    <vmd-search :close-icon="closeIcon" @close="onClose" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const closeIcon = ref(true)

const onClose = () => {
  console.log('Clicked the close button')
}
</script>
