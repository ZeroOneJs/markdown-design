<template>
  <div class="demo-toc-methods">
    <div class="demo-header">
      <h3>方法调用示例</h3>
      <p>使用组件的方法可以程序化地控制目录的行为</p>
    </div>

    <div class="demo-controls">
      <div class="control-item">
        <label>选择目标章节：</label>
        <select v-model="selectedHeadingId">
          <option value="">-- 请选择章节 --</option>
          <option v-for="heading in headings" :key="heading.id" :value="heading.id">
            {{ heading.text }}
          </option>
        </select>
        <button @click="scrollToHeading" :disabled="!selectedHeadingId" class="scroll-btn">
          滚动到章节
        </button>
      </div>
      <div class="control-item">
        <label>
          <input type="checkbox" v-model="smoothScroll" />
          启用平滑滚动
        </label>
      </div>
    </div>

    <div class="demo-scroll-status">
      <div class="status-item">
        <span class="status-label">滚动状态：</span>
        <span :class="['status-value', scrollStatus]">{{ scrollStatusText }}</span>
      </div>
      <div class="status-item" v-if="currentHeading">
        <span class="status-label">当前章节：</span>
        <span class="status-value">{{ currentHeading.text }}</span>
      </div>
    </div>

    <div class="demo-content">
      <div class="demo-toc">
        <vmd-toc ref="tocRef" :smooth="smoothScroll" @scrollTo="handleScrollTo" />
      </div>

      <div class="demo-markdown">
        <vmd-render :src="markdown" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const tocRef = ref(null)
const selectedHeadingId = ref('')
const smoothScroll = ref(true)
const scrollStatus = ref('idle') // idle, scrolling, completed
const scrollStatusText = ref('空闲')
const currentHeading = ref(null)

// 模拟的标题数据
const headings = ref([
  { id: 'h-1', text: '第一章 总述' },
  { id: 'h-1-1', text: '1.1 引言' },
  { id: 'h-1-2', text: '1.2 背景' },
  { id: 'h-2', text: '第二章 方法介绍' },
  { id: 'h-2-1', text: '2.1 scrollTo方法' },
  { id: 'h-2-1-1', text: '2.1.1 基本用法' },
  { id: 'h-2-1-2', text: '2.1.2 参数说明' },
  { id: 'h-2-2', text: '2.2 onScrollTo事件' },
  { id: 'h-3', text: '第三章 应用场景' },
  { id: 'h-4', text: '第四章 总结' }
])

const scrollToHeading = async () => {
  if (!selectedHeadingId.value || !tocRef.value) return

  scrollStatus.value = 'scrolling'
  scrollStatusText.value = '滚动中...'

  try {
    // 调用组件的scrollTo方法
    await tocRef.value.scrollTo(selectedHeadingId.value, { smooth: smoothScroll.value })

    // 等待滚动完成
    await nextTick()

    scrollStatus.value = 'completed'
    scrollStatusText.value = '滚动完成'

    // 3秒后重置状态
    setTimeout(() => {
      scrollStatus.value = 'idle'
      scrollStatusText.value = '空闲'
    }, 3000)
  } catch (error) {
    console.error('滚动失败:', error)
    scrollStatus.value = 'idle'
    scrollStatusText.value = '滚动失败'
  }
}

const handleScrollTo = (id, heading) => {
  // 当滚动到目标章节时触发
  currentHeading.value = heading

  // 更新选择框的值
  selectedHeadingId.value = id

  // 如果是通过代码调用的滚动，这里也会触发
  if (scrollStatus.value === 'scrolling') {
    scrollStatus.value = 'completed'
    scrollStatusText.value = '滚动完成'
  }
}

const markdown = `# 第一章 总述

## 1.1 引言

这是一个简单的引言部分，用于介绍本文档的主题和目的。在这个示例中，我们将学习如何使用TOC组件的方法来程序化地控制目录的行为。

## 1.2 背景

在开始具体内容之前，我们先来了解一些相关的背景信息。组件的方法调用是一种强大的交互方式，可以让我们在代码中控制组件的行为。

# 第二章 方法介绍

## 2.1 scrollTo方法

scrollTo方法允许我们在代码中控制滚动到指定的目录项。这在一些需要程序化导航的场景中非常有用。

### 2.1.1 基本用法

\`\`\`javascript
// 引用TOC组件
const tocRef = ref(null)

// 调用scrollTo方法
await tocRef.value.scrollTo('heading-id', { smooth: true })
\`\`\`

### 2.1.2 参数说明

- \`id\`: 目标标题的ID，必需参数
- \`options\`: 可选的配置对象，包含：
  - \`smooth\`: 是否启用平滑滚动，默认为true
  - \`offset\`: 滚动偏移量，会覆盖组件的全局offset设置

## 2.2 onScrollTo事件

当通过scrollTo方法滚动到目标章节时，会触发onScrollTo事件。这个事件可以用来执行一些后续操作，如更新UI状态、记录用户行为等。

# 第三章 应用场景

## 3.1 程序化导航

在一些复杂的应用中，我们可能需要根据用户的操作或其他条件来自动导航到特定的章节。例如：

- 根据URL参数自动跳转到特定章节
- 根据用户的阅读历史自动跳转到上次阅读的位置
- 在完成某个操作后自动跳转到相关章节

## 3.2 自定义交互控件

结合scrollTo方法，我们可以创建自定义的导航控件，提供更丰富的用户交互体验。例如：

- 前后章节快速跳转按钮
- 阅读进度指示器
- 目录搜索和过滤功能

# 第四章 总结

## 4.1 方法与事件的配合

通过scrollTo方法和onScrollTo事件的配合使用，我们可以实现更加灵活和强大的目录导航功能。这对于创建复杂的文档阅读体验非常重要。

## 4.2 最佳实践

在使用组件方法时，建议遵循以下最佳实践：

- 使用try/catch来处理可能的错误
- 等待异步操作完成后再执行后续操作
- 考虑用户体验，提供适当的反馈
- 避免频繁调用可能影响性能的方法`
</script>

<style scoped>
.demo-toc-methods {
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
  gap: 12px;
  margin-bottom: 12px;
}

.control-item:last-child {
  margin-bottom: 0;
}

.control-item label {
  font-weight: 500;
  color: #555;
  min-width: 120px;
}

.control-item select {
  flex: 1;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.scroll-btn {
  padding: 6px 16px;
  background-color: #4a6cf7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.scroll-btn:hover:not(:disabled) {
  background-color: #3a59d1;
}

.scroll-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.control-item input[type='checkbox'] {
  cursor: pointer;
}

.demo-scroll-status {
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f0f8ff;
  border: 1px solid #e3f2fd;
  border-radius: 8px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.status-item:last-child {
  margin-bottom: 0;
}

.status-label {
  font-weight: 500;
  color: #555;
  min-width: 100px;
}

.status-value {
  color: #333;
}

.status-value.scrolling {
  color: #ff9800;
}

.status-value.completed {
  color: #4caf50;
}

.status-value.idle {
  color: #666;
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
