/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\utils\__tests__\dom.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress mount and boundary assertions replaced by vitest-browser-vue render + getBoundingClientRect; async scrollToEl(setTimeout) handled with expect.poll.
 */
import { scrollToEl } from '../dom'
import { cleanup, render } from 'vitest-browser-vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { scrollToTop } from '../../__tests__/vitest-utils'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  scrollToTop()
})

describe('dom', () => {
  it('scrollToEl', async () => {
    render(() => (
      <>
        <div style="height: 300px; overflow: scroll;">
          <div style="height: 100vh;"></div>
          <div data-cy>content</div>
          <div style="height: 100vh;"></div>
        </div>
      </>
    ))
    const el = document.querySelector<HTMLElement>('[data-cy]')
    expect(el).toBeTruthy()
    scrollToEl(el!)
    const expectedTop = parseInt(getComputedStyle(document.body).marginTop || '0')
    await expect.poll(() => Math.floor(el!.getBoundingClientRect().top)).toBe(expectedTop)
  })
})
