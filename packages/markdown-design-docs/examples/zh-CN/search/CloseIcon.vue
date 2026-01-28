<template>
  <div>
    <p>
      <label>
        <input v-model="closeIcon" name="checkbox" type="checkbox" />
        启用 close-icon
      </label>
    </p>
    <vmd-search :close-icon="closeIcon" @close="onClose" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const closeIcon = ref(true)

const onClose = () => {
  console.log('点击了关闭按钮')
}
</script>
