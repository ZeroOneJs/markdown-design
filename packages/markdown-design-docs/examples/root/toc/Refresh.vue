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
    <div style="display: flex; flex-wrap: wrap">
      <vmd-render id="refreshRef" style="height: 436px; overflow: auto; flex: 70%" :src="md" />
      <vmd-toc ref="tocRef" target="#refreshRef" style="flex: auto" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const options = [
  {
    title: 'Lorem',
    value:
      '# Lorem\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus elit fermentum pellentesque vehicula. Suspendisse potenti. Donec iaculis consectetur erat nec placerat. Suspendisse facilisis justo sit amet hendrerit sollicitudin. Suspendisse commodo malesuada massa, ac elementum risus. Ut eu facilisis neque. Fusce tincidunt, ligula vitae eleifend venenatis, purus purus ultrices purus, nec maximus tellus lectus nec leo. Sed auctor magna sed quam dapibus dapibus. Nullam ornare ultricies sem, a iaculis sapien volutpat euismod. Sed ac dictum nulla. Duis euismod tellus vitae diam hendrerit, sit amet vestibulum mauris rhoncus.\n# Maecenas\nMaecenas at dolor sodales, fermentum enim vel, sagittis mi. Curabitur hendrerit erat nulla, ac dapibus erat aliquam egestas. Aliquam erat volutpat. Ut laoreet, turpis eget scelerisque consectetur, sapien purus aliquam ipsum, ut elementum augue odio sit amet tortor. Nunc id neque leo. Aliquam congue arcu nunc, at lacinia magna convallis at. Etiam ut consectetur elit, nec laoreet mi. Pellentesque at volutpat arcu. Vestibulum eget metus interdum, fringilla dolor quis, venenatis dui. Sed egestas, nunc convallis sollicitudin efficitur, orci dui sagittis enim, in rhoncus sem arcu ut justo. Donec sed nibh enim. Sed id massa eget nisi tincidunt semper ac ornare orci. Fusce felis mi, sollicitudin at nisi et, lacinia interdum quam. Ut elit est, condimentum nec iaculis a, dignissim feugiat purus.'
  },
  {
    title: 'Sed',
    value:
      '# Sed\nSed lectus nisl, blandit at volutpat et, lobortis ac urna. Etiam elementum id mauris a ultricies. Suspendisse rhoncus est justo, eu pellentesque turpis elementum quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vel dolor orci. Vestibulum rhoncus erat vitae molestie porttitor. Phasellus accumsan risus ut enim mollis, quis feugiat massa auctor. Donec vehicula convallis nisi sit amet dapibus. Integer felis erat, interdum eget erat non, facilisis vulputate augue. Ut sed tortor vitae ante venenatis rhoncus eget id tortor. Etiam molestie luctus ligula sit amet venenatis. Aliquam iaculis tristique sem, vitae convallis mi ultricies nec.\n# Nunc\nNunc vulputate neque sit amet nisi sollicitudin, vel luctus justo vehicula. In sed sapien vel tortor interdum ornare quis ac massa. Proin sapien leo, pretium nec tempus sed, fermentum in felis. Praesent viverra velit arcu, pretium ultricies ipsum viverra non. Cras malesuada cursus velit a tincidunt. Nullam pellentesque nunc mi, sed placerat mi pretium quis. Proin laoreet urna sed urna placerat convallis. Integer eget blandit augue. Etiam eget nisi nibh. Maecenas vel nunc non ipsum ultricies facilisis et id augue. Nullam rhoncus tristique rhoncus. Vivamus aliquet elit vitae dui consequat commodo. Aenean maximus velit sed pharetra fringilla. Aenean semper nunc eu massa lobortis, eu aliquam ante rhoncus.'
  }
]

const index = ref(0)
const md = ref(options[0].value)

const tocRef = ref(null)
const refresh = () => {
  md.value = options[index.value].value
  tocRef.value?.refresh()
}
</script>
