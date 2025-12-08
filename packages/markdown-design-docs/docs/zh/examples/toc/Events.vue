<template>
  <div class="demo-toc-events">
    <div class="demo-header">
      <h3>事件处理示例</h3>
      <p>使用onChange和onScroll事件可以监听目录的选择和滚动状态变化</p>
    </div>

    <div class="demo-logs">
      <div class="logs-header">
        <h4>事件日志</h4>
        <button @click="clearLogs" class="clear-btn">清空日志</button>
      </div>
      <div class="logs-content" ref="logsContainer">
        <div v-for="(log, index) in logs" :key="index" :class="['log-item', log.type]">
          <span class="log-time">{{ formatTime(log.time) }}</span>
          <span class="log-type">{{ log.type === 'change' ? 'onChange' : 'onScroll' }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
    </div>

    <div class="demo-content">
      <div class="demo-toc">
        <vmd-toc :smooth="true" @change="handleChange" @scroll="handleScroll" />
      </div>

      <div class="demo-markdown">
        <vmd-render :src="markdown" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const logs = ref([])
const logsContainer = ref(null)

const addLog = (type, message) => {
  logs.value.push({
    type,
    message,
    time: new Date()
  })

  // 保持日志容器滚动到底部
  nextTick(() => {
    if (logsContainer.value) {
      logsContainer.value.scrollTop = logsContainer.value.scrollHeight
    }
  })
}

const clearLogs = () => {
  logs.value = []
}

const formatTime = (date) => {
  const h = date.getHours().toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  const s = date.getSeconds().toString().padStart(2, '0')
  const ms = date.getMilliseconds().toString().padStart(3, '0')
  return `${h}:${m}:${s}.${ms}`
}

const handleChange = (id, heading) => {
  addLog('change', `选中标题: ${heading.text} (ID: ${id})`)
}

const handleScroll = (id, heading) => {
  addLog('scroll', `滚动到标题: ${heading.text} (ID: ${id})`)
}

const markdown = `# 第一章 事件处理介绍

## 1.1 onChange事件

onChange事件在用户点击目录项时触发，可以获取当前选中的标题ID和标题内容。通过监听这个事件，我们可以执行一些自定义操作，如更新状态、记录用户行为等。

## 1.2 onScroll事件

onScroll事件在页面滚动导致当前激活的目录项变化时触发，同样可以获取当前激活的标题ID和标题内容。这个事件对于实现一些与滚动相关的功能非常有用。

# 第二章 事件应用场景

## 2.1 数据统计

通过监听onChange和onScroll事件，我们可以收集用户的浏览行为数据，如用户点击了哪些章节、在每个章节停留了多长时间等。这些数据对于优化内容结构和用户体验非常有价值。

### 2.1.1 点击统计

统计用户点击的目录项可以帮助我们了解哪些内容更受用户关注，从而优化内容的排列和重点。

### 2.1.2 滚动路径

分析用户的滚动路径可以帮助我们理解用户的阅读习惯和内容浏览模式。

## 2.2 自定义交互

基于目录的事件，我们可以实现一些自定义的交互效果，如高亮显示相关内容、显示阅读进度指示器等。

### 2.2.1 同步高亮

当用户点击目录项或滚动页面时，同步高亮显示相关的内容块。

### 2.2.2 阅读进度

根据当前激活的目录项，计算并显示用户的阅读进度。

# 第三章 高级应用

## 3.1 章节间导航

结合onChange事件和自定义逻辑，可以实现更复杂的章节间导航功能，如前后章节快速跳转、章节收藏等。

## 3.2 内容过滤

根据用户的浏览行为，可以动态过滤或推荐相关内容，提供个性化的阅读体验。

## 3.3 无障碍支持

事件处理对于实现无障碍支持也非常重要，可以帮助屏幕阅读器等辅助技术正确识别和响应目录的变化。
`
</script>

<style scoped>
.demo-toc-events {
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

.demo-logs {
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fafafa;
}

.logs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background-color: #f5f5f5;
  border-radius: 8px 8px 0 0;
}

.logs-header h4 {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.clear-btn {
  padding: 4px 12px;
  font-size: 12px;
  background-color: #4a6cf7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clear-btn:hover {
  background-color: #3a59d1;
}

.logs-content {
  max-height: 150px;
  overflow-y: auto;
  padding: 12px 16px;
  font-family: monospace;
  font-size: 12px;
}

.log-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #999;
  min-width: 100px;
}

.log-type {
  font-weight: bold;
  min-width: 80px;
}

.log-type.change {
  color: #4a6cf7;
}

.log-type.scroll {
  color: #10b981;
}

.log-message {
  color: #333;
  flex: 1;
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
