<template>
  <div>
    <p>
      <label>
        <input v-model="html" name="checkbox" type="checkbox" />
        启用 html
      </label>
    </p>
    <vmd-render :src="md" :html="html" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const html = ref(true)

const md = `
  # Lorem ipsum

  <p style="background: rgba(9, 105, 218, 0.14); padding: 10px">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus elit fermentum pellentesque vehicula. Suspendisse potenti. Donec iaculis consectetur erat nec placerat. Suspendisse facilisis justo sit amet hendrerit sollicitudin. Suspendisse commodo malesuada massa, ac elementum risus. Ut eu facilisis neque. Fusce tincidunt, ligula vitae eleifend venenatis, purus purus ultrices purus, nec maximus tellus lectus nec leo. Sed auctor magna sed quam dapibus dapibus. Nullam ornare ultricies sem, a iaculis sapien volutpat euismod. Sed ac dictum nulla. Duis euismod tellus vitae diam hendrerit, sit amet vestibulum mauris rhoncus.
  </p>
  `
</script>
