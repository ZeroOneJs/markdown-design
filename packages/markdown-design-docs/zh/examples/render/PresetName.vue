<template>
  <div>
    <p>
      <label>
        请选择预设规则：
        <select v-model="presetName" name="select">
          <option v-for="item in options" :key="item" :value="item">{{ item }} 规则</option>
        </select>
      </label>
    </p>
    <template v-for="item in options" :key="item">
      <vmd-render v-if="item === presetName" :src="md" :preset-name="item" />
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const options = ['default', 'commonmark', 'zero']
const presetName = ref('default')

const md = `
  | 规则                                                                                            | 说明                                  |
  | ----------------------------------------------------------------------------------------------- | ------------------------------------- |
  | [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs)       | 默认规则，类似 GFM。                  |
  | [commonmark](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) | 详情[请看](https://commonmark.org/)。 |
  | [zero](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs)             | 所有规则都不会启用                    |
  `
</script>
