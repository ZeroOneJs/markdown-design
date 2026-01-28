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
  Classic emojis: :wink: :cry: :laughing: :yum:

  Custom shortcuts: :-) :-( 8-) ;)
  `
</script>
