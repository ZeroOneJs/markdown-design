<template>
  <div>
    <div style="margin-bottom: 16px">
      <label>
        请选择样式名：
        <select v-model="markdownClass">
          <option value="custom-theme">自定义样式 custom-theme</option>
          <option value="markdown-body">默认样式 markdown-body</option>
          <option value="">无样式</option>
        </select>
      </label>
    </div>
    <vmd-render :src="md" :markdown-class="markdownClass" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const markdownClass = ref('custom-theme')

const md = `
  # Lorem ipsum

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus elit fermentum pellentesque vehicula. Suspendisse potenti. Donec iaculis consectetur erat nec placerat. Suspendisse facilisis justo sit amet hendrerit sollicitudin. Suspendisse commodo malesuada massa, ac elementum risus. Ut eu facilisis neque. Fusce tincidunt, ligula vitae eleifend venenatis, purus purus ultrices purus, nec maximus tellus lectus nec leo. Sed auctor magna sed quam dapibus dapibus. Nullam ornare ultricies sem, a iaculis sapien volutpat euismod. Sed ac dictum nulla. Duis euismod tellus vitae diam hendrerit, sit amet vestibulum mauris rhoncus.
  `
</script>

<style>
.custom-theme {
  background: #fffffd;
}

.custom-theme * {
  margin: 0;
}

.custom-theme h1 {
  font-size: 2.4em;
  padding-bottom: 0.3em;
  border-bottom: 3px double #eee;
  margin-bottom: 0.6em;
  line-height: 1.35;
  font-weight: bolder;
  color: #456688;
}

.custom-theme p {
  margin-bottom: 1.2em;
  color: #383838;
}

.custom-theme a {
  color: #456688;
  text-decoration: none;
}
</style>
