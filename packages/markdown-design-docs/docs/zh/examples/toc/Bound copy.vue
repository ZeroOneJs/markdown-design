<template>
  <div class="demo-toc-bound">
    <div class="demo-content">
      <div class="demo-toc">
        <vmd-toc :target="renderRef" :bound="76" :offset="offset" />
      </div>

      <div class="demo-markdown">
        <vmd-render ref="renderRef" :src="markdown" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const renderRef = ref()

const bound = reactive({
  top: 20,
  bottom: 20
})
const offset = (scrollAction) => {
  if (scrollAction.el === document.documentElement) return 112
}
const markdown = `
---
滚动到上方横线处目录第一项就会被选中

# 第一章 总述

## 1.1 引言

这是一个简单的引言部分，用于介绍本文档的主题和目的。在这个示例中，我们可以看到视口边界如何影响目录项的激活状态。

## 1.2 背景

在开始具体内容之前，我们先来了解一些相关的背景信息。bound属性可以帮助我们更精确地控制目录项何时被激活。

# 第二章 主要内容

## 2.1 核心概念

本节将介绍一些核心概念，帮助理解后续内容。通过调整顶部和底部边界，我们可以改变目录项激活的触发条件。

### 2.1.1 顶部边界

顶部边界决定了元素顶部需要进入视口的百分比才能被激活。较小的值意味着元素只需要稍微进入视口就会被激活。

### 2.1.2 底部边界

底部边界决定了元素底部可以离开视口的百分比仍然保持激活。较大的值意味着元素可以更多地离开视口仍然保持激活状态。

## 2.2 实际应用

本节将介绍实际应用中的一些场景。bound属性特别适用于长页面和复杂的阅读体验，可以让目录的激活状态更加符合用户的预期。

# 第三章 实践指南

## 3.1 调整策略

在实际项目中，如何调整bound值？一般来说，对于重要的内容，我们可能希望它在视口中更明显时才被激活，这时候可以增大顶部边界值。

## 3.2 常见配置

一些常见的bound配置方案及其适用场景。默认的20%/20%配置在大多数情况下都能提供良好的体验，但根据具体需求可能需要进行调整。

# 第四章 总结

## 4.1 主要特点

总结bound属性的主要特点和优势。它可以让我们更精细地控制目录的行为，提升用户体验。

## 4.2 最佳实践

一些关于如何使用bound属性的最佳实践建议。根据内容的性质和用户的阅读习惯，选择合适的边界值。
`
</script>

<style scoped>
.demo-toc-bound {
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
  gap: 16px;
  margin-bottom: 12px;
}

.control-item:last-child {
  margin-bottom: 0;
}

.control-item label {
  font-weight: 500;
  color: #555;
  min-width: 150px;
}

.control-item input[type='range'] {
  flex: 1;
  cursor: pointer;
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
  /* padding: 20px; */
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: white;
  position: relative;
}

.bound-indicators {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.bound-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #4a6cf7;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.bound-line.top {
  top: v-bind('bound.top + "px"');
}

.bound-line.bottom {
  bottom: v-bind('bound.bottom + "%"');
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
