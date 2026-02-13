import { page } from 'vitest/browser'
import Sticky from '..'
import { render } from 'vitest-browser-vue'
import { describe, expect, test } from 'vitest'

// 防止测试用例之间的滚动条相互干扰
const style = {
  width: '100vw',
  height: '100vh',
  overflow: 'auto'
}

describe('Sticky', () => {
  describe('posY', () => {
    test('top', () => {
      render(() => (
        <div style={style}>
          <div style="height: 100vh">Placeholder</div>
          <div>
            <Sticky>
              <div>Content</div>
            </Sticky>
            <div style="height: 100px">Inside</div>
          </div>
          <div style="height: 100vh">Outside</div>
        </div>
      ))
      const locator = page.getByText('Content')
      page.getByText('Inside').element().scrollIntoView()
      expect(locator.boundingClientRect('top')).toBe(0)
      page.getByText('Outside').element().scrollIntoView()
      expect(locator.boundingClientRect('top')).toBeLessThan(0)
    })

    test('bottom', () => {
      render(() => (
        <div style={style}>
          <div style="height: 100vh">Placeholder</div>
          <div>
            <div style="height: 100px">Inside</div>
            <Sticky posY="bottom">
              <div>Content</div>
            </Sticky>
          </div>
          <div style="height: 100vh">Outside</div>
        </div>
      ))
      const locator = page.getByText('Content')
      // 720 为窗口高度
      expect(locator.boundingClientRect('bottom')).toBeGreaterThan(720)
      page.getByText('Inside').element().scrollIntoView(false)
      expect(locator.boundingClientRect('bottom')).toBe(720)
    })
  })

  test('posX', async () => {
    render(() => (
      <div style="width: 500px;height: 500px;">
        <Sticky posX="right" flow={false}>
          <div>Content</div>
        </Sticky>
      </div>
    ))
    await expect.poll(() => page.getByText('Content').boundingClientRect('right')).toBe(500)
  })

  test('offset', () => {
    render(() => (
      <div style="height: 200px;">
        <Sticky offset="100">
          <div>Content</div>
        </Sticky>
      </div>
    ))
    expect(page.getByText('Content').boundingClientRect('top')).toBe(100)
  })

  test('flow', async () => {
    render(() => (
      <div style="height: 200px;">
        <Sticky flow={false}>
          <div>Content</div>
        </Sticky>
        <div style="height: 100vh">Placeholder</div>
      </div>
    ))
    await expect.poll(() => page.getByText('Placeholder').boundingClientRect('top')).toBe(0)
  })

  test('zIndex', async () => {
    render(<Sticky data-testid="sticky" zIndex="0" />)
    await expect.element(page.getByTestId('sticky')).toHaveStyle({ zIndex: '0' })
  })
})
