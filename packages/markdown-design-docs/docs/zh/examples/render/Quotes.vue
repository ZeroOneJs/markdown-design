<template>
  <div>
    <div>
      <label>请输入：</label>
      <input v-model="quotes[0]" style="width: 20px; margin: 4px" type="text" />
      <input v-model="quotes[1]" style="width: 20px; margin: 4px" type="text" />
      <input v-model="quotes[2]" style="width: 20px; margin: 4px" type="text" />
      <input v-model="quotes[3]" style="width: 20px; margin: 4px" type="text" />
    </div>
    <vmd-render typographer :src="md" :quotes="[...quotes]" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const md = `
"这是一个双引号示例"

'这是一个单引号示例'
`
const quotes = ref(['«', '»', '‹', '›'])
</script>
