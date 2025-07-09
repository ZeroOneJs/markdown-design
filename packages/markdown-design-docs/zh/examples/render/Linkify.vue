<template>
  <div>
    <p>
      <label>
        <input v-model="linkify" name="checkbox" type="checkbox" />
        启用 linkify
      </label>
    </p>
    <vmd-render :src="md" :linkify="linkify" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const linkify = ref(true)

const md = `
  链接：[https://www.example.com](https://www.example.com)

  类似 url 的文本：https://www.example.com
  `
</script>
