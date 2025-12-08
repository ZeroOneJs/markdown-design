<template>
  <div>
    <vmd-search v-model="keyword" placeholder="请输入搜索关键词" />
    <div class="keyword-display">当前关键词: {{ keyword || '无' }}</div>
    <vmd-render :src="content" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('搜索')

const content = `
# 双向绑定演示

这个演示展示了搜索组件的双向绑定功能。

## 搜索功能

搜索组件支持 v-model 双向绑定，您可以实时获取和设置搜索关键词。

## 实时反馈

在上面的搜索框中输入内容，您可以看到关键词会实时显示在下方。

## 编程控制

您也可以通过代码来控制搜索关键词：

\`\`\`javascript
const keyword = ref('搜索')
// 修改关键词
keyword.value = '新的关键词'
\`\`\`

## 数据类型

搜索组件支持字符串和数字类型的关键词。
`
</script>

<style scoped>
.keyword-display {
  margin: 10px 0;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
}
</style>
