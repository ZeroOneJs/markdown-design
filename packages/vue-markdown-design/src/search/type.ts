import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { searchProps } from './Search'
import type { UnionStr } from '../utils/types'

export interface SearchExpose {
  focus: () => void
  blur: () => void
  clear: () => void
  toggle: (index: UnionStr<'prev' | 'next' | number>, checkDisabled?: boolean) => void
}

export type SearchProps = ExtractPropTypes<typeof searchProps>
export type SearchInstance = ComponentPublicInstance<
  ExtractPropTypes<typeof searchProps>,
  SearchExpose
>
