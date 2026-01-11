import type { ComponentPublicInstance, ExtractPropTypes, ToRefs } from 'vue'
import type { markdownProps } from './Markdown'
import type { RenderExpose } from '../render/type'
import type { SearchExpose } from '../search/type'
import type { KeysAddPrefix } from '../utils/types'
import type { TocExpose } from '../toc/type'

type SearchExposeWithPrefix = KeysAddPrefix<SearchExpose, 'search'>
type TocExposeWithPrefix = KeysAddPrefix<TocExpose, 'toc'>

export type MarkdownExpose = ToRefs<RenderExpose> & SearchExposeWithPrefix & TocExposeWithPrefix

export type MarkdownProps = ExtractPropTypes<typeof markdownProps>
export type MarkdownInstance = ComponentPublicInstance<MarkdownProps, MarkdownExpose>

export interface MarkdownBtnType {
  search?: boolean
  toc?: boolean
}
