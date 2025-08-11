import { withInstall } from '../utils/vue'
import _Sticky from './Sticky'

export const VmdSticky = withInstall(_Sticky)
export default VmdSticky
export { stickyProps } from './Sticky'

declare module 'vue' {
  export interface GlobalComponents {
    VmdSticky: typeof VmdSticky
  }
}
