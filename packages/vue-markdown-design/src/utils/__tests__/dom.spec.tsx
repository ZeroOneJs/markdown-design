import { scrollToEl } from '../dom'
import { render } from 'vitest-browser-vue'
import { describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'

// 防止测试用例之间的滚动条相互干扰
const style = {
  width: '100vw',
  height: '100vh',
  overflow: 'auto'
}

describe('dom', () => {
  test('scrollToEl', async () => {
    render(() => (
      <div style={style}>
        <div style="height: 100vh;"></div>
        <div>Content</div>
        <div style="height: 100vh;"></div>
      </div>
    ))
    const locator = page.getByText('Content')
    scrollToEl(locator.element())
    await expect.poll(() => locator.boundingClientRect('top')).toBe(0)
  })
})
