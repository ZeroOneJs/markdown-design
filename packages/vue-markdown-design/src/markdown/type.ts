import type { ComponentPublicInstance, ExtractPropTypes, ToRefs } from 'vue'
import type { markdownProps } from './Markdown'
import type { RenderExpose } from '../render/type'
import type { SearchExpose } from '../search/type'
import type { KeysAddPrefix } from '../utils/types'
import type { TOCExpose } from '../toc/type'

type SearchExposeWithPrefix = KeysAddPrefix<SearchExpose, 'search'>
type TOCExposeWithPrefix = KeysAddPrefix<TOCExpose, 'toc'>

export type MarkdownExpose = ToRefs<RenderExpose> & SearchExposeWithPrefix & TOCExposeWithPrefix

export type MarkdownProps = ExtractPropTypes<typeof markdownProps>
export type MarkdownInstance = ComponentPublicInstance<MarkdownProps, MarkdownExpose>

export interface MarkdownBtnType {
  search?: boolean
  toc?: boolean
}
