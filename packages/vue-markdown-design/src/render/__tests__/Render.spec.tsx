/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\render\__tests__\Render.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress cy.* interactions replaced by vitest-browser-vue render + DOM assertions; Cypress wrapper/component access replaced by TSX ref capture; retry semantics handled with expect.poll where needed.
 */
import { page } from 'vitest/browser'
import Render, { type RenderInstance } from '..'
import { cleanup, render } from 'vitest-browser-vue'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import keywordMd from '../../__tests__/fixtures/commonmark/keyword.md?raw'
import miniMd from '../../__tests__/fixtures/commonmark/mini.md?raw'
import poemMd from '../../__tests__/fixtures/commonmark/poem.md?raw'
import { enableAutoUnmount, mount, VueWrapper } from '@vue/test-utils'

// afterEach(() => {
//   cleanup()
//   vi.restoreAllMocks()
//   window.scrollTo(0, 0)
// })
enableAutoUnmount(beforeEach)

describe('Render', () => {
  test('src', () => {
    const { container } = render(<Render src={miniMd} />)
    expect(container).toMatchSnapshot()
  })

  describe('plugins', () => {
    test('function', async () => {
      render(
        <Render
          src={miniMd}
          plugins={(md) => {
            md.renderer.rules.paragraph_open = () => '<div aria-label="Test paragraph">'
            md.renderer.rules.paragraph_close = () => '</div>'
          }}
        />
      )
      await expect.element(page.getByRole('paragraph')).not.toBeInTheDocument()
      await expect
        .element(
          page.getByLabelText('Test paragraph', {
            hasText: 'This is a paragraph used to test the rendering effect of markdown.'
          })
        )
        .toBeInTheDocument()
    })

    test('array', async () => {
      render(
        <Render
          src={miniMd}
          plugins={[
            (md) => {
              md.renderer.rules.paragraph_open = () => '<div aria-label="Test paragraph">'
            },
            [
              (md, params) => {
                md.renderer.rules.paragraph_close = () => params
              },
              '</div>'
            ]
          ]}
        />
      )
      await expect.element(page.getByRole('paragraph')).not.toBeInTheDocument()
      await expect
        .element(
          page.getByLabelText('Test paragraph', {
            hasText: 'This is a paragraph used to test the rendering effect of markdown.'
          })
        )
        .toBeInTheDocument()
    })
  })

  test('inline', async () => {
    const { rerender } = render(<Render src="markdown" />)
    const locator = page.getByRole('paragraph')
    await expect.element(locator).toBeInTheDocument()
    rerender({ inline: true })
    await expect.element(locator).not.toBeInTheDocument()
  })

  test('presetName', async () => {
    render(<Render src={miniMd} presetName="zero" />)
    await expect.element(page.getByRole('heading')).not.toBeInTheDocument()
  })

  test('html', async () => {
    render(<Render src="<em></em>" />)
    await expect.element(page.getByRole('emphasis')).toBeInTheDocument()
  })

  test('sanitize', async () => {
    render(<Render src="<p>foo<iframe//src=jAva&Tab;script:alert(3)>def</p>" />)
    await expect.element(page.getByRole('paragraph')).toHaveTextContent(/^foo$/)
  })

  test('xhtmlOut', () => {
    const wrapper: VueWrapper<any> = mount(<Render src="---" xhtmlOut />, {
      attachTo: document.body
    })
    expect(wrapper.vm.htmlStr).toBe('<hr />\n')
  })

  test('breaks', async () => {
    render(<Render src={'a\nb'} breaks />)
    await expect.element(page.getByRole('paragraph')).toContainHTML('<br />')
  })

  test('langPrefix', async () => {
    render(<Render src={'```js\nconst = foo\n```'} langPrefix="test-" />)
    const locator = page.getByRole('code')
    await expect.element(locator).not.toHaveClass(/language/)
    await expect.element(locator).toHaveClass(/test/)
  })

  test('linkify', async () => {
    render(<Render src="foo@example.com" linkify />)
    await expect.element(page.getByRole('link', { name: 'foo@example.com' })).toBeInTheDocument()
  })

  test('typographer', async () => {
    render(<Render src="(c)" typographer />)
    await expect.element(page.getByText('©')).toBeInTheDocument()
  })

  test('quotes', async () => {
    render(<Render src={'"foo" \'bar\''} typographer quotes={['«', '»', '‹', '›']} />)
    await expect.element(page.getByText('«foo» ‹bar›')).toBeInTheDocument()
  })

  test('highlight', async () => {
    const { rerender } = render(<Render src={'```js\nconst = foo\n```'} />)
    const locator = page.getByText('const')
    await expect.element(locator).toHaveClass(/hljs/)
    rerender({ highlight: false })
    await expect.element(locator).not.toHaveClass(/hljs/)
  })

  test('highlightOptions', async () => {
    render(<Render src={'```js\nconst = foo\n```'} highlightOptions={{ classPrefix: 'test-' }} />)
    const locator = page.getByText('const')
    await expect.element(locator).not.toHaveClass(/hljs/)
    await expect.element(locator).toHaveClass(/test/)
  })

  test('emoji', async () => {
    render(<Render src=":)" />)
    await expect.element(page.getByText('😃')).toBeInTheDocument()
  })

  describe('anchor', () => {
    test('boolean', async () => {
      render(<Render src="# Title" />)
      await expect
        .element(page.getByRole('heading', { name: 'Title' }))
        .toHaveAttribute('id', 'title')
    })

    test('object', async () => {
      render(<Render src="# Title" anchor={{ tabIndex: false }} />)
      await expect
        .element(page.getByRole('heading', { name: 'Title' }))
        .not.toHaveAttribute('tabIndex')
    })

    test('function', async () => {
      render(
        <Render
          src="# Title"
          anchor={(anchor) => ({
            permalink: anchor.permalink.headerLink({
              renderAttrs: () => ({ 'aria-label': 'Test title' })
            })
          })}
        />
      )
      await expect.element(page.getByRole('link', { name: 'Test title' })).toBeInTheDocument()
    })
  })

  describe('permalink', () => {
    test('默认', async () => {
      render(<Render src="# Title" />)
      await expect.element(page.getByRole('link', { name: '#' })).toBeInTheDocument()
    })

    test('禁用', async () => {
      render(<Render src="# Title" permalink={false} />)
      await expect.element(page.getByRole('link', { name: '#' })).not.toBeInTheDocument()
    })
  })

  test('markdownClass', async () => {
    render(<Render src="markdown" inline markdownClass="test-class" />)
    const locator = page.getByText('markdown')
    await expect.element(locator).not.toHaveClass('markdown-body')
    await expect.element(locator).toHaveClass('test-class')
  })

  test('envChange', () => {
    const { emitted } = render(<Render />)
    expect(emitted()['envChange']).toBeDefined()
  })
})
