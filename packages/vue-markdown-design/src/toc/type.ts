import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import type { tocProps } from './TOC'
import type { MditHeadings } from '@markdown-design/markdown-it-headers'

export interface TOCExpose {
  refresh: () => Promise<void>
  scrollTo: (href?: string) => void
}

export type TOCProps = ExtractPropTypes<typeof tocProps>
export type TOCInstance = ComponentPublicInstance<ExtractPropTypes<TOCProps>, TOCExpose>

export interface TOC extends MditHeadings {
  id?: string
  top?: number
}
export interface TOCItem extends TOC {
  relativeLevel: number
  isActive: boolean
}
