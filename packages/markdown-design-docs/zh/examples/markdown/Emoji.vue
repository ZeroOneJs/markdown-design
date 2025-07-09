<template>
  <vue-markdown :src="md" :emoji="emoji" />
</template>

<script setup>
const emoji = {
  shortcuts: {
    smiley: ':-)',
    frowning: ':-(',
    sunglasses: '8-)',
    wink: ';)'
  }
}

const md = `
  经典表情: :wink: :cry: :laughing: :yum:

  自定义符号：:-) :-( 8-) ;)
  `
</script>
