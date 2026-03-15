import { useScrollParent } from '../use-scroll-element'
import { describe, expect, test, beforeEach } from 'vitest'
import { page } from 'vitest/browser'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { shallowRef, type SetupContext } from 'vue'

enableAutoUnmount(beforeEach)

describe('use-scroll-element', () => {
  test('target 为空', () => {
    const wrapper = mount(
      {
        render: () => null,
        setup() {
          const { scrollEl, update } = useScrollParent(null)
          update()
          return { scrollEl }
        }
      },
      {
        attachTo: document.body
      }
    )
    expect(wrapper.vm.scrollEl).toBeUndefined()
  })

  test('父节点为空', () => {
    const wrapper = mount(
      {
        render: () => null,
        setup() {
          const target = document.createElement('div')
          const { scrollEl, update } = useScrollParent(target)
          update()
          return { scrollEl }
        }
      },
      {
        attachTo: document.body
      }
    )
    expect(wrapper.vm.scrollEl).toBeUndefined()
  })

  test('onlyParent', async () => {
    const wrapper = mount(
      {
        setup(_: unknown, { expose }: SetupContext) {
          const target = shallowRef<HTMLDivElement>()
          const { scrollEl: parentScrollEl } = useScrollParent(target)
          const { scrollEl } = useScrollParent(target, { onlyParent: false })
          expose({ parentScrollEl, scrollEl })
          return () => (
            <div data-testid="scroller-1" style="overflow: scroll;">
              <div data-testid="scroller-2" style="overflow: scroll;">
                <div ref={target}></div>
              </div>
            </div>
          )
        }
      },
      {
        attachTo: document.body
      }
    )
    await expect.element(wrapper.vm.parentScrollEl).toBe(page.getByTestId('scroller-2').element())
    await expect(wrapper.vm.scrollEl).toEqual(
      expect.arrayContaining(page.getByTestId(/scroller/).elements())
    )
  })

  // test('onlyParent=false 返回数组', async () => {
  //   const wrapper = mount(
  //     {
  //       setup(_: unknown, { expose }: SetupContext) {
  //         const target = shallowRef<HTMLDivElement>()
  //         const { scrollEl } = useScrollParent(target, { onlyParent: false })
  //         expose({ scrollEl })
  //         return () => (
  //           <div data-testid="outer" style="overflow: auto;">
  //             <div data-testid="inner" style="overflow: overlay;">
  //               <div ref={target}></div>
  //             </div>
  //           </div>
  //         )
  //       }
  //     },
  //     {
  //       attachTo: document.body
  //     }
  //   )
  //   expect(Array.isArray(wrapper.vm.scrollEl)).toBe(true)
  //   expect(wrapper.vm.scrollEl).toHaveLength(2)
  //   await expect.element(page.getByTestId('inner')).toBe(wrapper.vm.scrollEl[0])
  //   await expect.element(page.getByTestId('outer')).toBe(wrapper.vm.scrollEl[1])
  // })

  // test('onlyParent=false 过滤非HTMLElement', async () => {
  //   const wrapper = mount(
  //     {
  //       setup(_: unknown, { expose }: SetupContext) {
  //         const target = shallowRef<HTMLDivElement>()
  //         const { scrollEl, update } = useScrollParent(target, { onlyParent: false })
  //         expose({ scrollEl, update })
  //         return () => (
  //           <div data-testid="scroller" style="overflow: scroll;">
  //             <div ref={target}></div>
  //           </div>
  //         )
  //       }
  //     },
  //     {
  //       attachTo: document.body
  //     }
  //   )
  //   expect(Array.isArray(wrapper.vm.scrollEl)).toBe(true)
  //   expect(wrapper.vm.scrollEl).toHaveLength(1)
  //   await expect.element(page.getByTestId('scroller')).toBe(wrapper.vm.scrollEl[0])
  // })

  // test('父节点不为 Element', async () => {
  //   const wrapper = mount(
  //     {
  //       render: () => null,
  //       setup(_: unknown, { expose }: SetupContext) {
  //         // const target = shallowRef<HTMLDivElement>()
  //         // const parent = document.createElement('div')
  //         // parent.style.overflow = 'scroll'
  //         const child = document.createElement('div')
  //         // parent.appendChild(child)
  //         const { scrollEl, update } = useScrollParent(child)
  //         // expose({ scrollEl, update })
  //         update()
  //         return { scrollEl }
  //       }
  //     },
  //     {
  //       attachTo: document.body
  //     }
  //   )
  //   expect(wrapper.vm.scrollEl).toBeUndefined()
  // })

  // test('parentNode 为 DocumentFragment - onlyParent=false', async () => {
  //   const wrapper = mount(
  //     {
  //       setup(_: unknown, { expose }: SetupContext) {
  //         const target = shallowRef<HTMLDivElement>()
  //         const { scrollEl, update } = useScrollParent(target, { onlyParent: false })
  //         expose({ scrollEl, update })
  //         return () => {
  //           const fragment = document.createDocumentFragment()
  //           const scroller = document.createElement('div')
  //           scroller.style.overflow = 'scroll'
  //           const child = document.createElement('div')
  //           scroller.appendChild(child)
  //           fragment.appendChild(scroller)
  //           target.value = child
  //           update()
  //           return null
  //         }
  //       }
  //     },
  //     {
  //       attachTo: document.body
  //     }
  //   )
  //   expect(wrapper.vm.scrollEl).toEqual([])
  // })
})
