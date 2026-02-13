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
        setup(_: unknown, { expose }: SetupContext) {
          const target = shallowRef<HTMLDivElement>()
          const { scrollEl, update } = useScrollParent(target)
          update()
          expose({ scrollEl })
          return () => <div ref={target}></div>
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
          const { scrollEl } = useScrollParent(target)
          expose({ scrollEl })
          return () => (
            <div data-testid="scroller" style="overflow: scroll;">
              <div ref={target}></div>
            </div>
          )
        }
      },
      {
        attachTo: document.body
      }
    )
    await expect.element(page.getByTestId('scroller')).toBe(wrapper.vm.scrollEl)
  })
})
