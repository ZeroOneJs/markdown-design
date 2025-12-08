<template>
  <div>
    <div>
      <label>请选择样式名：</label>
      <select v-model="markdownClass">
        <option value="custom-theme">自定义样式 custom-theme</option>
        <option value="markdown-body">默认样式 markdown-body</option>
        <option value="">无样式</option>
      </select>
    </div>
    <vue-markdown :src="md" :markdownClass="markdownClass" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const md = `
# 蜀相

丞相祠堂何处寻？锦官城外柏森森。

映阶碧草自春色，隔叶黄鹂空好音。

三顾频烦天下计，两朝开济老臣心。

出师未捷身先死，长使英雄泪满襟。
`

const markdownClass = ref('custom-theme')
</script>

<style lang="less">
// .custom-theme {
//   h1 {
//     color: blue;
//   }
//   p {
//     color: green;
//   }
// }
</style>
