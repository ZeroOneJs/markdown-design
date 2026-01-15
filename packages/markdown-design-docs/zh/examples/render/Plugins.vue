<template>
  <vmd-render :src="md" :plugins="plugins" />
</template>

<script setup>
// npm i markdown-it-container
import container from 'markdown-it-container'

const md = `
  # Lorem ipsum

  ::: example
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus elit fermentum pellentesque vehicula. Suspendisse potenti. Donec iaculis consectetur erat nec placerat. Suspendisse facilisis justo sit amet hendrerit sollicitudin. Suspendisse commodo malesuada massa, ac elementum risus. Ut eu facilisis neque. Fusce tincidunt, ligula vitae eleifend venenatis, purus purus ultrices purus, nec maximus tellus lectus nec leo. Sed auctor magna sed quam dapibus dapibus. Nullam ornare ultricies sem, a iaculis sapien volutpat euismod. Sed ac dictum nulla. Duis euismod tellus vitae diam hendrerit, sit amet vestibulum mauris rhoncus.
  :::
  `

const plugins = [
  [
    container,
    'example',
    {
      render: (tokens, idx) => {
        return tokens[idx].nesting === 1 ? '<details><summary>展开内容</summary>\n' : '</details>\n'
      }
    }
  ]
]
</script>
