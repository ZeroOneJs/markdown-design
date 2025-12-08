<template>
  <vue-markdown ref="mdRef" :src="md" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const md = ref('')

const mdRef = ref()
onMounted(() => {
  mdRef.value?.mdInstance.disable('emphasis') // 禁用斜体字
  md.value =
    '_这是一段斜体字文本，但是 `markdown-it` 禁用了斜体字规则，所以最终输出了一段正常的文本_'
})
</script>
