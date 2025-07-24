<template>
  <div class="demo">
    <component class="vp-raw" :is="name" />
    <details class="demo__details">
      <summary class="demo__details-summary">{{ summary }}</summary>
      <!-- 屏蔽默认插槽 -->
      <slot name="code"></slot>
    </details>
  </div>
</template>

<script setup lang="ts">
defineProps({ name: String, summary: String })
</script>

<style scoped lang="less">
.demo {
  border: 1px solid #e2e2e3;
  padding: 16px 16px 0;
  border-radius: 16px;
  margin-top: 16px;
  &__details {
    border-top: 1px solid #e2e2e3;
    margin-top: 16px;
    &-summary {
      font-weight: bold;
      font-size: 14px;
      color: #3c3c43;
    }
  }
}
</style>
