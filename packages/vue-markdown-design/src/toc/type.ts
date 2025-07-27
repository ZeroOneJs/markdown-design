import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import type { tocProps } from './TOC'

export interface TOCExpose {
  refresh: () => Promise<void>
  scrollTo: (href?: string) => void
}

export type TOCProps = ExtractPropTypes<typeof tocProps>
export type TOCInstance = ComponentPublicInstance<ExtractPropTypes<TOCProps>, TOCExpose>

export interface TOC {
  id?: string
  top?: number
  text: string
  level: number
}
export interface TOCItem extends TOC {
  relativeLevel: number
  isActive: boolean
}
