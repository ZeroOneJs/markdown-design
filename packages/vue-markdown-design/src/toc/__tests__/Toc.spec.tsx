/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\toc\__tests__\Toc.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress cy.* assertions replaced by vitest-browser-vue render + DOM assertions; console spies use vi.spyOn; retries use expect.poll for async layout.
 */
import { page } from 'vitest/browser'
import Toc, { type TocItem } from '..'
import { cleanup, render } from 'vitest-browser-vue'
import { afterEach, describe, expect, it, vi } from 'vitest'

import tocMd from '../../__tests__/fixtures/commonmark/toc.md?raw'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  window.scrollTo(0, 0)
})

describe('Toc', () => {
  it('startLevel', () => {
    render(() => (
      <div data-testid="toc">
        <Toc markdown={tocMd} startLevel="2" />
      </div>
    ))
    expect(page.getByTestId('toc').getByText('Title 1').query()).toBeNull()
  })

  it('endLevel', () => {
    render(() => (
      <div data-testid="toc">
        <Toc markdown={tocMd} endLevel="5" />
      </div>
    ))
    expect(page.getByTestId('toc').getByText('Title 6').query()).toBeNull()
  })

  it('level 超出范围', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(() => <Toc startLevel="-1" />)
    await expect.poll(() => warnSpy.mock.calls.length).toBeGreaterThan(0)
    expect(warnSpy).toHaveBeenCalledWith(
      '[vue-markdown-design] The start-level or end-level is outside the valid range.'
    )
  })

  it('startLevel 小于 endLevel', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(() => <Toc startLevel="6" endLevel="1" />)
    await expect.poll(() => warnSpy.mock.calls.length).toBeGreaterThan(0)
    expect(warnSpy).toHaveBeenCalledWith(
      '[vue-markdown-design] The start-level must be less than the end-level.'
    )
  })

  it('orderedList', () => {
    render(() => (
      <div data-testid="toc">
        <Toc markdown={'# Title\n# Title'} orderedList />
      </div>
    ))
    expect(page.getByTestId('toc').getByText('1. Title').query()).toBeTruthy()
    expect(page.getByTestId('toc').getByText('2. Title').query()).toBeTruthy()
  })

  it('target', () => {
    render(() => (
      <>
        <div data-testid="toc">
          <Toc target="[data-testid='target']" />
        </div>
        <div data-testid="target">
          <h1>Title 1</h1>
        </div>
        <div>
          <h1>Title 2</h1>
        </div>
      </>
    ))
    return expect
      .poll(() => page.getByTestId('toc').getByText('Title 1').query())
      .toBeTruthy()
      .then(() => {
        expect(page.getByTestId('toc').getByText('Title 2').query()).toBeNull()
      })
  })

  it('ignore', () => {
    render(() => (
      <div data-testid="toc">
        <Toc markdown={tocMd} ignore={[3]} />
      </div>
    ))
    expect(page.getByTestId('toc').getByText('Title 3').query()).toBeNull()
  })

  it('emptyText', () => {
    render(() => (
      <div data-testid="toc">
        <Toc markdown="text" />
      </div>
    ))
    expect(page.getByTestId('toc').getByText('No Data').query()).toBeTruthy()
  })

  it('markdown', async () => {
    render(() => (
      <div data-testid="toc">
        <Toc markdown={tocMd} />
      </div>
    ))
    const titles = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6']
    await expect
      .poll(() =>
        titles.every((t) => !!page.getByTestId('toc').getByText(t, { exact: true }).query())
      )
      .toBe(true)
  })

  it('slots', () => {
    render(() => (
      <div data-testid="toc">
        <Toc markdown={tocMd}>
          {{
            item: (tocItem: TocItem) => <span data-cy>{tocItem.text}</span>
          }}
        </Toc>
      </div>
    ))
    const el = page.getByTestId('toc').getByText('Title 1').element()
    expect(el).toHaveAttribute('data-cy')
  })

  it('小标题放在首位', async () => {
    render(() => (
      <div data-testid="toc">
        <Toc markdown={`## Subtitle\n# Title`} />
      </div>
    ))
    const subtitle = page.getByTestId('toc').getByText('Subtitle', { exact: true }).element()
    const title = page.getByTestId('toc').getByText('Title', { exact: true }).element()
    expect(subtitle.compareDocumentPosition(title) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    await expect.poll(() => getComputedStyle(subtitle).paddingLeft).toBe('16px')
    expect(getComputedStyle(title).paddingLeft).toBe('0px')
  })

  it('英文长文本换行', async () => {
    const longTitle =
      'lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng'
    render(() => (
      <div data-testid="toc">
        <Toc markdown={`# ${longTitle}`} />
      </div>
    ))
    const el = page.getByTestId('toc').getByText(longTitle).element()
    await expect.poll(() => el.getBoundingClientRect().height).toSatisfy((h) => h > 23)
  })
})
