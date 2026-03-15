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
})
