import {
  unrefElement,
  useMutationObserver,
  type MaybeComputedElementRef,
  type UnRefElementReturn
} from '@vueuse/core'
import { onMounted, shallowRef, watch, type ShallowRef } from 'vue'

const tagNames = new Set(['HTML', 'BODY'])
const scrollReg = /scroll|auto|overlay/i
function getScrollElement(el: Element, onlyParent?: boolean) {
  let node = el
  const nodes: Element[] = []
  while (node.nodeType === 1 && !tagNames.has(node.tagName)) {
    const { overflowY } = window.getComputedStyle(node)
    if (scrollReg.test(overflowY)) {
      nodes.push(node)
      if (onlyParent) break
    }
    const { parentNode } = node
    if (!(parentNode instanceof Element)) break
    node = parentNode
  }
  return onlyParent ? nodes[0] : nodes
}

function isElement(el: any): el is HTMLElement | SVGElement {
  return [HTMLElement, SVGElement].some((type) => el instanceof type)
}

interface UseScrollParentOptions<T extends boolean> {
  onlyParent?: T
}
interface UseScrollParentReturn<T> {
  scrollEl: ShallowRef<T>
  update: () => void
}
type NonNullableElement = NonNullable<UnRefElementReturn>

export function useScrollParent(
  target: MaybeComputedElementRef,
  options?: UseScrollParentOptions<true>
): UseScrollParentReturn<UnRefElementReturn>
export function useScrollParent(
  target: MaybeComputedElementRef,
  options?: UseScrollParentOptions<false>
): UseScrollParentReturn<NonNullableElement[]>
export function useScrollParent(
  target: MaybeComputedElementRef,
  options: UseScrollParentOptions<boolean> = {}
): UseScrollParentReturn<UnRefElementReturn | NonNullableElement[]> {
  const { onlyParent = true } = options
  const initialValue = onlyParent ? undefined : []
  const scrollEl = shallowRef<UnRefElementReturn | NonNullableElement[]>(initialValue)
  const update = () => {
    const el = unrefElement(target)
    if (!el) {
      scrollEl.value = initialValue
      return
    }
    const scrollElement = getScrollElement(el, onlyParent)
    if (Array.isArray(scrollElement)) {
      scrollEl.value = scrollElement.filter(isElement)
      return
    }
    if (isElement(scrollElement)) {
      scrollEl.value = scrollElement
    }
  }
  watch(() => unrefElement(target), update, { flush: 'post' })
  useMutationObserver(
    () => (Array.isArray(scrollEl.value) ? scrollEl.value : [scrollEl.value]),
    update,
    { attributeFilter: ['style', 'class'] }
  )
  onMounted(update)
  return { scrollEl, update }
}
