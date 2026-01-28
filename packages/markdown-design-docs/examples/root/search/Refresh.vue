<template>
  <div>
    <p>
      <label style="margin-right: 10px">
        Select content:
        <select v-model="index" name="select">
          <option v-for="(item, index) in options" :key="item.title" :value="index">
            {{ item.title }}
          </option>
        </select>
      </label>
      <button @click="refresh">Update</button>
    </p>
    <vmd-search v-model="keyword" ref="searchRef" target="#refreshRef" />
    <vmd-render id="refreshRef" :src="md" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const options = [
  {
    title: 'Lorem',
    value:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus elit fermentum pellentesque vehicula. Suspendisse potenti. Donec iaculis consectetur erat nec placerat. Suspendisse facilisis justo sit amet hendrerit sollicitudin. Suspendisse commodo malesuada massa, ac elementum risus. Ut eu facilisis neque. Fusce tincidunt, ligula vitae eleifend venenatis, purus purus ultrices purus, nec maximus tellus lectus nec leo. Sed auctor magna sed quam dapibus dapibus. Nullam ornare ultricies sem, a iaculis sapien volutpat euismod. Sed ac dictum nulla. Duis euismod tellus vitae diam hendrerit, sit amet vestibulum mauris rhoncus.'
  },
  {
    title: 'Sed',
    value:
      'Sed lectus nisl, blandit at volutpat et, lobortis ac urna. Etiam elementum id mauris a ultricies. Suspendisse rhoncus est justo, eu pellentesque turpis elementum quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel dolor orci. Vestibulum rhoncus erat vitae molestie porttitor. Phasellus accumsan risus ut enim mollis, quis feugiat massa auctor. Donec vehicula convallis nisi sit amet dapibus. Integer felis erat, interdum eget erat non, facilisis vulputate augue. Ut sed tortor vitae ante venenatis rhoncus eget id tortor. Etiam molestie luctus ligula sit amet venenatis. Aliquam iaculis tristique sem, vitae convallis mi ultricies nec.'
  }
]

const keyword = ref('or')

const index = ref(0)
const md = ref(options[0].value)

const searchRef = ref(null)
const refresh = () => {
  md.value = options[index.value].value
  searchRef.value?.refresh()
}
</script>
