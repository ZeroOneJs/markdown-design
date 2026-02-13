/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\hooks\__tests__\use-scroll-element.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress wrap/mount replaced by direct Vitest assertions and vitest-browser-vue render; DOM parent discovery remains identical.
 */
import { useScrollParent } from '../use-scroll-element'
import { cleanup, render } from 'vitest-browser-vue'
import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('use-scroll-element', () => {
  it('target 为空', () => {
    const { scrollEl, update } = useScrollParent(null)
    update()
    expect(scrollEl.value).toBeUndefined()
  })

  it('父节点为空', () => {
    const node = document.createElement('div')
    const { scrollEl, update } = useScrollParent(node)
    update()
    expect(scrollEl.value).toBeUndefined()
  })

  it('onlyParent', async () => {
    render(() => (
      <div data-cy="parent" style={{ overflow: 'scroll' }}>
        <div data-cy="child"></div>
      </div>
    ))
    const parent = document.querySelector<HTMLElement>('[data-cy="parent"]')
    const child = document.querySelector<HTMLElement>('[data-cy="child"]')
    expect(parent).toBeTruthy()
    expect(child).toBeTruthy()
    const { scrollEl, update } = useScrollParent(child)
    update()
    await expect.poll(() => scrollEl.value).toBe(parent)
  })
})
