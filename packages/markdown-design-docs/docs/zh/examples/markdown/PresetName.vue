<template>
  <div>
    <div>
      <label>请选择预设模式：</label>
      <select v-model="presetName">
        <option v-for="item in options" :key="item" :value="item">{{ item }} 模式</option>
      </select>
    </div>
    <template v-for="item in options" :key="item">
      <vue-markdown v-if="item === presetName" :src="md" :preset-name="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const md = `
|模式|说明|
|-|-|
|[default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs)|默认模式，类似GFM。|
|[commonmark](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs)|[CommonMark](https://commonmark.org/)模式。|
|[zero](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs)|禁用所有语法规则|
`

const presetName = ref('default')

const options = ['default', 'commonmark', 'zero']
</script>
