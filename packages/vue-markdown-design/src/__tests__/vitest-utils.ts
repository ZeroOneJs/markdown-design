import { expect } from 'vitest'

export const scrollToTop = () => {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export const click = (el: Element) =>
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))

export const getEl = <T extends Element = HTMLElement>(selector: string) => {
  const el = document.querySelector<T>(selector)
  expect(el).toBeTruthy()
  return el!
}

export const rect = (selector: string) => getEl<HTMLElement>(selector).getBoundingClientRect()
