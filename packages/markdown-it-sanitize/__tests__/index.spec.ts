// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest'
import MarkdownIt from 'markdown-it'
import { sanitize } from '../src/index'

interface ExtraContext {
  md: MarkdownIt
}

describe('markdown-it-sanitize', () => {
  beforeEach<ExtraContext>((context) => {
    const md = new MarkdownIt({ html: true })
    md.use(sanitize)
    context.md = md
  })
  it<ExtraContext>('html_block', ({ md }) => {
    const clean = md.render('<p>foo<iframe//src=jAva&Tab;script:alert(3)>def</p>')
    expect(clean).toBe('<p>foo</p>')
  })
  it<ExtraContext>('html_inline', ({ md }) => {
    const clean = md.render('<span>foo<img src=x onerror=alert(1)//></span>')
    expect(clean).toBe('<p><span>foo<img src="x"></span></p>\n')
  })
  it('options', () => {
    const md = new MarkdownIt({ html: true })
    md.use(sanitize, {
      ALLOWED_TAGS: ['div', '#text']
    })
    const clean = md.render('<div><span>foo<img src=x onerror=alert(1)//></span></div>')
    expect(clean).toBe('<div>foo</div>')
  })
  it('html 为 false', () => {
    const md = new MarkdownIt()
    md.use(sanitize)
    const clean = md.render('<span>foo<img src=x onerror=alert(1)//></span>')
    expect(clean).toBe('<p>&lt;span&gt;foo&lt;img src=x onerror=alert(1)//&gt;&lt;/span&gt;</p>\n')
  })
  it<ExtraContext>('纯文本', ({ md }) => {
    const clean = md.render('foo')
    expect(clean).toBe('<p>foo</p>\n')
  })
})
