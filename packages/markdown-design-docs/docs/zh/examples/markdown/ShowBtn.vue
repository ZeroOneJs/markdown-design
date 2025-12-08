<template>
  <vue-markdown :src="`# 标题\n内容`" :show-btn="showBtn" />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const showBtn = ref(true)
// 等价于
// const showBtn = ref(['toc', 'search'])
// const showBtn = ref({ toc: true, search: true })
</script>
