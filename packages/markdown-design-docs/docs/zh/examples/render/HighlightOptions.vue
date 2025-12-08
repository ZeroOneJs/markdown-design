<template>
  <div>
    <p>自定义 highlight.js 配置：</p>
    <vmd-render :src="md" :highlightOptions="highlightOptions" />
  </div>
</template>

<script setup lang="ts">
const md = `
# 代码高亮配置示例

以下是代码块示例：

\`\`\`javascript
// 这是一行注释
function highlightExample() {
  const message = 'Hello with custom highlight options!';
  console.log(message);
  return message;
}
\`\`\`
`

// 自定义 highlight.js 配置
const highlightOptions = {
  tabReplace: '  ', // 用两个空格代替制表符
  classPrefix: 'hljs-', // 自定义类前缀
  languages: ['javascript', 'typescript'] // 显式指定支持的语言
}
</script>
