/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\search\__tests__\Search.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress DOM queries and event assertions replaced by vitest-browser-vue render + native DOM events; async mark.js highlighting uses expect.poll to match Cypress retry behavior.
 */
import { page, userEvent } from 'vitest/browser'
import '../../style/variables.less'
import Search from '..'
import { cleanup, render } from 'vitest-browser-vue'
import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  window.scrollTo(0, 0)
})

describe('Search', () => {
  it('clearable', () => {
    render(() => <Search modelValue="keyword" />)
    expect(document.querySelector('.vmd-search__clearable')).toBeTruthy()
  })

  it('border', () => {
    render(() => <Search />)
    const root = page.getByRole('textbox').element().closest<HTMLElement>('.vmd-search')
    expect(root).toBeTruthy()
    expect(getComputedStyle(root!).borderBottom).toBe('1px solid rgb(220, 223, 230)')
  })

  it('size', () => {
    render(() => <Search size="small" />)
    const input = page.getByRole('textbox').element()
    const root = input.closest<HTMLElement>('.vmd-search')
    expect(root).toBeTruthy()
    expect(input).toBeTruthy()
    expect(getComputedStyle(root!).fontSize).toBe('12px')
    expect(getComputedStyle(input!).height).toBe('24px')
  })

  it('disabled', async () => {
    render(() => <Search disabled />)
    await expect.element(page.getByRole('textbox')).toBeDisabled()
  })

  it('placeholder', async () => {
    render(() => <Search placeholder="placeholder" />)
    await expect.element(page.getByPlaceholder('placeholder')).toBeInTheDocument()
  })

  it('target', async () => {
    render(() => (
      <>
        <Search target="[data-testid='target']" modelValue="keyword" />
        <div data-testid="target">keyword</div>
        <div data-testid="other">keyword</div>
      </>
    ))
    const target = page.getByTestId('target')
    const other = page.getByTestId('other')
    await expect.poll(() => target.getByText('keyword').element().tagName).toBe('MARK')
    expect(other.getByText('keyword').element().tagName).not.toBe('MARK')
  })

  it('target 类型错误', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(() => (
      <>
        <Search target="[data-cy]" />
        <svg data-cy></svg>
      </>
    ))
    await expect.poll(() => errorSpy.mock.calls.length).toBeGreaterThan(0)
    expect(errorSpy).toHaveBeenCalledWith(
      '[vue-markdown-design] Target is not of the HTMLElement type.'
    )
  })

  it('target 不存在', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(() => <Search target="[data-cy]" />)
    await expect.poll(() => errorSpy.mock.calls.length).toBeGreaterThan(0)
    expect(errorSpy).toHaveBeenCalledWith('[vue-markdown-design] Target does not exist.')
  })

  it('closeIcon', () => {
    render(() => <Search />)
    expect(document.querySelector('.vmd-search__close')).toBeTruthy()
  })

  it('inputAttrs', () => {
    render(() => <Search inputAttrs={{ maxlength: 10 }} />)
    const input = page.getByRole('textbox').element()
    expect(input.getAttribute('maxlength')).toBe('10')
  })

  it('input', async () => {
    const onInput = vi.fn()
    render(() => <Search onInput={onInput} />)
    await page.getByRole('textbox').fill('keyword')
    await expect.poll(() => onInput.mock.calls.length).toBeGreaterThan(0)
    expect(onInput).toHaveBeenCalledWith(expect.objectContaining({ type: 'input' }))
  })

  it('focus/blur', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    render(() => <Search onFocus={onFocus} onBlur={onBlur} />)
    await page.getByRole('textbox').click()
    await expect.poll(() => onFocus.mock.calls.length).toBeGreaterThan(0)
    expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ type: 'focus' }))
    page.getByRole('textbox').element().blur()
    await expect.poll(() => onBlur.mock.calls.length).toBeGreaterThan(0)
    expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ type: 'blur' }))
  })

  it('change', async () => {
    const onChange = vi.fn()
    render(() => <Search onChange={onChange} />)
    await page.getByRole('textbox').fill('keyword')
    page
      .getByRole('textbox')
      .element()
      .dispatchEvent(new Event('change', { bubbles: true }))
    await expect.poll(() => onChange.mock.calls.length).toBeGreaterThan(0)
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ type: 'change' }))
  })

  it('clear', async () => {
    const onClear = vi.fn()
    const result = render(Search, {
      props: { modelValue: 'keyword', disabled: true, onClear }
    })
    const btn = () => document.querySelector<HTMLElement>('.vmd-search__clearable')
    await expect.poll(() => !!btn()).toBe(true)
    await userEvent.click(btn()!)
    expect(onClear).not.toHaveBeenCalled()
    result.rerender({ disabled: false })
    await expect.poll(() => !!btn()).toBe(true)
    await userEvent.click(btn()!)
    await expect.poll(() => onClear.mock.calls.length).toBe(1)
  })

  it('stepClick', async () => {
    const onStepClick = vi.fn()
    const result = render(Search, {
      props: { modelValue: 'keyword', disabled: true, onStepClick }
    })
    const prev = () => document.querySelector<HTMLElement>('.vmd-search__prev')
    await expect.poll(() => !!prev()).toBe(true)
    await userEvent.click(prev()!)
    expect(onStepClick).not.toHaveBeenCalled()
    result.rerender({ disabled: false })
    await expect.poll(() => !!prev()).toBe(true)
    await userEvent.click(prev()!)
    await expect.poll(() => onStepClick.mock.calls.length).toBe(1)
    expect(onStepClick).toHaveBeenCalledWith('prev')
    await page.getByRole('textbox').click()
    await userEvent.keyboard('{Enter}')
    await expect.poll(() => onStepClick.mock.calls.length).toBe(2)
    expect(onStepClick).toHaveBeenCalledWith('next')
  })
})
