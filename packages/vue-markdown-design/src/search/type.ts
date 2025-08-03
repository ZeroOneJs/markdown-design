import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { searchProps } from './Search'
import type { UnionStr } from '../utils/types'

export type SearchIndex = UnionStr<'prev' | 'next' | number>

export interface SearchExpose {
  focus: () => void
  blur: () => void
  clear: () => void
  toggle: (index: SearchIndex, checkDisabled?: boolean) => void
}

export type SearchProps = ExtractPropTypes<typeof searchProps>
export type SearchInstance = ComponentPublicInstance<
  ExtractPropTypes<typeof searchProps>,
  SearchExpose
>
