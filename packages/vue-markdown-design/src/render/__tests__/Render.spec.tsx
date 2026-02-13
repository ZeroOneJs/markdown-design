/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\render\__tests__\Render.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress cy.* interactions replaced by vitest-browser-vue render + DOM assertions; Cypress wrapper/component access replaced by TSX ref capture; retry semantics handled with expect.poll where needed.
 */
import { page } from 'vitest/browser'
import Render, { type RenderInstance } from '..'
import { cleanup, render } from 'vitest-browser-vue'
import { afterEach, describe, expect, it, vi } from 'vitest'

import mini from '../../__tests__/fixtures/commonmark/mini.md?raw'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  window.scrollTo(0, 0)
})

describe('Render', () => {
  it('src', async () => {
    render(() => <Render src={mini} />)
    await expect
      .element(page.getByRole('heading', { level: 1, name: 'Title' }))
      .toHaveAttribute('id', 'title')
    await expect.element(page.getByRole('link', { name: '#' })).toHaveAttribute('href', '#title')
    await expect
      .element(page.getByText('This is a paragraph used to test the rendering effect of markdown.'))
      .toBeInTheDocument()
  })

  describe('plugins', () => {
    const text = 'This is a paragraph used to test the rendering effect of markdown.'

    it('function', async () => {
      render(() => (
        <Render
          src={mini}
          plugins={(md) => {
            md.renderer.rules.paragraph_open = () => '<span>'
            md.renderer.rules.paragraph_close = () => '</span>'
          }}
        />
      ))
      const el = await expect
        .element(page.getByText(text))
        .toBeInTheDocument()
        .then(() => page.getByText(text).element())
      expect(el.tagName).toBe('SPAN')
      expect(el.closest('p')).toBeNull()
    })

    it('array', async () => {
      render(() => (
        <Render
          src={mini}
          plugins={[
            (md) => {
              md.renderer.rules.paragraph_open = () => '<span>'
            },
            [
              (md, params) => {
                md.renderer.rules.paragraph_close = () => params
              },
              '</span>'
            ]
          ]}
        />
      ))
      const el = await expect
        .element(page.getByText(text))
        .toBeInTheDocument()
        .then(() => page.getByText(text).element())
      expect(el.tagName).toBe('SPAN')
      expect(el.closest('p')).toBeNull()
    })
  })

  it('inline', async () => {
    render(() => <Render src="**markdown**" inline />)
    const strong = await expect
      .element(page.getByText('markdown'))
      .toBeInTheDocument()
      .then(() => page.getByText('markdown').element())
    expect(strong.tagName).toBe('STRONG')
    expect(strong.closest('p')).toBeNull()
  })

  it('presetName', () => {
    render(() => <Render src="<br>" presetName="zero" />)
    expect(document.querySelector('br')).toBeNull()
  })

  it('html', async () => {
    render(() => <Render src={'<span data-cy>markdown</span>'} />)
    await expect.element(page.getByText('markdown')).toHaveAttribute('data-cy')
  })

  it('sanitize', async () => {
    render(() => <Render src={'<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'} />)
    const p = await expect
      .element(page.getByText('abc'))
      .toBeInTheDocument()
      .then(() => page.getByText('abc').element().closest('p'))
    expect(p).toBeTruthy()
    expect(p!.textContent).toBe('abc')
    expect(document.body.textContent).not.toContain('def')
  })

  it('xhtmlOut', () => {
    let instance: RenderInstance | null = null
    render(() => <Render xhtmlOut ref={(el) => (instance = el as RenderInstance)} />)
    const html = instance!.mdInstance.render('---')
    expect(html).toBe('<hr />\n')
  })

  it('breaks', async () => {
    render(() => <Render src={'a\nb'} breaks />)
    await expect
      .poll(() => document.querySelector<HTMLElement>('.markdown-body')?.innerHTML)
      .toBe('<p>a<br>\nb</p>\n')
  })

  it('langPrefix', async () => {
    render(() => <Render src={'```js\nconst = foo\n```'} langPrefix="cy-" />)
    const code = await expect
      .element(page.getByText('const = foo'))
      .toBeInTheDocument()
      .then(() => page.getByText('const = foo').element().closest('code'))
    expect(code).toBeTruthy()
    expect(code!.className.startsWith('language-')).toBe(false)
    expect(code!.className.startsWith('cy-')).toBe(true)
  })

  it('linkify', async () => {
    render(() => <Render src={'foo@example.com'} linkify />)
    await expect
      .element(page.getByRole('link', { name: 'foo@example.com' }))
      .toHaveAttribute('href', 'mailto:foo@example.com')
  })

  it('typographer', async () => {
    render(() => <Render src={'"foo" \'bar\''} typographer />)
    await expect.element(page.getByText('“foo” ‘bar’')).toBeInTheDocument()
  })

  it('quotes', async () => {
    render(() => (
      <Render src={'"foo" \'bar\''} typographer quotes={['[[[', ']]', '(((((', '))))']} />
    ))
    await expect.element(page.getByText('[[[foo]] (((((bar))))')).toBeInTheDocument()
  })

  it('highlight', async () => {
    const result = render(Render, {
      props: {
        src: '```js\nconst = foo\n```'
      }
    })
    await expect.poll(() => !!document.querySelector('code.language-js')).toBe(true)
    result.rerender({ src: '```\nconst = foo\n```' })
    await expect.poll(() => document.querySelector('code.language-js')).toBeNull()
    await expect.poll(() => !!document.querySelector('[class^=hljs-]')).toBe(true)
    result.rerender({ highlight: false })
    await expect.poll(() => document.querySelector('[class^=hljs-]')).toBeNull()
  })

  it('highlightOptions', () => {
    render(() => (
      <Render src={'```js\nconst = foo\n```'} highlightOptions={{ classPrefix: 'cy-' }} />
    ))
    expect(document.querySelector('[class^=hljs-]')).toBeNull()
    expect(document.querySelector('[class^=cy-]')).toBeTruthy()
  })

  it('emoji', () => {
    render(() => <Render src={':)'} />)
    expect(document.body.textContent).toContain('😃')
  })

  describe('anchor', () => {
    it('boolean', async () => {
      render(() => <Render src={'# Title'} />)
      await expect
        .element(page.getByRole('heading', { level: 1, name: 'Title' }))
        .toHaveAttribute('id', 'title')
    })

    it('object', async () => {
      render(() => <Render src={'# Title'} anchor={{ tabIndex: false }} />)
      const el = await expect
        .element(page.getByRole('heading', { level: 1, name: 'Title' }))
        .toBeInTheDocument()
        .then(() => page.getByRole('heading', { level: 1, name: 'Title' }).element())
      expect(el.hasAttribute('tabindex')).toBe(false)
      expect(el.hasAttribute('tabIndex')).toBe(false)
    })

    it('function', async () => {
      render(() => (
        <Render
          src={'# Title'}
          anchor={(anchor) => ({
            permalink: anchor.permalink.headerLink({
              renderAttrs: () => ({
                'data-cy': 'title'
              })
            })
          })}
        />
      ))
      await expect
        .element(page.getByRole('link', { name: 'Title' }))
        .toHaveAttribute('data-cy', 'title')
    })
  })

  describe('permalink', () => {
    it('默认', async () => {
      render(() => <Render src={'# Title'} />)
      await expect.element(page.getByRole('link', { name: '#' })).toBeInTheDocument()
    })

    it('禁用', async () => {
      render(() => <Render src={'# Title'} permalink={false} />)
      await expect
        .element(page.getByRole('heading', { level: 1, name: 'Title' }))
        .toBeInTheDocument()
      expect(page.getByRole('link', { name: '#' }).query()).toBeNull()
    })
  })

  it('markdownClass', () => {
    render(() => <Render markdownClass="cy-test" />)
    expect(document.querySelector('.markdown-body')).toBeNull()
    expect(document.querySelector('.cy-test')).toBeTruthy()
  })

  it('envChange', async () => {
    const onEnvChange = vi.fn()
    render(() => <Render onEnvChange={onEnvChange} />)
    await expect.poll(() => onEnvChange.mock.calls.length).toBeGreaterThan(0)
    expect(onEnvChange).toHaveBeenCalledWith({})
  })
})
