<template>
  <div>
    <vmd-search v-model="keyword" :target="targetElement" placeholder="只在下方区域搜索" />
    <br />
    <button @click="switchTarget">切换搜索目标</button>
    <div class="search-target" ref="target1">
      <h3>搜索目标区域 1</h3>
      <p>这是第一个搜索目标区域，包含一些示例文本。您可以在这里搜索关键词。</p>
      <p>Vue.js 是一个渐进式 JavaScript 框架，用于构建用户界面。</p>
    </div>
    <div class="search-target" ref="target2" style="display: none">
      <h3>搜索目标区域 2</h3>
      <p>这是第二个搜索目标区域，包含不同的内容。</p>
      <p>React 是一个用于构建用户界面的 JavaScript 库。</p>
    </div>
    <vmd-render :src="content" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const keyword = ref('')
const target1 = ref<HTMLElement>()
const target2 = ref<HTMLElement>()
const currentTarget = ref(1)

const targetElement = computed(() => {
  return currentTarget.value === 1 ? target1.value : target2.value
})

const switchTarget = () => {
  currentTarget.value = currentTarget.value === 1 ? 2 : 1
  if (target1.value && target2.value) {
    target1.value.style.display = currentTarget.value === 1 ? 'block' : 'none'
    target2.value.style.display = currentTarget.value === 2 ? 'block' : 'none'
  }
}

const content = `
# 搜索目标演示

这个演示展示了搜索组件的目标指定功能。

## 目标元素

通过 \`target\` 属性，您可以指定搜索组件只在特定的 DOM 元素内进行搜索：

- **CSS 选择器**: 传入字符串选择器，如 \`".content"\`
- **DOM 元素**: 直接传入 DOM 元素对象
- **默认值**: 不传时默认为整个文档

## 动态切换

点击上方的按钮可以在两个不同的搜索目标区域之间切换，观察搜索结果的变化。

## 使用场景

- **局部搜索**: 只在特定区域进行搜索
- **多区域搜索**: 支持在不同区域间切换搜索
- **性能优化**: 减少搜索范围，提高搜索效率
`
</script>

<style scoped>
.search-target {
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

button {
  padding: 6px 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

button:hover {
  background-color: #66b1ff;
}
</style>
