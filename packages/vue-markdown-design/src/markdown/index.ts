import { withInstall } from '../utils/vue'
import _Markdown from './Markdown'

export const VueMarkdown = withInstall(_Markdown)
export default VueMarkdown
export { markdownProps } from './Markdown'
export type { MarkdownProps, MarkdownInstance, MarkdownBtnType } from './type'

declare module 'vue' {
  export interface GlobalComponents {
    VueMarkdown: typeof VueMarkdown
  }
}
