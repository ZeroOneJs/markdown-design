import type { ComponentPublicInstance, ExtractPropTypes, Ref } from 'vue'
import type MarkdownIt from 'markdown-it'
import type { renderProps } from './Render'
import type anchor from 'markdown-it-anchor'

export interface RenderExpose {
  mdInstance: MarkdownIt
  htmlStr: Ref<string>
}

export type Anchor = typeof anchor

export type RenderProps = ExtractPropTypes<typeof renderProps>
export type RenderInstance = ComponentPublicInstance<ExtractPropTypes<RenderProps>, RenderExpose>
