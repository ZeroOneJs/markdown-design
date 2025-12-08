<template>
  <div>
    <div>
      <input v-model="highlight" id="checkbox" type="checkbox" />
      <label for="checkbox">启用 highlight</label>
    </div>
    <!-- customHighlight 只是作为函数传参演示，组件已经内置 highlight.js，可以直接传布尔值开启/禁用代码高亮 -->
    <vue-markdown :src="md" :highlight="highlight && customHighlight" />
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { ref } from 'vue'

const md = `
\`\`\`javascript
function hello() {
  console.log('Hello JavaScript!');
}
\`\`\`
`

const highlight = ref(true)
const customHighlight = (str, language) => {
  return hljs.getLanguage(language) ? hljs.highlight(str, { language }).value : ''
}
</script>
