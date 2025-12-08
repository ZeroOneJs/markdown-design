<template>
  <div>
    <div style="display: flex; margin-bottom: 16px">
      <div style="flex: auto; position: relative">
        <div
          style="
            width: 100%;
            background: #0969da;
            position: absolute;
            top: 0;
            color: #fff;
            padding: 16px 32px;
            box-sizing: border-box;
            z-index: 1;
          "
        >
          数值偏移量
        </div>
        <div style="height: 436px; overflow: auto">
          <vmd-render ref="basicWhenNumber" style="margin-top: 56px" :src="md" />
        </div>
      </div>
      <vmd-toc style="flex: none" :offset="56" :target="basicWhenNumber" />
    </div>
    <div style="display: flex">
      <div style="flex: auto; position: relative">
        <div
          style="
            width: 100%;
            background: #0969da;
            position: absolute;
            top: 0;
            color: #fff;
            padding: 16px 32px;
            box-sizing: border-box;
            z-index: 1;
          "
        >
          字符串位置偏移量
        </div>
        <div style="height: 436px; overflow: auto">
          <vmd-render ref="basicWhenPosition" style="margin-top: 56px" :src="md" />
        </div>
      </div>
      <vmd-toc style="flex: none" offset="end" :target="basicWhenPosition" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const basicWhenNumber = ref(null)
const basicWhenPosition = ref(null)

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
