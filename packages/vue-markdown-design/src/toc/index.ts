import { withInstall } from '../utils/vue'
import _TOC from './TOC'

export const VmdTOC = withInstall(_TOC, ['VmdTOC'])
export default VmdTOC
export { tocProps } from './TOC'
export type { TOCProps, TOCInstance, TOCItem } from './type'

declare module 'vue' {
  export interface GlobalComponents {
    VmdTOC: typeof VmdTOC
    VmdToc: typeof VmdTOC
  }
}
