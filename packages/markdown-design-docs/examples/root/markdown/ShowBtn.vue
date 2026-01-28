<template>
  <div>
    <p>
      <label>
        <input v-model="showBtn.search" name="checkbox" type="checkbox" />
        Show search button
      </label>
      <label>
        <input v-model="showBtn.toc" name="checkbox" type="checkbox" />
        Show TOC button
      </label>
    </p>
    <vue-markdown :src="md" :show-btn="showBtn" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const showBtn = ref({ toc: true, search: true })

const md = `
  # Lorem ipsum

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus elit fermentum pellentesque vehicula. Suspendisse potenti. Donec iaculis consectetur erat nec placerat. Suspendisse facilisis justo sit amet hendrerit sollicitudin. Suspendisse commodo malesuada massa, ac elementum risus. Ut eu facilisis neque. Fusce tincidunt, ligula vitae eleifend venenatis, purus purus ultrices purus, nec maximus tellus lectus nec leo. Sed auctor magna sed quam dapibus dapibus. Nullam ornare ultricies sem, a iaculis sapien volutpat euismod. Sed ac dictum nulla. Duis euismod tellus vitae diam hendrerit, sit amet vestibulum mauris rhoncus.
  `
</script>
