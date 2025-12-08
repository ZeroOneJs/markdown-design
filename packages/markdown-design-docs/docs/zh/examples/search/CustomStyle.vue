<template>
  <div>
    <h4>自定义搜索框样式</h4>
    <vmd-search v-model="keyword1" class="my-search" placeholder="自定义样式的搜索框" />

    <br />

    <h4>自定义高亮样式</h4>
    <vmd-search v-model="keyword2" class="custom-highlight" placeholder="自定义高亮样式的搜索" />

    <br />

    <h4>深色主题</h4>
    <div class="dark-theme">
      <vmd-search v-model="keyword3" class="dark-search" placeholder="深色主题搜索框" />
    </div>

    <vmd-render :src="content" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword1 = ref('')
const keyword2 = ref('')
const keyword3 = ref('')

const content = `
# 自定义样式演示

这个演示展示了如何通过 CSS 变量来自定义搜索组件的样式。

## 自定义搜索框样式

使用 CSS 变量来自定义搜索框的外观：

\`\`\`css
.my-search {
  --vmd-search-bg: #f5f5f5;
  --vmd-search-border: 2px solid #1890ff;
  --vmd-search-border-radius: 8px;
  --vmd-search-highlight: #ff4d4f;
}
\`\`\`

## 自定义高亮样式

通过深度选择器自定义高亮文本的样式：

\`\`\`css
.custom-highlight :deep(.vmd-search--highlight) {
  background-color: #ffe58f !important;
  color: #000 !important;
  font-weight: bold;
  border-radius: 2px;
  padding: 0 2px;
}
\`\`\`

## 深色主题

为搜索组件创建深色主题：

\`\`\`css
.dark-theme {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 4px;
}

.dark-search {
  --vmd-search-bg: #2d2d2d;
  --vmd-search-border: 1px solid #444;
  --vmd-search-border-radius: 4px;
  --vmd-search-highlight: #1890ff;
  --vmd-search-clearable-color: #999;
  --vmd-search-count-color: #999;
}

.dark-search :deep(.vmd-search__input) {
  color: #fff;
}
\`\`\`

## 可用的 CSS 变量

搜索组件提供了以下 CSS 变量供自定义：

### 基础样式
- \`--vmd-search-w\`: 搜索框宽度
- \`--vmd-search-bg\`: 背景色
- \`--vmd-search-padding\`: 内边距
- \`--vmd-search-font-size\`: 字体大小

### 尺寸相关
- \`--vmd-search-huge-h\`: 巨大尺寸高度
- \`--vmd-search-large-h\`: 大尺寸高度
- \`--vmd-search-normal-h\`: 正常尺寸高度
- \`--vmd-search-small-h\`: 小尺寸高度

### 颜色相关
- \`--vmd-search-border\`: 边框样式
- \`--vmd-search-disabled-opacity\`: 禁用时的透明度
- \`--vmd-search-clearable-color\`: 清除图标颜色
- \`--vmd-search-count-color\`: 计数文字颜色

### 高亮相关
- \`--vmd-search-mark\`: 标记使用的 HTML 标签
- \`--vmd-search-highlight\`: 高亮颜色

## 使用场景

自定义样式适用于：

- **品牌一致性**: 匹配企业品牌色彩和风格
- **主题切换**: 实现亮色/深色主题切换
- **特殊场景**: 适应特定的页面设计需求
- **用户体验**: 提供更符合用户习惯的视觉反馈
`
</script>

<style scoped>
.my-search {
  --vmd-search-bg: #f5f5f5;
  --vmd-search-border: 2px solid #1890ff;
  --vmd-search-border-radius: 8px;
  --vmd-search-highlight: #ff4d4f;
}

.custom-highlight :deep(.vmd-search--highlight) {
  background-color: #ffe58f !important;
  color: #000 !important;
  font-weight: bold;
  border-radius: 2px;
  padding: 0 2px;
}

.dark-theme {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 4px;
  margin: 15px 0;
}

.dark-search {
  --vmd-search-bg: #2d2d2d;
  --vmd-search-border: 1px solid #444;
  --vmd-search-border-radius: 4px;
  --vmd-search-highlight: #1890ff;
  --vmd-search-clearable-color: #999;
  --vmd-search-count-color: #999;
}

.dark-search :deep(.vmd-search__input) {
  color: #fff;
}

h4 {
  margin: 15px 0 8px 0;
  color: #333;
  font-size: 14px;
}
</style>
