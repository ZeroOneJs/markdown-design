<template>
  <div>
    <p>
      <label>
        请选择预设规则：
        <select v-model="presetName" name="select">
          <option v-for="item in options" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </p>
    <template v-for="item in options" :key="item">
      <vue-markdown v-if="item === presetName" :src="md" :preset-name="item" />
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const options = ['default', 'commonmark', 'zero']
const presetName = ref('default')

const md = `
  | 预设名称                                                                                        | 说明                                |
  | ----------------------------------------------------------------------------------------------- | ----------------------------------- |
  | [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs)       | 默认预设，类似 GFM                  |
  | [commonmark](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) | 详情[请看](https://commonmark.org/) |
  | [zero](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs)             | 所有语法规则都不会启用              |
  `
</script>
