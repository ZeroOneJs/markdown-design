<template>
  <div>
    <p>
      <label>
        Select a preset:
        <select v-model="presetName" name="select">
          <option v-for="item in options" :key="item" :value="item">{{ item }}</option>
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
  | Preset Name                                                                                     | Description                               |
  | ----------------------------------------------------------------------------------------------- | ----------------------------------------- |
  | [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs)       | Similar to GFM                            |
  | [commonmark](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) | See [CommonMark](https://commonmark.org/) |
  | [zero](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs)             | Disables all syntax rules                 |
  `
</script>
