<template>
  <div class="demo-toc-target">
    <div class="demo-header">
      <h3>指定目标元素示例</h3>
      <p>使用target属性可以指定搜索的目标元素</p>
    </div>

    <div class="demo-controls">
      <div class="control-item">
        <label>选择目标元素：</label>
        <select v-model="targetType" @change="updateTarget">
          <option value="default">默认（整个文档）</option>
          <option value="content">内容区域</option>
          <option value="section1">第一部分</option>
          <option value="section2">第二部分</option>
        </select>
      </div>
    </div>

    <div class="demo-content">
      <div class="demo-toc">
        <vmd-toc :target="target" />
      </div>

      <div class="demo-markdown" ref="contentRef">
        <div id="section1">
          <h2>第一部分：基础概念</h2>
          <vmd-render :src="markdown1" />
        </div>
        <div class="divider"></div>
        <div id="section2">
          <h2>第二部分：高级应用</h2>
          <vmd-render :src="markdown2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const contentRef = ref(null)
const targetType = ref('default')
const target = ref(null)

const updateTarget = () => {
  switch (targetType.value) {
    case 'default':
      target.value = null
      break
    case 'content':
      target.value = contentRef.value
      break
    case 'section1':
      target.value = '#section1'
      break
    case 'section2':
      target.value = '#section2'
      break
  }
}

const markdown1 = `# JavaScript 基础

## 变量与数据类型

JavaScript有多种数据类型，包括原始类型和引用类型。原始类型包括数字、字符串、布尔值、null、undefined和Symbol。引用类型包括对象、数组和函数等。

### 变量声明

在JavaScript中，可以使用var、let和const来声明变量。其中var是函数作用域，而let和const是块作用域。

### 数据类型转换

JavaScript是一种弱类型语言，常常会发生自动类型转换。了解这些转换规则对于编写健壮的代码非常重要。

## 运算符与表达式

JavaScript提供了丰富的运算符，包括算术运算符、比较运算符、逻辑运算符等。`

const markdown2 = `# React 进阶

## Hooks 深入理解

React Hooks是React 16.8版本引入的新特性，它允许你在不编写class的情况下使用state以及其他的React特性。

### useState Hook

useState是最基本的Hook，它允许你在函数组件中添加state。

### useEffect Hook

useEffect允许你在函数组件中执行副作用操作，如数据获取、订阅或手动更改React组件中的DOM。

## 性能优化

React提供了多种性能优化手段，包括React.memo、useMemo、useCallback等。`
</script>

<style scoped>
.demo-toc-target {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-header {
  margin-bottom: 20px;
}

.demo-header h3 {
  margin-bottom: 8px;
  color: #333;
}

.demo-header p {
  color: #666;
  font-size: 14px;
}

.demo-controls {
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-item label {
  font-weight: 500;
  color: #555;
}

.control-item select {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.demo-content {
  display: flex;
  gap: 20px;
}

.demo-toc {
  width: 250px;
  flex-shrink: 0;
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  background-color: #fafafa;
}

.demo-markdown {
  flex: 1;
  max-height: 600px;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: white;
}

.divider {
  height: 2px;
  background-color: #eee;
  margin: 30px 0;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .demo-content {
    flex-direction: column;
  }

  .demo-toc {
    width: 100%;
    max-height: 200px;
  }
}
</style>
