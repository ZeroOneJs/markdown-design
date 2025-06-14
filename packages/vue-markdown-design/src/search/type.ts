import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { searchProps } from './Search'

export interface SearchExpose {
  focus: () => void
  blur: () => void
  clear: () => void
}

export type SearchProps = ExtractPropTypes<typeof searchProps>
export type SearchInstance = ComponentPublicInstance<
  ExtractPropTypes<typeof searchProps>,
  SearchExpose
>
