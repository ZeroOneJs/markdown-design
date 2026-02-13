/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\sticky\__tests__\Sticky.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress scrolling and boundary assertions replaced by window/element scrolling + getBoundingClientRect; retries implemented with expect.poll for layout stabilization.
 */
import { page } from 'vitest/browser'
import Sticky from '..'
import { cleanup, render } from 'vitest-browser-vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { scrollToTop } from '../../__tests__/vitest-utils'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  scrollToTop()
})

describe('Sticky', () => {
  describe('posY', () => {
    it('top', async () => {
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

      const inside = page.getByTestId('inside').element()
      inside.scrollIntoView()
      await expect
        .poll(() => Math.floor(page.getByTestId('content').element().getBoundingClientRect().top))
        .toBe(0)

      const outside = page.getByTestId('outside').element()
      outside.scrollIntoView()
      await expect
        .poll(() => page.getByTestId('content').element().getBoundingClientRect().top)
        .toBeLessThan(0)
    })

    it('bottom', async () => {
      scrollToTop()
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

      const viewportHeight = window.innerHeight
      await expect
        .poll(() => page.getByTestId('content').element().getBoundingClientRect().bottom)
        .toBeGreaterThan(viewportHeight)

      window.scrollTo(0, 50)
      await expect
        .poll(() =>
          Math.floor(page.getByTestId('content').element().getBoundingClientRect().bottom)
        )
        .toBe(viewportHeight)
    })
  })

  it('posX', async () => {
    render(() => (
      <div data-testid="target" style="width: 500px;height: 500px;position: absolute;left: 0;">
        <Sticky posX="right" flow={false}>
          <div data-testid="content">content</div>
        </Sticky>
      </div>
    ))
    await expect
      .poll(() => Math.floor(page.getByTestId('content').element().getBoundingClientRect().right))
      .toBe(500)
  })

  it('offset', async () => {
    render(() => (
      <div data-testid="target" style="height: 200px;">
        <Sticky offset="100">
          <div data-testid="content">content</div>
        </Sticky>
      </div>
    ))
    await expect
      .poll(() => Math.floor(page.getByTestId('content').element().getBoundingClientRect().top))
      .toBe(100)
  })

  it('flow', async () => {
    render(() => (
      <div style="height: 200px;">
        <Sticky flow={false}>
          <div>content</div>
        </Sticky>
        <div data-testid="spacer" style="height: 100vh">
          placeholder
        </div>
      </div>
    ))
    const expectedTop = parseInt(getComputedStyle(document.body).marginTop || '0')
    await expect
      .poll(() => Math.floor(page.getByTestId('spacer').element().getBoundingClientRect().top))
      .toBe(expectedTop)
  })

  it('zIndex', () => {
    render(() => (
      <div data-testid="target" style="height: 200px;">
        <Sticky zIndex="0" offset="100">
          <div>content</div>
        </Sticky>
      </div>
    ))
    const el = page.getByText('content').element().closest<HTMLElement>('.vmd-sticky')
    expect(el).toBeTruthy()
    expect(getComputedStyle(el!).zIndex).toBe('0')
  })

  it('滚动对象', async () => {
    scrollToTop()
    render(() => (
      <>
        <div style="height: 90vh">placeholder</div>
        <div data-testid="scroll" style="height: 100px; overflow: auto; background:mark;">
          <div data-testid="target">
            <div style="height: 90vh">placeholder</div>
            <Sticky posY="bottom">
              <div data-testid="content">content</div>
            </Sticky>
            <div style="height: 90vh">placeholder</div>
          </div>
        </div>
        <div style="height: 100vh">placeholder</div>
      </>
    ))

    const viewportHeight = window.innerHeight
    expect(
      Math.floor(page.getByTestId('content').element().getBoundingClientRect().bottom)
    ).not.toBe(viewportHeight)

    const scroll = page.getByTestId('scroll').element()
    const max = Math.max(0, scroll.scrollHeight - scroll.clientHeight)
    const candidates = [0, 0.25, 0.5, 0.75, 1].map((p) => Math.floor(max * p))
    let ok = false
    for (const pos of candidates) {
      scroll.scrollTop = pos
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      )
      const { bottom: scrollBottom } = scroll.getBoundingClientRect()
      ok =
        Math.abs(
          page.getByTestId('content').element().getBoundingClientRect().bottom - scrollBottom
        ) <= 1
      if (ok) break
    }
    expect(ok).toBe(true)
  })
})
