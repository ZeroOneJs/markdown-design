import { page, userEvent } from 'vitest/browser'
import Search from '..'
import { render } from 'vitest-browser-vue'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'

enableAutoUnmount(beforeEach)

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

  // test('next button click', async () => {
  //   const { emitted } = render(<Search modelValue="keyword" />)
  //   const nextBtn = page.getByLabelText('Next')
  //   await nextBtn.click()
  //   expect(emitted()['stepClick']).toBeDefined()
  //   expect(emitted()['stepClick'][0]).toEqual(['next'])
  // })

  test('refresh', async () => {
    const wrapper = mount(
      ({ content = 'Content 1' }) => {
        return (
          <>
            <Search modelValue="t" target="[data-testid='target']" />
            <div v-html={content} data-testid="target"></div>
          </>
        )
      },
      {
        attachTo: document.body
      }
    )
    const locator = page.getByRole('mark')
    await expect.element(locator).toHaveLength(2)
    await wrapper.setProps({ content: 'Content 2' })
    const instance = wrapper.getComponent(Search)
    instance.vm.$.exposed?.refresh()
    await expect.element(locator).toHaveLength(2)
    await page.getByLabelText('Next').click()
    await wrapper.setProps({ content: 'Content 3' })
    instance.vm.$.exposed?.refresh(false)
    await expect.element(locator.first()).not.toHaveClass('vmd-search--highlight')
    await expect.element(locator.last()).toHaveClass('vmd-search--highlight')
  })
})
