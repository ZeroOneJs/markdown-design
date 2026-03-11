import { page, userEvent } from 'vitest/browser'
import Search from '..'
import { render } from 'vitest-browser-vue'
import { describe, expect, test, vi } from 'vitest'

describe('Search', () => {
  test('clearable', async () => {
    render(<Search modelValue="keyword" />)
    await expect.element(page.getByLabelText('Clear')).toBeInTheDocument()
  })

  test('border', async () => {
    render(<Search data-testid="search" />)
    await expect
      .element(page.getByTestId('search').filter({ has: page.getByRole('textbox') }))
      .toHaveStyle({ borderBottom: '1px solid #dcdfe6' })
  })

  test('size', async () => {
    render(<Search data-testid="search" size="small" />)
    const locator = page.getByRole('textbox')
    await expect
      .element(page.getByTestId('search').filter({ has: locator }))
      .toHaveStyle({ fontSize: '12px' })
    await expect.element(locator).toHaveStyle({ height: '24px' })
  })

  test('disabled', async () => {
    render(<Search disabled />)
    await expect.element(page.getByRole('textbox')).toBeDisabled()
  })

  test('placeholder', async () => {
    render(<Search placeholder="Search" />)
    await expect.element(page.getByPlaceholder('Search')).toBeInTheDocument()
  })

  test('target', async () => {
    render(() => (
      <>
        <Search target="[data-testid='target']" modelValue="Keyword" />
        <div data-testid="target">Keyword</div>
        <div data-testid="other">Keyword</div>
      </>
    ))
    const locator = page.getByRole('mark')
    await expect.element(page.getByTestId('target')).toContainElement(locator)
    await expect.element(page.getByTestId('other')).not.toContainElement(locator)
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
    const { rerender } = render(<Search />)
    await expect.element(page.getByLabelText('Close')).toBeInTheDocument()
    rerender({ closeIcon: false })
    await expect.element(page.getByLabelText('Close')).not.toBeInTheDocument()
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
    await page.getByRole('textbox').click()
    expect(emitted()['focus']).toBeDefined()
    await page.getByLabelText('Close').click()
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
    const locator = page.getByLabelText('Previous')
    await locator.click()
    expect(emitted()['stepClick']).not.toBeDefined()
    rerender({ disabled: false })
    await locator.click()
    expect(emitted()['stepClick'][0]).toEqual(['prev'])
    await page.getByRole('textbox').click()
    await userEvent.keyboard('{Enter}')
    expect(emitted()['stepClick'][1]).toEqual(['next'])
  })
})
