<template>
  <div class="vp-demo">
    <!-- markdown-it-container 下默认插槽会有内容，因此需要使用具名插槽 -->
    <div class="vp-demo__wrapper vp-raw">
      <!-- 延迟挂载组件，避免页面导航查询到组件内的 HTMLHeadingElement -->
      <slot v-if="isMounted" name="component"></slot>
    </div>
    <details class="vp-demo__details">
      <summary class="vp-demo__details-summary">{{ summary }}</summary>

      <slot name="code"></slot>
    </details>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps({ summary: String })

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<style scoped lang="less">
.vp-demo {
  padding: 0 24px;
  margin-top: 16px;
  background: #f7f7f7;
  display: flow-root;
  &__wrapper {
    margin-top: 24px;
  }
  &__details {
    --vp-code-block-bg: #fff;
    border-top: 1px solid #e2e2e3;
    margin-top: 24px;
    overflow: auto;
    &-summary {
      font-weight: bold;
      font-size: 14px;
      color: var(--vp-code-color);
      margin-left: 4px;
      cursor: pointer;
    }
  }
  :deep(div[class*='language-']) {
    border-radius: 0;
    margin: 16px 0 24px; // 防止移动端下代码块溢出容器
  }
}
// 在移动端下增大显示宽度
@media (max-width: 640px) {
  .vp-demo {
    margin-left: -24px;
    margin-right: -24px;
  }
}
</style>
