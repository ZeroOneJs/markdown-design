<template>
  <div>
    <div style="margin-bottom: 16px">
      <label for="size">请输入搜索栏尺寸：</label>
      <select v-model="size" id="size">
        <option value="huge">huge (默认)</option>
        <option value="large">large</option>
        <option value="normal">normal</option>
        <option value="small">small</option>
      </select>
    </div>
    <vmd-search placeholder="请输入搜索内容" :size="size" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const size = ref('huge')
</script>
