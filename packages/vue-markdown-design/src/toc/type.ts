import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import type { tocProps } from './Toc'
import type { MditHeadings } from '@markdown-design/markdown-it-headers'

export interface TocExpose {
  refresh: () => Promise<void>
  scrollTo: (href?: string) => void
}

export type TocProps = ExtractPropTypes<typeof tocProps>
export type TocInstance = ComponentPublicInstance<ExtractPropTypes<TocProps>, TocExpose>

export interface Toc extends MditHeadings {
  id?: string
  top?: number
}
export interface TocItem extends Toc {
  relativeLevel: number
  isActive: boolean
}
