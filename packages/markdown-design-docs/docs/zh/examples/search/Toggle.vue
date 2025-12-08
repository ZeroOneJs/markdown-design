<template>
  <div>
    <div style="margin-bottom: 16px">
      <label for="toggle">请输入索引值：</label>
      <input v-model="index" id="toggle" style="width: 50px; margin-right: 10px" />
      <button @click="searchRef.toggle(index)">前往</button>
    </div>
    <p>当前索引值（从 0 开始计数）：{{ safeIndex }}</p>
    <vmd-search
      v-model="keyword"
      ref="searchRef"
      :target="renderRef"
      @index-change="safeIndex = $event"
    />
    <vmd-render ref="renderRef" style="height: 436px; overflow: scroll; flex: auto" :src="md" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const renderRef = ref(null)
const searchRef = ref(null)

const keyword = ref('or')

const index = ref(0)
const safeIndex = ref(0)

const md = `
  # h1 Heading 8-)
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading


  ## Horizontal Rules

  ___

  ---

  ***


  ## Emphasis

  **This is bold text**

  __This is bold text__

  *This is italic text*

  _This is italic text_

  ~~Strikethrough~~


  ## Blockquotes

  > Blockquotes can also be nested...
  >> ...by using additional greater-than signs right next to each other...
  > > > ...or with spaces between arrows.


  ## Lists

  Unordered

  + Create a list by starting a line with \`+\`, \`-\`, or \`*\`
  + Sub-lists are made by indenting 2 spaces:
    - Marker character change forces new list start:
      * Ac tristique libero volutpat at
      + Facilisis in pretium nisl aliquet
      - Nulla volutpat aliquam velit
  + Very easy!

  Ordered

  1. Lorem ipsum dolor sit amet
  2. Consectetur adipiscing elit
  3. Integer molestie lorem at massa


  1. You can use sequential numbers...
  1. ...or keep all the numbers as \`1.\`

  Start numbering with offset:

  57. foo
  1. bar


  ## Tables

  | Option | Description |
  | ------ | ----------- |
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |

  Right aligned columns

  | Option | Description |
  | ------:| -----------:|
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |
  `
</script>
