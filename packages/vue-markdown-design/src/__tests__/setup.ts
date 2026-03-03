import '../style/variables.less'
import { locators, type Locator } from 'vitest/browser'

declare module 'vitest/browser' {
  interface LocatorSelectors {
    boundingClientRect<T extends keyof DOMRect>(this: Locator, key: T): DOMRect[T]
  }
}

locators.extend({
  boundingClientRect(key) {
    if ('element' in this) {
      return this.element().getBoundingClientRect()[key]
    }
    throw new Error('boundingClientRect can only be called on Locator')
  }
})
