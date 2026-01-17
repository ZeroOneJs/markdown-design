import { withInstall } from '../utils/vue'
import _Toc from './Toc'

export const VmdToc = withInstall(_Toc)
export default VmdToc
export { tocProps } from './Toc'
export type { TocProps, TocInstance, TocItem } from './type'

declare module 'vue' {
  export interface GlobalComponents {
    VmdToc: typeof VmdToc
  }
}
