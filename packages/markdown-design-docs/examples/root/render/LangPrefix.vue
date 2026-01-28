<template>
  <div>
    <p>
      <label>
        Select class prefix:
        <select v-model="langPrefix" name="select">
          <option value="custom-">Custom prefix: custom-</option>
          <option value="language-">Default prefix: language-</option>
        </select>
      </label>
    </p>
    <vmd-render :src="md" :lang-prefix="langPrefix" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const langPrefix = ref('custom-')

const md = `
  \`\`\` js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  \`\`\`
  `
</script>

<style>
.custom-js {
  color: #666666 !important;
}
.custom-js .hljs-keyword {
  color: #ab5959 !important;
}
.custom-js .hljs-title {
  color: #59873a !important;
}
.custom-js .hljs-variable,
.custom-js .hljs-params {
  color: #b07d48 !important;
}
.custom-js .hljs-string {
  color: #b56959 !important;
}
</style>
