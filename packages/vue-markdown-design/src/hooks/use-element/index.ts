import {
  toRef,
  unrefElement,
  useMounted,
  type MaybeElement,
  type UnRefElementReturn
} from '@vueuse/core'
import { isString } from 'lodash'
import { shallowRef, watchPostEffect, type MaybeRefOrGetter } from 'vue'

export function useElement(target?: MaybeRefOrGetter<MaybeElement | string>) {
  const targetEl = shallowRef<UnRefElementReturn>()
  const targetRef = toRef(target)
  const isMounted = useMounted()
  const update = () => {
    if (!(targetRef.value && isMounted.value)) return
    if (!isString(targetRef.value)) {
      targetEl.value = unrefElement(targetRef.value)
      return
    }
    targetEl.value = document.querySelector<HTMLElement>(targetRef.value)
    if (!targetEl.value) console.error('[vue-markdown-design] Target does not exist.')
  }
  watchPostEffect(update)
  return { targetEl, update }
}
