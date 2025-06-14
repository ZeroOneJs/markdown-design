import { toRef, unrefElement, type MaybeElement, type UnRefElementReturn } from '@vueuse/core'
import { isString } from 'lodash'
import { onMounted, shallowRef, watch, type MaybeRefOrGetter } from 'vue'

export function useElement(target?: MaybeRefOrGetter<MaybeElement | string>) {
  const targetEl = shallowRef<UnRefElementReturn>()
  const targetRef = toRef(target)
  const update = () => {
    if (!targetRef.value) return
    if (!isString(targetRef.value)) {
      targetEl.value = unrefElement(targetRef.value)
      return
    }
    targetEl.value = document.querySelector<HTMLElement>(targetRef.value)
    if (!targetEl.value) console.error('[vue-markdown-design] Target does not exist.')
  }
  watch(targetRef, update, { flush: 'post' })
  onMounted(update)
  return { targetEl, update }
}
