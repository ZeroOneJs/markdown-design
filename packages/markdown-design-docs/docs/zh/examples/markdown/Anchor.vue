<template>
  <div>
    <div>
      <input v-model="permalink" id="permalink" type="checkbox" />
      <label for="permalink">启用永久链接（鼠标悬浮在标题上可显示永久链接符号）</label>
    </div>
    <vue-markdown :src="`_启用/禁用永久链接_\n${md}`" :permalink="permalink" />
    <vue-markdown :src="`_自定义永久链接_\n${md}`" :anchor="anchorOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MarkdownProps } from 'vue-markdown-design'

const md = `
# 蜀相

丞相祠堂何处寻？锦官城外柏森森。

映阶碧草自春色，隔叶黄鹂空好音。

三顾频烦天下计，两朝开济老臣心。

出师未捷身先死，长使英雄泪满襟。
`

const permalink = ref(true)
const anchorOptions: MarkdownProps['anchor'] = (anchor) => ({
  permalink: anchor.permalink.headerLink()
})
</script>
