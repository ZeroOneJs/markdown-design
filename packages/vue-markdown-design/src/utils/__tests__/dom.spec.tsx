/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\utils\__tests__\dom.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress mount and boundary assertions replaced by vitest-browser-vue render + getBoundingClientRect; async scrollToEl(setTimeout) handled with expect.poll.
 */
import { scrollToEl } from '../dom'
import { cleanup, render } from 'vitest-browser-vue'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { scrollToTop } from '../../__tests__/vitest-utils'
import { page } from 'vitest/browser'

// afterEach(() => {
//   cleanup()
//   vi.restoreAllMocks()
//   scrollToTop()
// })

describe('dom', () => {
  test('scrollToEl', async () => {
    render(() => (
      <>
        <div style="height: 300px; overflow: scroll;">
          <div style="height: 100vh;"></div>
          <div data-testid="content">content</div>
          <div style="height: 100vh;"></div>
        </div>
      </>
    ))
    const locator = page.getByTestId('content')
    scrollToEl(locator.element())
    await expect.poll(() => locator.boundingClientRect('top')).toBe(0)
  })
})
