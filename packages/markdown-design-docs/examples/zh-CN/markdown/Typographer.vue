<template>
  <div>
    <p>
      <label>
        <input v-model="typographer" name="checkbox" type="checkbox" />
        启用 typographer
      </label>
    </p>
    <p>
      <label>
        请输入引号：
        <input
          v-for="(item, index) in quotes"
          :key="item"
          v-model="quotes[index]"
          name="text"
          style="width: 2em; margin: 4px"
        />
      </label>
    </p>
    <vue-markdown :src="md" :typographer="typographer" :quotes="[...quotes]" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const typographer = ref(true)
const quotes = ref(['«', '»', '‹', '›'])

const md = `
  版权符号：(c)

  注册中商标：(tm)

  注册商标：(r)

  "这是一个双引号示例"

  '这是一个单引号示例'
  `
</script>
