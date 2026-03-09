/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\sticky\__tests__\Sticky.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress scrolling and boundary assertions replaced by window/element scrolling + getBoundingClientRect; retries implemented with expect.poll for layout stabilization.
 */
import { page } from 'vitest/browser'
import Sticky from '..'
import { cleanup, render } from 'vitest-browser-vue'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { scrollToTop } from '../../__tests__/vitest-utils'

// afterEach(() => {
//   cleanup()
//   vi.restoreAllMocks()
//   scrollToTop()
// })

describe('Sticky', () => {
  describe('posY', () => {
    test('top', async () => {
      render(() => (
        <>
          <div style="height: 100vh">placeholder</div>
          <div data-testid="target" style="height: 200px;">
            <Sticky>
              <div data-testid="content">content</div>
            </Sticky>
            <div data-testid="inside" style="height: 100vh">
              placeholder
            </div>
          </div>
          <div data-testid="outside" style="height: 100vh">
            placeholder
          </div>
        </>
      ))
      page.getByTestId('inside').element().scrollIntoView()
      expect(page.getByTestId('content').boundingClientRect('top')).toBe(0)
      page.getByTestId('outside').element().scrollIntoView()
      expect(page.getByTestId('content').boundingClientRect('top')).toBeLessThan(0)
    })

    test('bottom', async () => {
      await expect.poll(() => document.documentElement.scrollTop).toBe(0)
      render(() => (
        <>
          <div style="height: 100vh">placeholder</div>
          <div data-testid="target">
            <div style="height: 100px">placeholder</div>
            <Sticky posY="bottom">
              <div data-testid="content">content</div>
            </Sticky>
          </div>
          <div style="height: 100vh">placeholder</div>
        </>
      ))
      // 720 为窗口高度
      expect(page.getByTestId('content').boundingClientRect('bottom')).toBeGreaterThan(720)
      window.scrollTo(0, 50)
      expect(page.getByTestId('content').boundingClientRect('bottom')).toBe(720)
    })
  })

  test('posX', async () => {
    render(() => (
      <div style="width: 500px;height: 500px;">
        <Sticky posX="right" flow={false}>
          <div data-testid="content">content</div>
        </Sticky>
      </div>
    ))
    await expect.poll(() => page.getByTestId('content').boundingClientRect('right')).toBe(500)
  })

  test('offset', async () => {
    render(() => (
      <div style="height: 200px;">
        <Sticky offset="100">
          <div data-testid="content">content</div>
        </Sticky>
      </div>
    ))
    expect(page.getByTestId('content').boundingClientRect('top')).toBe(100)
  })

  test('flow', async () => {
    render(() => (
      <div style="height: 200px;">
        <Sticky flow={false}>
          <div>content</div>
        </Sticky>
        <div data-testid="placeholder" style="height: 100vh">
          placeholder
        </div>
      </div>
    ))
    await expect.poll(() => page.getByTestId('placeholder').boundingClientRect('top')).toBe(0)
  })

  test('zIndex', async () => {
    render(<Sticky data-testid="sticky" zIndex="0" />)
    await expect.element(page.getByTestId('sticky')).toHaveStyle({ zIndex: '0' })
  })
})
