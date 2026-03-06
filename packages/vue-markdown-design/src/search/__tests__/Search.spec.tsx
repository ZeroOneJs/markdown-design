/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\search\__tests__\Search.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress DOM queries and event assertions replaced by vitest-browser-vue render + native DOM events; async mark.js highlighting uses expect.poll to match Cypress retry behavior.
 */
import { page, userEvent } from 'vitest/browser'
import Search from '..'
import { cleanup, render } from 'vitest-browser-vue'
import { afterEach, describe, expect, test, vi } from 'vitest'

// afterEach(() => {
//   cleanup()
//   vi.restoreAllMocks()
//   window.scrollTo(0, 0)
// })

describe('Search', () => {
  test('clearable', async () => {
    const { getByLabelText } = render(<Search modelValue="keyword" />)
    await expect.element(getByLabelText('Clear')).toBeInTheDocument()
  })

  test('border', async () => {
    render(<Search data-testid="search" />)
    await expect
      .element(page.getByTestId('search').filter({ has: page.getByRole('textbox') }))
      .toHaveStyle({ borderBottom: '1px solid #dcdfe6' })
  })

  test('size', async () => {
    render(<Search data-testid="search" size="small" />)
    const textboxLocator = page.getByRole('textbox')
    await expect
      .element(page.getByTestId('search').filter({ has: textboxLocator }))
      .toHaveStyle({ fontSize: '12px' })
    await expect.element(textboxLocator).toHaveStyle({ height: '24px' })
  })

  test('disabled', async () => {
    render(<Search disabled />)
    await expect.element(page.getByRole('textbox')).toBeDisabled()
  })

  test('placeholder', async () => {
    render(<Search placeholder="placeholder" />)
    await expect.element(page.getByPlaceholder('placeholder')).toBeInTheDocument()
  })

  test('target', async () => {
    render(() => (
      <>
        <Search target="[data-testid='target']" modelValue="keyword" />
        <div data-testid="target">keyword</div>
        <div data-testid="other">keyword</div>
      </>
    ))
    const markLocator = page.getByRole('mark')
    await expect.element(page.getByTestId('target')).toContainElement(markLocator)
    await expect.element(page.getByTestId('other')).not.toContainElement(markLocator)
  })

  test('target 类型错误', async () => {
    const errorSpy = vi.spyOn(console, 'error')
    render(() => (
      <>
        <Search target="[data-testid='target']" />
        <svg data-testid="target"></svg>
      </>
    ))
    await expect
      .poll(() => errorSpy)
      .toHaveBeenCalledWith('[vue-markdown-design] Target is not of the HTMLElement type.')
  })

  test('target 不存在', async () => {
    const errorSpy = vi.spyOn(console, 'error')
    render(<Search target="[data-testid='target']" />)
    await expect
      .poll(() => errorSpy)
      .toHaveBeenCalledWith('[vue-markdown-design] Target does not exist.')
  })

  test('closeIcon', async () => {
    render(<Search />)
    await expect.element(page.getByLabelText('Close')).toBeInTheDocument()
  })

  test('inputAttrs', async () => {
    render(<Search inputAttrs={{ maxlength: 10 }} />)
    await expect.element(page.getByRole('textbox')).toHaveAttribute('maxlength', '10')
  })

  test('input', async () => {
    const { emitted } = render(<Search />)
    await page.getByRole('textbox').fill('keyword')
    expect(emitted()['input']).toBeDefined()
  })

  test('focus/blur', async () => {
    const { emitted } = render(<Search />)
    const locator = page.getByRole('textbox')
    await locator.click()
    expect(emitted()['focus']).toBeDefined()
    locator.element().blur()
    expect(emitted()['blur']).toBeDefined()
  })

  test('change', async () => {
    const { emitted } = render(<Search />)
    await page.getByRole('textbox').fill('keyword')
    await userEvent.keyboard('{Enter}')
    expect(emitted()['change']).toBeDefined()
  })

  test('clear', async () => {
    const { emitted, rerender } = render(<Search disabled modelValue="keyword" />)
    const locator = page.getByLabelText('Clear')
    await locator.click()
    expect(emitted()['clear']).not.toBeDefined()
    rerender({ disabled: false })
    await locator.click()
    expect(emitted()['clear']).toBeDefined()
  })

  test('stepClick', async () => {
    const { emitted, rerender } = render(<Search disabled modelValue="keyword" />)
    const previousLocator = page.getByLabelText('Previous')
    await previousLocator.click()
    expect(emitted()['stepClick']).not.toBeDefined()
    rerender({ disabled: false })
    await previousLocator.click()
    expect(emitted()['stepClick'][0]).toEqual(['prev'])
    await page.getByRole('textbox').click()
    await userEvent.keyboard('{Enter}')
    expect(emitted()['stepClick'][1]).toEqual(['next'])
  })
})
