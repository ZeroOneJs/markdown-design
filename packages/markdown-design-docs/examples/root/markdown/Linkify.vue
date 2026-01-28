<template>
  <div>
    <p>
      <label>
        <input v-model="linkify" name="checkbox" type="checkbox" />
        Enable linkify
      </label>
    </p>
    <vue-markdown :src="md" :linkify="linkify" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const linkify = ref(true)

const md = `
  Link: [https://www.example.com](https://www.example.com)

  URL-like text: https://www.example.com
  `
</script>
