<template>
  <div>
    <div>
      <input v-model="inline" id="inline" type="checkbox" />
      <label for="inline">启用 inline</label>
    </div>
    <vue-markdown :inline="inline" :src="md" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const md = `
丞相祠堂何处寻？锦官城外柏森森。

映阶碧草自春色，隔叶黄鹂空好音。

三顾频烦天下计，两朝开济老臣心。

出师未捷身先死，长使英雄泪满襟。
`

const inline = ref(true)
</script>
