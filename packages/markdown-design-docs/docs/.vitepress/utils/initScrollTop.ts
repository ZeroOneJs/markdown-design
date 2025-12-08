import { onBeforeUnmount, onMounted } from 'vue'

function getOriginalDescriptor() {
  let originalDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop')
  if (!originalDescriptor) {
    const elPrototype = Object.getPrototypeOf(document.documentElement)
    originalDescriptor = Object.getOwnPropertyDescriptor(elPrototype, 'scrollTop')
  }
  return originalDescriptor
}

export function initScrollTop() {
  const originalDescriptor = getOriginalDescriptor()
  if (!originalDescriptor) return
  const el = document.documentElement

  const clear = () => Object.defineProperty(el, 'scrollTop', originalDescriptor)

  onMounted(() => {
    Object.defineProperty(el, 'scrollTop', {
      configurable: true,
      get() {
        return originalDescriptor.get?.call(this)
      },
      set() {
        if (!window.location.hash) return
        window.location.href = window.location.href
      }
    })
    setTimeout(clear, 1000)
  })
  onBeforeUnmount(clear)
}
