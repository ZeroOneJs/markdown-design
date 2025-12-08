<template>
  <div>
    <vmd-search
      v-model="keyword"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      @clear="handleClear"
      @close="handleClose"
      @stepClick="handleStepClick"
      @totalChange="handleTotalChange"
      @indexChange="handleIndexChange"
      placeholder="输入关键词体验各种事件"
    />

    <div class="event-panel">
      <h4>事件日志</h4>
      <div class="event-log" v-for="(log, index) in eventLogs" :key="index">
        {{ log }}
      </div>
    </div>

    <vmd-render :src="content" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
const eventLogs = ref<string[]>([])

const addLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${timestamp}] ${message}`)
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop()
  }
}

const handleInput = (event: Event) => {
  addLog(`input 事件: ${keyword.value}`)
}

const handleChange = (event: Event) => {
  addLog(`change 事件: ${keyword.value}`)
}

const handleBlur = (event: FocusEvent) => {
  addLog('blur 事件: 搜索框失去焦点')
}

const handleFocus = (event: FocusEvent) => {
  addLog('focus 事件: 搜索框获得焦点')
}

const handleClear = () => {
  addLog('clear 事件: 内容已清除')
}

const handleClose = () => {
  addLog('close 事件: 搜索框已关闭')
}

const handleStepClick = (direction: 'prev' | 'next') => {
  addLog(`stepClick 事件: 切换到${direction === 'prev' ? '上一个' : '下一个'}结果`)
}

const handleTotalChange = (total: number) => {
  addLog(`totalChange 事件: 搜索结果总数变为 ${total}`)
}

const handleIndexChange = (index: number) => {
  addLog(`indexChange 事件: 当前选中索引变为 ${index}`)
}

const content = `
# 事件监听演示

这个演示展示了搜索组件提供的丰富事件监听功能。

## 可用事件

搜索组件提供了以下事件：

### 输入事件

- \`input\`: 输入内容变化时触发
- \`change\`: 输入框值改变时触发（失焦后）

### 焦点事件

- \`focus\`: 搜索框获得焦点时触发
- \`blur\`: 搜索框失去焦点时触发

### 操作事件

- \`clear\`: 点击清除按钮时触发
- \`close\`: 点击关闭图标时触发
- \`stepClick\`: 点击上一个/下一个按钮时触发

### 状态事件

- \`totalChange\`: 搜索结果总数变化时触发
- \`indexChange\`: 当前选中索引变化时触发

## 事件使用

您可以通过 \`@\` 语法监听这些事件：

\`\`\`vue
<vmd-search
  v-model="keyword"
  @input="handleInput"
  @change="handleChange"
  @focus="handleFocus"
  @blur="handleBlur"
  @clear="handleClear"
  @close="handleClose"
  @stepClick="handleStepClick"
  @totalChange="handleTotalChange"
  @indexChange="handleIndexChange"
/>
\`\`\`

## 事件参数

不同的事件会携带不同的参数：

- \`input\`, \`change\`: 原生 Event 对象
- \`focus\`, \`blur\`: FocusEvent 对象
- \`stepClick\`: \`'prev'\` 或 \`'next'\`
- \`totalChange\`: 搜索结果总数（数字）
- \`indexChange\`: 当前选中索引（数字）

## 使用场景

事件监听可以用于：

- **数据统计**: 记录用户的搜索行为
- **联动操作**: 根据搜索状态更新其他组件
- **用户反馈**: 提供搜索状态的视觉反馈
- **日志记录**: 记录搜索操作日志
`
</script>

<style scoped>
.event-panel {
  margin: 15px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.event-panel h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.event-log {
  padding: 5px 0;
  font-size: 13px;
  color: #666;
  border-bottom: 1px solid #eee;
}

.event-log:last-child {
  border-bottom: none;
}
</style>
