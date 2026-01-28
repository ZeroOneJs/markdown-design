<template>
  <div>
    <p>
      <label>
        <input v-model="typographer" name="checkbox" type="checkbox" />
        Enable typographer
      </label>
    </p>
    <p>
      <label>
        Enter quotes:
        <input
          v-for="(item, index) in quotes"
          :key="item"
          v-model="quotes[index]"
          name="text"
          style="width: 2em; margin: 4px"
        />
      </label>
    </p>
    <vmd-render :src="md" :typographer="typographer" :quotes="[...quotes]" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const typographer = ref(true)
const quotes = ref(['«', '»', '‹', '›'])

const md = `
  Copyright symbol: (c)

  Trademark: (tm)

  Registered trademark: (r)

  "This is a double-quote demo"

  'This is a single-quote demo'
  `
</script>
