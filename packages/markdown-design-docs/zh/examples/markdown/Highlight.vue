<template>
  <div>
    <p>
      <label>
        <input v-model="highlight" name="checkbox" type="checkbox" />
        启用 highlight
      </label>
    </p>
    <h4>布尔值：</h4>
    <vue-markdown :src="md" :highlight="highlight" />
    <h4>函数：</h4>
    <vue-markdown :src="md" :highlight="highlight && customHighlight" />
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
