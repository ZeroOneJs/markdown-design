/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\hooks\__tests__\use-scroll-element.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress wrap/mount replaced by direct Vitest assertions and vitest-browser-vue render; DOM parent discovery remains identical.
 */
import { useScrollParent } from '../use-scroll-element'
import { cleanup, render } from 'vitest-browser-vue'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { page } from 'vitest/browser'

// afterEach(() => {
//   cleanup()
//   vi.restoreAllMocks()
// })

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
