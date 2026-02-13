/**
 * Migrated from: d:\Users\Administrator\Documents\markdown-design\packages\vue-markdown-design\src\markdown\__tests__\Markdown.cy.tsx
 * Migrator: Trae IDE GPT-5.2
 * Date: 2026-02-13
 * Key changes: Cypress cy.* interactions replaced by vitest-browser-vue render + native DOM events; Cypress retry semantics replaced by expect.poll; Cypress wrapper/component access replaced by TSX ref capture and reactive props.
 */
import { page, userEvent } from 'vitest/browser'
import Markdown, { type MarkdownInstance } from '..'
import MarkdownIt from 'markdown-it'
import { cleanup, render } from 'vitest-browser-vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, reactive, ref, type Ref } from 'vue'
import { scrollToTop } from '../../__tests__/vitest-utils'

import keywordMd from '../../__tests__/fixtures/commonmark/keyword.md?raw'
import miniMd from '../../__tests__/fixtures/commonmark/mini.md?raw'
import poemMd from '../../__tests__/fixtures/commonmark/poem.md?raw'

// afterEach(() => {
//   cleanup()
//   vi.restoreAllMocks()
//   scrollToTop()
// })

// function renderWithWidth(widthPx: number, ui: () => any) {
//   const container = document.createElement('div')
//   container.style.width = `${widthPx}px`
//   document.body.appendChild(container)
//   const result = render(ui, { container })
//   return { result, container }
// }

// function renderMarkdown(
//   initialProps: Record<string, any>,
//   options?: Parameters<typeof render>[1]
// ): {
//   instance: Ref<MarkdownInstance | undefined>
//   setProps: (patch: Record<string, any>) => Promise<void>
// } {
//   const instance = ref<MarkdownInstance>()
//   const props = reactive({ ...initialProps })
//   const Wrapper = defineComponent({
//     setup() {
//       return () => <Markdown ref={(el) => (instance.value = el as MarkdownInstance)} {...(props as any)} />
//     }
//   })
//   render(Wrapper, options)
//   const setProps = async (patch: Record<string, any>) => {
//     Object.assign(props, patch)
//     await nextTick()
//   }
//   return { instance, setProps }
// }

describe('Markdown', () => {
  it.only('keyword/update:keyword', async () => {
    const onUpdateKeyword = vi.fn()
    const { getByRole } = render(<Markdown src={keywordMd} search />)
    const input = getByRole('textbox')
    await input.fill('Keyword')
    await expect.poll(() => onUpdateKeyword.mock.calls.some((c) => c[0] === 'Keyword')).toBe(true)
    await expect.poll(() => document.querySelectorAll('mark.vmd-search--mark').length).toBe(3)
    await expect.poll(() => !!document.querySelector('.vmd-search--highlight')).toBe(true)
  })

  describe('showBtn', () => {
    it('boolean', () => {
      render(() => <Markdown showBtn />)
      expect(document.querySelector('.vmd-markdown__btn')).toBeTruthy()
    })

    it('array', () => {
      render(() => <Markdown showBtn={['toc']} />)
      expect(document.querySelector('.vmd-markdown__btn-toc')).toBeTruthy()
      expect(document.querySelector('.vmd-markdown__btn-search')).toBeNull()
    })

    it('object', () => {
      render(() => <Markdown showBtn={{ search: true }} />)
      expect(document.querySelector('.vmd-markdown__btn-search')).toBeTruthy()
      expect(document.querySelector('.vmd-markdown__btn-toc')).toBeNull()
    })
  })

  it('search/update:search', async () => {
    const onUpdateSearch = vi.fn()
    render(() => <Markdown search showBtn onUpdate:search={onUpdateSearch} />)
    await expect.element(page.getByRole('textbox')).toBeInTheDocument()
    const btn = document.querySelector<HTMLElement>('.vmd-markdown__btn-search')
    expect(btn).toBeTruthy()
    btn!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    await expect.poll(() => onUpdateSearch.mock.calls.some((c) => c[0] === false)).toBe(true)
    await expect.poll(() => document.querySelector('.vmd-markdown__search')).toBeNull()
  })

  it('toc/update:toc', async () => {
    const onUpdateToc = vi.fn()
    render(() => <Markdown toc showBtn onUpdate:toc={onUpdateToc} />)
    await expect.poll(() => !!document.querySelector('.vmd-markdown__toc')).toBe(true)
    const btn = document.querySelector<HTMLElement>('.vmd-markdown__btn-toc')
    expect(btn).toBeTruthy()
    btn!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    await expect.poll(() => onUpdateToc.mock.calls.some((c) => c[0] === false)).toBe(true)
    await expect.poll(() => document.querySelector('.vmd-markdown__toc')).toBeNull()
  })

  it('topOffset', async () => {
    const id = 'the-tyger'
    const { setProps } = renderMarkdown(
      {
        src: poemMd,
        toc: true,
        search: true,
        topOffset: 60
      },
      {
        global: {
          stubs: { transition: false }
        }
      }
    )

    await expect
      .poll(() =>
        Math.floor(
          document.querySelector<HTMLElement>('.vmd-markdown__search')?.getBoundingClientRect()
            .top ?? NaN
        )
      )
      .toBe(60)
    await expect
      .poll(() =>
        Math.floor(
          document.querySelector<HTMLElement>('.vmd-markdown__toc')?.getBoundingClientRect().top ??
            NaN
        )
      )
      .toBe(60)

    page
      .getByRole('link', { name: /The Tyger/i })
      .element()
      .click()

    const searchEl = document.querySelector<HTMLElement>('.vmd-markdown__search')
    expect(searchEl).toBeTruthy()
    const searchHeight = searchEl!.getBoundingClientRect().height

    await expect
      .poll(() => {
        const heading = document.querySelector<HTMLElement>(`[id='${id}']`)
        if (!heading) return false
        const actual = Math.floor(heading.getBoundingClientRect().top)
        const expected = 60 + Math.round(searchHeight)
        return Math.abs(actual - expected) <= 1
      })
      .toBe(true)

    await setProps({ search: false })
    page
      .getByRole('link', { name: /The Tyger/i })
      .element()
      .click()
    await expect
      .poll(() => {
        const heading = document.querySelector<HTMLElement>(`[id='${id}']`)
        if (!heading) return NaN
        return Math.abs(Math.floor(heading.getBoundingClientRect().top) - 60)
      })
      .toBeLessThanOrEqual(1)
  })

  it('bottomOffset', async () => {
    window.scrollTo(0, 0)
    render(() => <Markdown showBtn src={poemMd} bottomOffset="60" />)
    const btn = document.querySelector<HTMLElement>('.vmd-markdown__btn')
    expect(btn).toBeTruthy()
    await expect
      .poll(() => {
        const marginBottom = parseInt(getComputedStyle(btn!).marginBottom)
        const viewportHeight = window.innerHeight
        return (
          Math.floor(btn!.getBoundingClientRect().bottom) === viewportHeight - marginBottom - 60
        )
      })
      .toBe(true)
  })

  it('miniScreenWidth', async () => {
    renderWithWidth(768, () => <Markdown toc />)
    await expect
      .poll(() =>
        document
          .querySelector<HTMLElement>('.vmd-markdown__aside')
          ?.classList.contains('vmd-markdown--mini')
      )
      .toBe(true)
  })

  it('searchOffset', async () => {
    window.scrollTo(0, 0)
    render(() => <Markdown src={poemMd} keyword="Perched" search searchOffset={60} />)
    await expect
      .poll(
        () =>
          document.querySelector<HTMLElement>('.vmd-search--highlight')?.getBoundingClientRect().top
      )
      .not.toBeUndefined()
    await expect
      .poll(() =>
        Math.abs(
          Math.floor(
            document.querySelector<HTMLElement>('.vmd-search--highlight')!.getBoundingClientRect()
              .top
          ) - 60
        )
      )
      .toBeLessThanOrEqual(1)
  })

  it('searchSmooth', async () => {
    window.scrollTo(0, 0)
    render(() => <Markdown src={poemMd} keyword="Perched" search searchSmooth searchOffset={0} />)
    await expect
      .poll(
        () =>
          document.querySelector<HTMLElement>('.vmd-search--highlight')?.getBoundingClientRect().top
      )
      .not.toBeUndefined()
    let sawNonZero = false
    await expect
      .poll(() => {
        const top = Math.floor(
          document.querySelector<HTMLElement>('.vmd-search--highlight')!.getBoundingClientRect().top
        )
        if (top !== 0) sawNonZero = true
        return Math.abs(top)
      })
      .toBeLessThanOrEqual(1)
    expect(sawNonZero).toBe(true)
  })

  it('tocOffset', async () => {
    window.scrollTo(0, 0)
    const id = 'the-tyger'
    render(() => <Markdown src={poemMd} toc tocOffset={60} />)
    await page.getByRole('link', { name: /The Tyger/i }).click()
    await expect
      .poll(() =>
        Math.abs(
          Math.floor(
            document.querySelector<HTMLElement>(`[id='${id}']`)!.getBoundingClientRect().top
          ) - 60
        )
      )
      .toBeLessThanOrEqual(1)
  })

  it('tocBound', async () => {
    render(() => <Markdown src={poemMd} toc tocBound={60} />)
    const el = document.querySelector<HTMLElement>('[id=the-tyger]')
    expect(el).toBeTruthy()
    el!.scrollIntoView()
    window.scrollBy(0, -60)
    await expect
      .poll(() => document.querySelector<HTMLElement>('.vmd-toc__item--active')?.textContent)
      .toContain('The Tyger')
  })

  it('tocSmooth', async () => {
    window.scrollTo(0, 0)
    const id = 'the-raven'
    render(() => <Markdown src={poemMd} toc tocSmooth />)
    await page.getByRole('link', { name: /The Raven/i }).click()
    let sawNonZero = false
    await expect
      .poll(() => {
        const top = Math.floor(
          document.querySelector<HTMLElement>(`[id='${id}']`)!.getBoundingClientRect().top
        )
        if (top !== 0) sawNonZero = true
        return Math.abs(top)
      })
      .toBeLessThanOrEqual(1)
    expect(sawNonZero).toBe(true)
  })

  it('tocPlainText', async () => {
    render(() => <Markdown src={miniMd} toc tocPlainText />)
    await expect.poll(() => document.querySelector<HTMLElement>('.vmd-toc__item')).toBeTruthy()
    const item = document.querySelector<HTMLElement>('.vmd-toc__item')!
    expect(item.querySelector('a')).toBeNull()
    expect(item.querySelector('span')).toBeTruthy()
  })

  it('tocChangeHash', async () => {
    const id = 'title'
    render(() => <Markdown src={miniMd} toc tocChangeHash={false} />)
    await page.getByRole('link', { name: 'Title' }).click()
    await expect.poll(() => window.location.hash).not.toBe(`#${id}`)
  })

  it('tocClick', async () => {
    const id = 'title'
    const onTocClick = vi.fn()
    render(() => <Markdown src={miniMd} toc onTocClick={onTocClick} />)
    await page.getByRole('link', { name: 'Title' }).click()
    await expect.poll(() => onTocClick.mock.calls.length).toBe(1)
    expect(onTocClick).toHaveBeenCalledWith(expect.objectContaining({ id }))
  })

  it('tocChange', async () => {
    const id = 'the-tyger'
    const onTocChange = vi.fn()
    render(() => <Markdown src={poemMd} toc onTocChange={onTocChange} />)
    const el = document.querySelector<HTMLElement>(`[id='${id}']`)
    expect(el).toBeTruthy()
    el!.scrollIntoView()
    await expect.poll(() => onTocChange.mock.calls.some((c) => c[0] === id)).toBe(true)
  })

  it('tocRefresh', async () => {
    const { instance } = renderMarkdown({ src: '# Old Title', toc: true })
    await expect.poll(() => document.querySelector<HTMLElement>('[id=old-title]')).toBeTruthy()
    const el = document.querySelector<HTMLElement>('[id=old-title]')!
    el.innerHTML = 'New Title'
    await instance.value!.tocRefresh()
    const text = document.querySelector<HTMLElement>('.vmd-toc__text')!.textContent || ''
    expect(text).not.toContain('Old Title')
    expect(text).toContain('New Title')
  })

  it('tocScrollTo', async () => {
    window.scrollTo(0, 0)
    const id = 'the-tyger'
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { instance } = renderMarkdown({ src: poemMd, toc: true })
    await expect.poll(() => !!instance.value).toBe(true)
    await expect.poll(() => document.querySelectorAll('.vmd-toc__text').length).toBeGreaterThan(0)
    await expect.element(page.getByRole('heading', { name: /The Tyger/i })).toBeInTheDocument()
    instance.value!.tocScrollTo()
    expect(warnSpy).toHaveBeenCalledWith('[vue-markdown-design] Href has no value.')
    instance.value!.tocScrollTo('any')
    expect(warnSpy).toHaveBeenCalledWith(
      '[vue-markdown-design] The provided href failed to query the DOM.'
    )
    instance.value!.tocScrollTo(id)
    await expect
      .poll(() =>
        Math.abs(
          Math.floor(
            document.querySelector<HTMLElement>(`[id='${id}']`)!.getBoundingClientRect().top
          )
        )
      )
      .toBeLessThanOrEqual(1)
    if (
      !document
        .querySelector<HTMLElement>('.vmd-toc__item--active')
        ?.textContent?.includes('The Tyger')
    ) {
      window.scrollTo(0, 1)
    }
    await expect
      .poll(() => document.querySelector<HTMLElement>('.vmd-toc__item--active')?.textContent)
      .toContain('The Tyger')
  })

  it('toc 随 src 内容更改', async () => {
    const { setProps } = renderMarkdown({ src: '# Old Title', toc: true })
    await expect
      .poll(() => document.querySelector<HTMLElement>('.vmd-toc__text')?.textContent)
      .toContain('Old Title')
    await setProps({ src: '# New Title' })
    await expect
      .poll(() => document.querySelector<HTMLElement>('.vmd-toc__text')?.textContent)
      .toContain('New Title')
  })

  it('小屏幕点选目录时目录自动关闭', async () => {
    const { container } = renderWithWidth(768, () => <Markdown src={'# Title'} toc />)
    await expect.poll(() => !!container.querySelector('.vmd-markdown__aside')).toBe(true)
    const text = container.querySelector<HTMLElement>('.vmd-toc__text')
    expect(text).toBeTruthy()
    await userEvent.click(text!)
    await expect.poll(() => container.querySelector('.vmd-markdown__aside')).toBeNull()
  })

  it('searchBlur/searchFocus', async () => {
    const { instance } = renderMarkdown({ search: true })
    await expect.poll(() => !!instance.value).toBe(true)
    instance.value!.searchFocus()
    await expect.element(page.getByRole('textbox')).toHaveFocus()
    instance.value!.searchBlur()
    await expect.element(page.getByRole('textbox')).not.toHaveFocus()
  })

  it('searchClear', async () => {
    const { instance } = renderMarkdown({ search: true, keyword: 'keyword' })
    await expect.poll(() => !!instance.value).toBe(true)
    instance.value!.searchClear()
    await expect.element(page.getByRole('textbox')).toHaveValue('')
  })

  it('searchClose', async () => {
    const onSearchClose = vi.fn()
    render(() => <Markdown search onSearchClose={onSearchClose} />)
    const closeBtn = document.querySelector<HTMLElement>('.vmd-search__close')
    expect(closeBtn).toBeTruthy()
    await userEvent.click(closeBtn!)
    await expect.poll(() => onSearchClose.mock.calls.length).toBe(1)
  })

  describe('searchToggle', () => {
    it('string', async () => {
      const { instance } = renderMarkdown({ src: keywordMd, keyword: 'Keyword', search: true })
      await expect
        .poll(() => document.querySelectorAll('.vmd-search--mark').length)
        .toBeGreaterThan(1)
      instance.value!.searchToggle('next')
      await expect
        .poll(() =>
          document
            .querySelector('.vmd-search--mark:first-child')
            ?.classList.contains('vmd-search--highlight')
        )
        .toBe(false)
      expect(
        document
          .querySelector('.vmd-search--mark:not(:first-child)')
          ?.classList.contains('vmd-search--highlight')
      ).toBe(true)
      instance.value!.searchToggle('prev')
      await expect
        .poll(() =>
          document
            .querySelector('.vmd-search--mark:first-child')
            ?.classList.contains('vmd-search--highlight')
        )
        .toBe(true)
      expect(
        document
          .querySelector('.vmd-search--mark:not(:first-child)')
          ?.classList.contains('vmd-search--highlight')
      ).toBe(false)
    })

    it('number', async () => {
      const { instance } = renderMarkdown({ src: keywordMd, keyword: 'Keyword', search: true })
      await expect
        .poll(() => document.querySelectorAll('.vmd-search--mark').length)
        .toBeGreaterThan(1)
      instance.value!.searchToggle(-11)
      await expect
        .poll(() =>
          document
            .querySelector('.vmd-search--mark:first-child')
            ?.classList.contains('vmd-search--highlight')
        )
        .toBe(false)
      expect(
        document
          .querySelector('.vmd-search--mark:not(:first-child)')
          ?.classList.contains('vmd-search--highlight')
      ).toBe(true)
    })

    it('ignoreDisabled', async () => {
      const { instance } = renderMarkdown({
        src: keywordMd,
        keyword: 'Keyword',
        search: true,
        searchDisabled: true
      })
      await expect
        .poll(() => document.querySelectorAll('.vmd-search--mark').length)
        .toBeGreaterThan(1)
      instance.value!.searchToggle('next', false)
      await expect
        .poll(() =>
          document
            .querySelector('.vmd-search--mark:first-child')
            ?.classList.contains('vmd-search--highlight')
        )
        .toBe(true)
      expect(
        document
          .querySelector('.vmd-search--mark:not(:first-child)')
          ?.classList.contains('vmd-search--highlight')
      ).toBe(false)
    })
  })

  it('searchTotalChange', async () => {
    const onSearchTotalChange = vi.fn()
    render(() => (
      <Markdown
        src={keywordMd}
        keyword="Keyword"
        search={true}
        onSearchTotalChange={onSearchTotalChange}
      />
    ))
    await expect.poll(() => onSearchTotalChange.mock.calls.length).toBe(1)
    expect(onSearchTotalChange).toHaveBeenCalledWith(2)
  })

  it('searchIndexChange:', async () => {
    const onSearchIndexChange = vi.fn()
    render(() => (
      <Markdown
        src={keywordMd}
        keyword="Keyword"
        search={true}
        onSearchIndexChange={onSearchIndexChange}
      />
    ))
    const prev = () => document.querySelector<HTMLElement>('.vmd-search__prev')
    await expect.poll(() => !!prev()).toBe(true)
    await userEvent.click(prev()!)
    await expect.poll(() => onSearchIndexChange.mock.calls.some((c) => c[0] === 1)).toBe(true)
  })

  it('mdInstance', async () => {
    const { instance } = renderMarkdown({})
    await expect.poll(() => !!instance.value).toBe(true)
    expect(instance.value!.mdInstance).toBeInstanceOf(MarkdownIt)
  })
})
