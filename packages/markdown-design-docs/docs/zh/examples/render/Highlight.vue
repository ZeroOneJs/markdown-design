<template>
  <div>
    <div style="margin-bottom: 16px">
      <label>
        <input v-model="highlight" type="checkbox" />
        启用 highlight
      </label>
    </div>
    <p>布尔值：</p>
    <vmd-render :src="md" :highlight="highlight" />
    <p>函数：</p>
    <vmd-render :src="md" :highlight="highlight && customHighlight" />
  </div>
</template>

<script setup>
// npm i highlight.js
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { ref } from 'vue'

const highlight = ref(true)
const customHighlight = (str, language) => {
  return hljs.highlight(str, { language }).value
}

const md = `
  \`\`\` js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  \`\`\`
  `
</script>
