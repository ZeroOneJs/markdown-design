<template>
  <div style="display: flex; flex-wrap: wrap">
    <vmd-render ref="renderRef" style="flex: 700px" :src="md" />
    <vmd-toc style="flex: auto" empty-text="暂无数据" :target="renderRef" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const renderRef = ref(null)

const md = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus elit fermentum pellentesque vehicula. Suspendisse potenti. Donec iaculis consectetur erat nec placerat. Suspendisse facilisis justo sit amet hendrerit sollicitudin. Suspendisse commodo malesuada massa, ac elementum risus. Ut eu facilisis neque. Fusce tincidunt, ligula vitae eleifend venenatis, purus purus ultrices purus, nec maximus tellus lectus nec leo. Sed auctor magna sed quam dapibus dapibus. Nullam ornare ultricies sem, a iaculis sapien volutpat euismod. Sed ac dictum nulla. Duis euismod tellus vitae diam hendrerit, sit amet vestibulum mauris rhoncus.
  `
</script>
