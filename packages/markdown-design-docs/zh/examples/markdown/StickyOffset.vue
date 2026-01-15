<template>
  <div style="position: relative">
    <header
      style="
        width: 100%;
        background: #0969da;
        position: absolute;
        top: 0;
        color: #fff;
        padding: 16px 32px;
        box-sizing: border-box;
        z-index: 5;
      "
    >
      固定页头
    </header>
    <div style="height: 492px; overflow: auto">
      <vue-markdown
        toc
        search
        show-btn
        style="margin: 56px 0"
        top-offset="56"
        bottom-offset="56"
        :src="md"
      />
    </div>
    <footer
      style="
        width: 100%;
        background: #0969da;
        position: absolute;
        bottom: 0;
        color: #fff;
        padding: 16px 32px;
        box-sizing: border-box;
        z-index: 5;
      "
    >
      固定页脚
    </footer>
  </div>
</template>

<script setup>
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
