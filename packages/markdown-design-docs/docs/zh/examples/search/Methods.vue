<template>
  <div>
    <h4>方法调用示例</h4>
    <vmd-search ref="searchRef" v-model="keyword" placeholder="使用下方按钮控制搜索框" />

    <div style="margin-top: 15px">
      <button @click="focus">聚焦</button>
      <button @click="blur">失焦</button>
      <button @click="clear">清空</button>
      <button @click="selectText">选中文本</button>
      <button @click="getValue">获取值</button>
      <button @click="setValue">设置值</button>
    </div>

    <div
      v-if="result"
      style="margin-top: 15px; padding: 10px; background: #f5f5f5; border-radius: 4px"
    >
      <strong>操作结果：</strong> {{ result }}
    </div>

    <vmd-render :src="content" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SearchInstance } from 'vue-markdown-design'

const searchRef = ref<SearchInstance>()
const keyword = ref('测试文本')
const result = ref('')

const focus = () => {
  searchRef.value?.focus()
  result.value = '搜索框已聚焦'
}

const blur = () => {
  searchRef.value?.blur()
  result.value = '搜索框已失焦'
}

const clear = () => {
  searchRef.value?.clear()
  result.value = '搜索框已清空'
}

const selectText = () => {
  searchRef.value?.selectText()
  result.value = '文本已选中'
}

const getValue = () => {
  const value = searchRef.value?.getValue()
  result.value = `当前值: "${value}"`
}

const setValue = () => {
  searchRef.value?.setValue('新设置的值')
  result.value = '值已设置为 "新设置的值"'
}

const content = `
# 方法调用演示

这个演示展示了如何通过 ref 调用搜索组件的方法。

## 可用方法

搜索组件提供了以下方法供外部调用：

### focus()
聚焦搜索框输入框。

\`\`\`javascript
searchRef.value?.focus()
\`\`\`

### blur()
让搜索框输入框失焦。

\`\`\`javascript
searchRef.value?.blur()
\`\`\`

### clear()
清空搜索框的内容。

\`\`\`javascript
searchRef.value?.clear()
\`\`\`

### selectText()
选中搜索框输入框中的文本。

\`\`\`javascript
searchRef.value?.selectText()
\`\`\`

### getValue()
获取当前搜索框的值。

\`\`\`javascript
const value = searchRef.value?.getValue()
\`\`\`

### setValue(value: string)
设置搜索框的值。

\`\`\`javascript
searchRef.value?.setValue('新值')
\`\`\`

## 使用场景

这些方法在以下场景中特别有用：

- **表单验证**：在提交前验证搜索框内容
- **快捷键支持**：通过键盘快捷键控制搜索框
- **程序化控制**：根据业务逻辑自动操作搜索框
- **用户体验**：提供更好的交互体验

## 类型定义

\`\`\`typescript
interface SearchExpose {
  focus: () => void
  blur: () => void
  clear: () => void
  selectText: () => void
  getValue: () => string
  setValue: (value: string) => void
}
\`\`\`
`
</script>

<style scoped>
button {
  margin: 0 8px 8px 0;
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  border-color: #1890ff;
  color: #1890ff;
}

button:active {
  background-color: #e6f7ff;
}
</style>
