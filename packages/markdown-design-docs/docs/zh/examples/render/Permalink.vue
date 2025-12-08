<template>
  <div>
    <p>permalink 开启（默认）：</p>
    <vmd-render :src="md" />

    <p>permalink 关闭：</p>
    <vmd-render :src="md" :permalink="false" />
  </div>
</template>

<script setup lang="ts">
const md = `
# 永久链接示例

## 标题 1
这是标题 1 的内容。

## 标题 2
这是标题 2 的内容。

### 子标题
这是子标题的内容。
`
</script>
