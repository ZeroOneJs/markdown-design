<template>
  <div>
    <div style="margin-bottom: 16px">
      <label>
        <input v-model="permalink" type="checkbox" />
        启用 permalink（鼠标悬浮在标题上可显示永久链接符号）
      </label>
    </div>
    <vmd-render :src="md" :permalink="permalink" />
    <p>自定义标题渲染：</p>
    <vmd-render :src="md" :anchor="anchorOptions" />
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
