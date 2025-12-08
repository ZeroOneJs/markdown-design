<template>
  <div>
    <div style="margin-bottom: 16px">
      <input v-model="closeIcon" id="close-icon" type="checkbox" />
      <label for="close-icon"> 启用 close-icon</label>
    </div>
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
