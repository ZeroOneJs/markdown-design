<template>
  <vmd-search v-model="keyword" :input-attrs="{ maxlength: 19 }" />
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('Up to 19 characters')
</script>
