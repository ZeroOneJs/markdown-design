<template>
  <div class="demo-toc-render-item">
    <div class="demo-header">
      <h3>自定义目录项渲染示例</h3>
      <p>使用renderItem属性可以自定义每个目录项的渲染方式</p>
    </div>

    <div class="demo-controls">
      <div class="control-item">
        <label>选择渲染样式：</label>
        <select v-model="renderStyle" @change="updateRenderItem">
          <option value="default">默认样式</option>
          <option value="icon">带图标</option>
          <option value="number">带编号</option>
          <option value="status">带状态</option>
          <option value="custom">完全自定义</option>
        </select>
      </div>
    </div>

    <div class="demo-content">
      <div class="demo-toc">
        <vmd-toc :renderItem="renderItem" />
      </div>

      <div class="demo-markdown">
        <vmd-render :src="markdown" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'

const renderStyle = ref('default')
const renderItem = ref(null)
const statusMap = new Map()

// 初始化状态映射
const initializeStatusMap = () => {
  // 模拟已读/未读状态
  const statuses = ['已读', '未读', '重点']

  // 为每个标题生成一个随机状态
  for (let i = 1; i <= 10; i++) {
    statusMap.set(`h-${i}`, statuses[Math.floor(Math.random() * statuses.length)])
  }
}

const updateRenderItem = () => {
  switch (renderStyle.value) {
    case 'default':
      renderItem.value = null
      break
    case 'icon':
      renderItem.value = (props) => {
        const { id, text, level, active, onClick } = props
        const icon = level === 1 ? '📌' : level === 2 ? '📋' : '📝'

        return h(
          'div',
          {
            class: ['toc-item', { active }],
            onClick,
            style: {
              paddingLeft: `${(level - 1) * 20}px`,
              cursor: 'pointer',
              padding: '6px 0',
              color: active ? '#4a6cf7' : '#333',
              fontWeight: active ? 'bold' : 'normal'
            }
          },
          [`${icon} ${text}`]
        )
      }
      break
    case 'number':
      renderItem.value = (props) => {
        const { id, text, level, active, onClick } = props
        // 简单的编号生成逻辑
        const number = id.split('-').slice(1).join('.')

        return h(
          'div',
          {
            class: ['toc-item', { active }],
            onClick,
            style: {
              paddingLeft: `${(level - 1) * 20}px`,
              cursor: 'pointer',
              padding: '6px 0',
              color: active ? '#4a6cf7' : '#333',
              fontWeight: active ? 'bold' : 'normal',
              fontFamily: 'monospace'
            }
          },
          [`${number}. ${text}`]
        )
      }
      break
    case 'status':
      // 确保状态映射已初始化
      if (statusMap.size === 0) {
        initializeStatusMap()
      }

      renderItem.value = (props) => {
        const { id, text, level, active, onClick } = props
        const status = statusMap.get(id) || '未知'
        let statusClass = ''

        switch (status) {
          case '已读':
            statusClass = 'status-read'
            break
          case '未读':
            statusClass = 'status-unread'
            break
          case '重点':
            statusClass = 'status-important'
            break
        }

        return h(
          'div',
          {
            class: ['toc-item', { active }],
            onClick,
            style: {
              paddingLeft: `${(level - 1) * 20}px`,
              cursor: 'pointer',
              padding: '6px 0',
              color: active ? '#4a6cf7' : '#333',
              fontWeight: active ? 'bold' : 'normal',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }
          },
          [
            text,
            h(
              'span',
              {
                class: [`status-badge ${statusClass}`],
                style: {
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  backgroundColor:
                    status === '已读' ? '#e8f5e8' : status === '未读' ? '#fff3e0' : '#ffebee',
                  color: status === '已读' ? '#2e7d32' : status === '未读' ? '#ef6c00' : '#c62828'
                }
              },
              [status]
            )
          ]
        )
      }
      break
    case 'custom':
      renderItem.value = (props) => {
        const { id, text, level, active, onClick } = props

        return h(
          'div',
          {
            class: ['toc-item', { active }],
            onClick,
            style: {
              paddingLeft: `${(level - 1) * 20}px`,
              cursor: 'pointer',
              padding: '8px 12px',
              margin: '2px 0',
              borderRadius: '6px',
              backgroundColor: active ? '#e3f2fd' : '#fafafa',
              color: active ? '#1565c0' : '#333',
              fontWeight: active ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
              borderLeft: active ? '3px solid #4a6cf7' : '3px solid transparent'
            }
          },
          [text]
        )
      }
      break
  }
}

const markdown = `# 第一章 自定义渲染介绍

## 1.1 什么是自定义渲染

自定义渲染是指允许用户自定义组件内部元素的显示方式。在TOC组件中，我们可以通过renderItem属性来自定义每个目录项的渲染方式。

## 1.2 为什么需要自定义渲染

在实际项目中，不同的场景可能需要不同的目录样式。通过自定义渲染，我们可以：

- 根据项目的设计风格定制目录外观
- 添加额外的信息或状态指示
- 实现特殊的交互效果
- 提升用户体验

# 第二章 自定义渲染的实现方式

## 2.1 renderItem函数

renderItem是一个函数属性，它接收一个包含目录项信息的对象作为参数，并返回一个Vue VNode。

### 2.1.1 参数说明

renderItem函数接收的参数对象包含以下属性：

- id: 目录项的唯一标识符
- text: 目录项的文本内容
- level: 目录项的层级（1-6）
- active: 目录项是否处于激活状态
- onClick: 点击目录项的回调函数

### 2.1.2 返回值

renderItem函数应该返回一个Vue VNode，可以使用Vue的h函数或JSX来创建。

## 2.2 示例代码

\`\`\`javascript
// 使用h函数创建VNode
const customRenderItem = (props) => {
  const { id, text, level, active, onClick } = props

  return h(
    'div',
    {
      class: ['custom-toc-item', { active }],
      onClick,
      style: {
        paddingLeft: \`${(level - 1) * 20}px\`
      }
    },
    [\`📌 ${text}\`]
  )
}
\`\`\`

# 第三章 实际应用场景

## 3.1 文档管理系统

在文档管理系统中，我们可能需要在目录中显示文档的状态（如已读/未读、重要程度等）。

## 3.2 学习平台

在学习平台中，我们可能需要在目录中显示学习进度、完成状态等信息。

## 3.3 项目文档

在项目文档中，我们可能需要根据文档的类型或重要性显示不同的图标或样式。

# 第四章 性能考虑

## 4.1 渲染性能

自定义渲染可能会影响组件的性能，特别是当目录项数量很多时。为了保持良好的性能，建议：

- 避免在renderItem函数中执行复杂的计算
- 避免创建过多的DOM元素
- 使用Vue的缓存机制

## 4.2 最佳实践

在使用自定义渲染时，建议遵循以下最佳实践：

- 保持渲染逻辑简单明了
- 复用相同类型的目录项渲染逻辑
- 考虑响应式设计
- 测试在不同浏览器中的兼容性
`
</script>

<style scoped>
.demo-toc-render-item {
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

/* 自定义目录项的基础样式 */
:deep(.toc-item) {
  user-select: none;
}

:deep(.toc-item:hover) {
  opacity: 0.8;
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
