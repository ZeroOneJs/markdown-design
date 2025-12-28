<template>
  <div>
    <p>
      <label>
        请输入搜索栏尺寸：
        <select v-model="size" name="select">
          <option value="huge">huge (默认)</option>
          <option value="large">large</option>
          <option value="normal">normal</option>
          <option value="small">small</option>
        </select>
      </label>
    </p>
    <vmd-search placeholder="请输入搜索内容" :size="size" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const size = ref('huge')
</script>
