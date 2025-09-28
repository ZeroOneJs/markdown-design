import { compute, type Options } from 'compute-scroll-into-view'
import { omit, pick } from 'lodash'
import { animate, type AnimationOptions } from 'popmotion'
import { computeOffset } from './format'
import type { Offset } from './types'

interface Scroller {
  el: Element
  to: number
}
type OmitComputeOptions = Omit<Options, 'block'>
type OmitAnimationOptions = Omit<AnimationOptions<Scroller['to']>, 'from' | 'to'>
interface ScrollOptions extends OmitComputeOptions, OmitAnimationOptions {
  offset?: Offset
  smooth?: boolean
}
function setScrollTop({ el, to }: Scroller) {
  el.scrollTop = to
}
const playAnimation = (scroller: Scroller, options: OmitAnimationOptions) => {
  const { el, to } = scroller
  const { onUpdate, ...others } = options
  animate({
    ...others,
    from: el.scrollTop,
    to,
    onUpdate: (top) => {
      onUpdate?.(top)
      setScrollTop({ el, to: top })
    }
  })
}
const computeOptionsKeys: (keyof OmitComputeOptions)[] = [
  'inline',
  'scrollMode',
  'boundary',
  'skipOverflowHiddenElements'
]

export function scrollToEl(target: Element, options: ScrollOptions = {}) {
  const { offset, smooth, ...others } = options
  const { block, getOffset } = computeOffset(offset)
  const animationOptions = omit(others, computeOptionsKeys)
  compute(target, {
    ...pick(others, computeOptionsKeys),
    block
  }).forEach((scrollAction, index) => {
    const { el, top } = scrollAction
    const curOffset = getOffset(scrollAction, !index)
    const scroller = {
      el,
      to: Math.max(top - curOffset, 0)
    }
    smooth ? playAnimation(scroller, animationOptions) : setScrollTop(scroller)
  })
}
