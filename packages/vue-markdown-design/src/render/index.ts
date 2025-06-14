import { withInstall } from '../utils/vue'
import _Render from './Render'

export const VmdRender = withInstall(_Render)
export default VmdRender
export { renderProps } from './Render'
export type { RenderProps, RenderInstance } from './type'

declare module 'vue' {
  export interface GlobalComponents {
    VmdRender: typeof VmdRender
  }
}
