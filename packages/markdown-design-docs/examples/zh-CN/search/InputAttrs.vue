<template>
  <vmd-search v-model="keyword" :input-attrs="{ maxlength: 11 }" />
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('最多输入 11 个字符')
</script>
