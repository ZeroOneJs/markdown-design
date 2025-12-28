<template>
  <div class="demo">
    <!-- 延迟挂载组件，避免页面导航查询到组件内的 HTMLHeadingElement -->
    <div class="demo__wrapper vp-raw">
      <component v-if="isMounted" :is="name" />
    </div>
    <details class="demo__details">
      <summary class="demo__details-summary">{{ summary }}</summary>
      <!-- 屏蔽默认插槽 -->
      <slot name="code"></slot>
    </details>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps({ name: String, summary: String })

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<style scoped lang="less">
.demo {
  padding: 0 16px;
  margin-top: 16px;
  background: #f7f7f7;
  display: flow-root;
  &__wrapper {
    margin-top: 16px;
  }
  &__details {
    --vp-code-block-bg: #fff;
    border-top: 1px solid #e2e2e3;
    margin-top: 16px;
    overflow: auto;
    &-summary {
      font-weight: bold;
      font-size: 14px;
      color: var(--vp-code-color);
      margin-left: 4px;
      cursor: pointer;
    }
  }
}
</style>
