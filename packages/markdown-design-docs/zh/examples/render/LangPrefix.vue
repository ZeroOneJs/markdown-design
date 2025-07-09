<template>
  <div>
    <p>
      <label>
        请选择类名前缀：
        <select v-model="langPrefix" name="select">
          <option value="custom-">自定义类名前缀 custom-</option>
          <option value="language-">默认类名前缀 language-</option>
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
