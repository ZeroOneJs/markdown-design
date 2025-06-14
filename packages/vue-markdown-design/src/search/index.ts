import { withInstall } from '../utils/vue'
import _Search from './Search'

export const VmdSearch = withInstall(_Search)
export default VmdSearch
export { searchProps } from './Search'
export type { SearchProps, SearchInstance } from './type'

declare module 'vue' {
  export interface GlobalComponents {
    VmdSearch: typeof VmdSearch
  }
}
