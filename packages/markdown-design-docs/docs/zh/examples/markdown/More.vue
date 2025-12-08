<template>
  <div>
    <vue-markdown breaks :src="`_vue-markdown 组件渲染结果_\n${md}`" />
    <VmdRender breaks :src="`_VmdRender 组件渲染结果_\n${md}`" />
  </div>
</template>
<script setup lang="ts">
const md = `
# 蜀相

> 下面文本中的所有 \\\\n 都会被渲染成 \\<br\\> 标签
 
丞相祠堂何处寻？锦官城外柏森森。\n映阶碧草自春色，隔叶黄鹂空好音。\n三顾频烦天下计，两朝开济老臣心。\n出师未捷身先死，长使英雄泪满襟。
`
</script>
