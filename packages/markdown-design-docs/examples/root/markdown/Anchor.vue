<template>
  <div>
    <h4>Default heading rendering:</h4>
    <p>
      <label>
        <input v-model="permalink" name="checkbox" type="checkbox" />
        Enable permalink (hover the heading to show the permalink symbol)
      </label>
    </p>
    <vue-markdown :src="md" :permalink="permalink" />
    <h4>Custom heading rendering:</h4>
    <vue-markdown :src="md" :anchor="anchorOptions" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const permalink = ref(true)

const anchorOptions = (anchor) => ({
  permalink: anchor.permalink.headerLink()
})

const md = `
  # Lorem ipsum

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus elit fermentum pellentesque vehicula. Suspendisse potenti. Donec iaculis consectetur erat nec placerat. Suspendisse facilisis justo sit amet hendrerit sollicitudin. Suspendisse commodo malesuada massa, ac elementum risus. Ut eu facilisis neque. Fusce tincidunt, ligula vitae eleifend venenatis, purus purus ultrices purus, nec maximus tellus lectus nec leo. Sed auctor magna sed quam dapibus dapibus. Nullam ornare ultricies sem, a iaculis sapien volutpat euismod. Sed ac dictum nulla. Duis euismod tellus vitae diam hendrerit, sit amet vestibulum mauris rhoncus.
  `
</script>
