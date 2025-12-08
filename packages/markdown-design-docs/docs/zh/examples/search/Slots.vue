<template>
  <div>
    <h4>前缀插槽</h4>
    <vmd-search v-model="keyword1" placeholder="带前缀图标的搜索框">
      <template #prefix>
        <span class="search-prefix">🔍</span>
      </template>
    </vmd-search>

    <br />

    <h4>后缀插槽</h4>
    <vmd-search v-model="keyword2" placeholder="带后缀按钮的搜索框">
      <template #suffix>
        <button class="search-button" @click="handleSearch">搜索</button>
      </template>
    </vmd-search>

    <br />

    <h4>自定义结果项</h4>
    <vmd-search v-model="keyword3" placeholder="自定义结果项样式">
      <template #resultItem="{ item, index, active }">
        <div class="custom-result-item" :class="{ active }">
          <span class="result-icon">📄</span>
          <span class="result-text">{{ item.text }}</span>
          <span class="result-index">{{ index + 1 }}</span>
        </div>
      </template>
    </vmd-search>

    <br />

    <h4>空结果插槽</h4>
    <vmd-search v-model="keyword4" placeholder="自定义空结果展示">
      <template #empty>
        <div class="custom-empty">
          <span class="empty-icon">🤔</span>
          <span class="empty-text">没有找到相关内容</span>
        </div>
      </template>
    </vmd-search>

    <vmd-render :src="content" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword1 = ref('')
const keyword2 = ref('')
const keyword3 = ref('')
const keyword4 = ref('')

const handleSearch = () => {
  alert(`搜索关键词: ${keyword2.value}`)
}

const content = `
# 插槽自定义演示

这个演示展示了搜索组件提供的各种插槽，用于自定义组件的不同部分。

## 可用插槽

### prefix 插槽

自定义搜索框的前缀内容：

\`\`\`vue
<vmd-search v-model="keyword">
  <template #prefix>
    <span class="search-prefix">🔍</span>
  </template>
</vmd-search>
\`\`\`

### suffix 插槽

自定义搜索框的后缀内容：

\`\`\`vue
<vmd-search v-model="keyword">
  <template #suffix>
    <button class="search-button" @click="handleSearch">搜索</button>
  </template>
</vmd-search>
\`\`\`

### resultItem 插槽

自定义搜索结果项的展示：

\`\`\`vue
<vmd-search v-model="keyword">
  <template #resultItem="{ item, index, active }">
    <div class="custom-result-item" :class="{ active }">
      <span class="result-icon">📄</span>
      <span class="result-text">{{ item.text }}</span>
      <span class="result-index">{{ index + 1 }}</span>
    </div>
  </template>
</vmd-search>
\`\`\`

### empty 插槽

自定义无搜索结果时的展示：

\`\`\`vue
<vmd-search v-model="keyword">
  <template #empty>
    <div class="custom-empty">
      <span class="empty-icon">🤔</span>
      <span class="empty-text">没有找到相关内容</span>
    </div>
  </template>
</vmd-search>
\`\`\`

## 插槽参数

不同插槽接收不同的参数：

- \`resultItem\`: 接收 \`{ item, index, active }\` 参数
  - \`item\`: 搜索结果项数据
  - \`index\`: 结果项索引
  - \`active\`: 是否为当前选中项
- \`prefix\`, \`suffix\`, \`empty\`: 不接收参数

## 使用场景

插槽适用于需要：

- **品牌化**: 添加公司 logo 或特定图标
- **功能扩展**: 添加额外的按钮或控件
- **样式定制**: 完全自定义搜索结果的展示方式
- **用户体验**: 提供更友好的空状态提示
`
</script>

<style scoped>
.search-prefix {
  padding: 0 8px;
  font-size: 16px;
}

.search-button {
  padding: 4px 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 12px;
}

.search-button:hover {
  background-color: #66b1ff;
}

.custom-result-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  transition: background-color 0.2s;
}

.custom-result-item.active {
  background-color: #e6f7ff;
}

.result-icon {
  margin-right: 8px;
}

.result-text {
  flex: 1;
}

.result-index {
  color: #999;
  font-size: 12px;
}

.custom-empty {
  text-align: center;
  padding: 20px;
  color: #999;
}

.empty-icon {
  display: block;
  font-size: 24px;
  margin-bottom: 8px;
}

h4 {
  margin: 15px 0 8px 0;
  color: #333;
  font-size: 14px;
}
</style>
