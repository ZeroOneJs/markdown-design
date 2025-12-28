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
    let to = el.scrollTop // todo：暂时关闭多层滚动，等加入 boundary 再开放
    if (!index) {
      const curOffset = getOffset(scrollAction, !index)
      // 使用 clientHeight 能正确获取 <html> 的 viewport 高度
      to = el.scrollHeight - top > el.clientHeight ? Math.max(top - curOffset, 0) : top // 如果容器滚动到最底部则不使用偏移量
    }
    const scroller = { el, to }
    smooth ? playAnimation(scroller, animationOptions) : setScrollTop(scroller)
  })
}
