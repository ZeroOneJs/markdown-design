<template>
  <div>
    <h4>高级搜索配置</h4>
    <vmd-search
      v-model="keyword"
      :caseSensitive="caseSensitive"
      :wholeWord="wholeWord"
      :regExp="regExp"
      :highlightTag="highlightTag"
      :highlightClass="highlightClass"
      :minLength="minLength"
      :debounce="debounce"
      :maxResults="maxResults"
      placeholder="体验高级搜索功能"
    />

    <div class="config-panel">
      <h5>搜索配置</h5>
      <div class="config-item">
        <label>
          <input type="checkbox" v-model="caseSensitive" />
          区分大小写
        </label>
      </div>
      <div class="config-item">
        <label>
          <input type="checkbox" v-model="wholeWord" />
          全词匹配
        </label>
      </div>
      <div class="config-item">
        <label>
          <input type="checkbox" v-model="regExp" />
          正则表达式
        </label>
      </div>
      <div class="config-item">
        <label>
          高亮标签:
          <select v-model="highlightTag">
            <option value="mark">mark</option>
            <option value="em">em</option>
            <option value="strong">strong</option>
            <option value="span">span</option>
          </select>
        </label>
      </div>
      <div class="config-item">
        <label>
          最小长度:
          <input type="number" v-model="minLength" min="1" max="10" />
        </label>
      </div>
      <div class="config-item">
        <label>
          防抖时间(ms):
          <input type="number" v-model="debounce" min="0" max="2000" step="100" />
        </label>
      </div>
      <div class="config-item">
        <label>
          最大结果数:
          <input type="number" v-model="maxResults" min="1" max="50" />
        </label>
      </div>
    </div>

    <vmd-render :src="content" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
const caseSensitive = ref(false)
const wholeWord = ref(false)
const regExp = ref(false)
const highlightTag = ref('mark')
const highlightClass = ref('search-highlight')
const minLength = ref(1)
const debounce = ref(300)
const maxResults = ref(20)

const content = `
# 高级搜索功能演示

这个演示展示了搜索组件的高级配置选项，让您能够精确控制搜索行为。

## 高级配置选项

### 搜索模式

- **区分大小写 (caseSensitive)**: 控制搜索是否区分大小写
  - \`false\`: 不区分大小写（默认）
  - \`true\`: 区分大小写

- **全词匹配 (wholeWord)**: 只匹配完整的单词
  - \`false\`: 部分匹配（默认）
  - \`true\`: 全词匹配

- **正则表达式 (regExp)**: 启用正则表达式搜索
  - \`false\`: 普通文本搜索（默认）
  - \`true\`: 正则表达式搜索

### 高亮配置

- **高亮标签 (highlightTag)**: 设置高亮使用的 HTML 标签
  - \`'mark'\`: 使用 \`<mark>\` 标签（默认）
  - \`'em'\`: 使用 \`<em>\` 标签
  - \`'strong'\`: 使用 \`<strong>\` 标签
  - \`'span'\`: 使用 \`<span>\` 标签

- **高亮类名 (highlightClass)**: 为高亮元素添加 CSS 类名
  - 默认: \`'search-highlight'\`
  - 可以自定义样式类

### 性能优化

- **最小长度 (minLength)**: 触发搜索的最小字符长度
  - 默认: \`1\`
  - 可以防止输入过短时的无效搜索

- **防抖时间 (debounce)**: 输入防抖延迟时间（毫秒）
  - 默认: \`300\`
  - 减少频繁搜索带来的性能开销

- **最大结果数 (maxResults)**: 限制搜索结果的最大数量
  - 默认: \`20\`
  - 避免过多结果影响性能

## 组合使用

这些选项可以组合使用，实现复杂的搜索需求：

\`\`\`vue
<vmd-search
  v-model="keyword"
  :caseSensitive="true"
  :wholeWord="true"
  :regExp="false"
  highlightTag="strong"
  highlightClass="custom-highlight"
  :minLength="3"
  :debounce="500"
  :maxResults="10"
/>
\`\`\`

## 使用场景

高级搜索配置适用于：

- **技术文档**: 需要精确匹配代码或技术术语
- **法律文档**: 需要区分大小写和全词匹配
- **大数据集**: 需要性能优化和结果限制
- **专业搜索**: 需要正则表达式等高级功能
`
</script>

<style scoped>
.config-panel {
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.config-panel h5 {
  margin: 0 0 15px 0;
  color: #333;
}

.config-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.config-item label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.config-item input[type='checkbox'] {
  margin: 0;
}

.config-item select,
.config-item input[type='number'] {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
}

h4 {
  margin: 15px 0 10px 0;
  color: #333;
}
</style>
