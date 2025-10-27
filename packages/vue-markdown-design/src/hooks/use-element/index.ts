import {
  toValue,
  unrefElement,
  useMounted,
  type MaybeElement,
  type UnRefElementReturn
} from '@vueuse/core'
import { isString } from 'lodash'
import { shallowRef, watchPostEffect, type MaybeRefOrGetter } from 'vue'

export function useElement(target?: MaybeRefOrGetter<MaybeElement | string>) {
  const targetEl = shallowRef<UnRefElementReturn>()
  const isMounted = useMounted()
  const update = () => {
    const targetVal = toValue(target)
    if (!(targetVal && isMounted.value)) return
    if (!isString(targetVal)) {
      targetEl.value = unrefElement(targetVal)
      return
    }
    targetEl.value = document.querySelector<HTMLElement>(targetVal)
    if (!targetEl.value) console.error('[vue-markdown-design] Target does not exist.')
  }
  watchPostEffect(update)
  return { targetEl, update }
}
