import { page } from 'vitest/browser'
import Toc, { type TocItem } from '..'
import { render } from 'vitest-browser-vue'
import { describe, expect, test, vi } from 'vitest'

import tocMd from '../../__tests__/fixtures/commonmark/toc.md?raw'

describe('Toc', () => {
  test('startLevel', async () => {
    render(<Toc markdown={tocMd} startLevel="2" />)
    await expect.element(page.getByText('Title 1')).not.toBeInTheDocument()
  })

  test('endLevel', async () => {
    render(<Toc markdown={tocMd} endLevel="5" />)
    await expect.element(page.getByText('Title 6')).not.toBeInTheDocument()
  })

  test('level 超出范围', () => {
    const warnSpy = vi.spyOn(console, 'warn')
    render(<Toc startLevel="-1" />)
    expect(warnSpy).toHaveBeenCalledWith(
      '[vue-markdown-design] The start-level or end-level is outside the valid range.'
    )
  })

  test('startLevel 小于 endLevel', () => {
    const warnSpy = vi.spyOn(console, 'warn')
    render(<Toc startLevel="2" endLevel="1" />)
    expect(warnSpy).toHaveBeenCalledWith(
      '[vue-markdown-design] The start-level must be less than the end-level.'
    )
  })

  test('orderedList', async () => {
    render(<Toc markdown={'# Title\n# Title'} orderedList />)
    const locator = page.getByRole('listitem')
    expect(locator).toHaveLength(2)
    await Promise.all(
      locator
        .all()
        .map((locator, index) => expect(locator).toHaveTextContent(`${index + 1}. Title`))
    )
  })

  test('target', async () => {
    render(() => (
      <>
        <Toc target="[data-testid='target']" />
        <div data-testid="target">
          <h1>Target</h1>
        </div>
        <div data-testid="other">
          <h1>Other</h1>
        </div>
      </>
    ))
    const locator = page.getByRole('listitem')
    await expect.element(locator).toHaveTextContent('Target')
    await expect.element(locator).not.toHaveTextContent('Other')
  })

  test('ignore', async () => {
    render(<Toc markdown={tocMd} ignore={[3]} />)
    await expect.element(page.getByText('Title 3')).not.toBeInTheDocument()
  })

  test('emptyText', async () => {
    render(<Toc markdown="foo" />)
    await expect.element(page.getByText('No Data')).toBeInTheDocument()
  })

  test('markdown', () => {
    render(<Toc markdown={tocMd} />)
    expect(page.getByRole('listitem')).toHaveLength(6)
  })

  test('slots', async () => {
    render(
      <Toc markdown={tocMd}>
        {{
          item: (tocItem: TocItem) => <span data-testid="slot">{tocItem.text}</span>
        }}
      </Toc>
    )
    await expect.element(page.getByTestId('slot')).toHaveLength(6)
  })

  test('小标题放在首位', async () => {
    render(<Toc markdown={`## Subtitle\n# Title`} />)
    await expect.element(page.getByText('Subtitle')).toHaveStyle({ paddingLeft: '16px' })
    await expect
      .element(page.getByText('Title', { exact: true }))
      .toHaveStyle({ paddingLeft: '0px' })
  })

  test('英文长文本换行', () => {
    render(
      <Toc markdown="# Lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng" />
    )
    expect(page.getByRole('listitem').boundingClientRect('height')).toBeGreaterThan(36)
  })

  // test('levelWithNum 为空', async () => {
  //   render(<Toc markdown="# Title" ignore={[1, 2, 3, 4, 5, 6]} />)
  //   await expect.element(page.getByText('No Data')).toBeInTheDocument()
  // })
})
