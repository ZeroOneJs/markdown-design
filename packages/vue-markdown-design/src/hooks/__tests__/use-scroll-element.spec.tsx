import { useScrollParent } from '../use-scroll-element'
import { render } from 'vitest-browser-vue'
import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'

describe('use-scroll-element', () => {
  test('target 为空', () => {
    const { scrollEl, update } = useScrollParent(null)
    update()
    expect(scrollEl.value).toBeUndefined()
  })

  test('父节点为空', () => {
    const node = document.createElement('div')
    const { scrollEl, update } = useScrollParent(node)
    update()
    expect(scrollEl.value).toBeUndefined()
  })

  test('onlyParent', async () => {
    render(() => (
      <div data-testid="parent" style="overflow: scroll;">
        <div data-testid="child"></div>
      </div>
    ))
    const { scrollEl, update } = useScrollParent(page.getByTestId('child').element())
    update()
    await expect.element(page.getByTestId('parent')).toBe(scrollEl.value)
  })
})
