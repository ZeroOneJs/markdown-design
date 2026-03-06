import { page } from 'vitest/browser'
import Markdown from '..'
import MarkdownIt from 'markdown-it'
import { render } from 'vitest-browser-vue'
import { describe, expect, test, vi, afterEach, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { type VueWrapper, enableAutoUnmount, mount } from '@vue/test-utils'

import keywordMd from '../../__tests__/fixtures/commonmark/keyword.md?raw'
import miniMd from '../../__tests__/fixtures/commonmark/mini.md?raw'
import poemMd from '../../__tests__/fixtures/commonmark/poem.md?raw'

enableAutoUnmount(beforeEach)

describe('Markdown', () => {
  test('keyword/update:keyword', async () => {
    const { getByRole, emitted } = render(<Markdown src={keywordMd} search />)
    await getByRole('textbox').fill('Keyword')
    expect(emitted()['update:keyword']).toBeDefined()
    const mark = getByRole('mark')
    await expect.element(mark).toHaveLength(3)
    await expect.element(mark.first()).toHaveClass('vmd-search--highlight')
  })

  describe('showBtn', () => {
    test('boolean', async () => {
      const { getByRole } = render(<Markdown showBtn />)
      await expect.element(getByRole('button')).toHaveLength(2)
    })

    test('array', async () => {
      const { getByRole } = render(<Markdown showBtn={['toc']} />)
      const button = getByRole('button')
      await expect.element(button).toHaveClass('vmd-markdown__btn-toc')
      await expect.element(button).not.toHaveClass('vmd-markdown__btn-search')
    })

    test('object', async () => {
      const { getByRole } = render(<Markdown showBtn={{ search: true }} />)
      const button = getByRole('button')
      await expect.element(button).toHaveClass('vmd-markdown__btn-search')
      await expect.element(button).not.toHaveClass('vmd-markdown__btn-toc')
    })
  })

  test('search/update:search', async () => {
    const { getByRole, getByLabelText, emitted } = render(<Markdown search showBtn />)
    const textbox = getByRole('textbox')
    await expect.element(textbox).toBeInTheDocument()
    await getByLabelText('Search').click()
    await expect(emitted()['update:search']).toEqual([[false]])
    await expect.element(textbox).not.toBeInTheDocument()
  })

  test('toc/update:toc', async () => {
    const { getByRole, emitted } = render(<Markdown toc showBtn={['toc']} />)
    const navigation = getByRole('navigation')
    await expect.element(navigation).toBeInTheDocument()
    await getByRole('button').click()
    await expect(emitted()['update:toc']).toEqual([[false]])
    await expect.element(navigation).not.toBeInTheDocument()
  })

  test('topOffset', async () => {
    const { getByRole, rerender } = render(<Markdown toc search topOffset="60" src={poemMd} />, {
      global: {
        stubs: { transition: false }
      }
    })
    const name = 'The Tyger'
    const link = getByRole('link', { name })
    const heading = getByRole('heading', { name })
    await expect(getByRole('textbox').boundingClientRect('top')).toBe(60)
    await expect(getByRole('navigation').boundingClientRect('top')).toBe(60)
    await link.click()
    await expect(heading.boundingClientRect('top')).toBeCloseTo(60 + 57, 0) // 57 为搜索框高度
    rerender({ search: false })
    await link.click()
    await expect(heading.boundingClientRect('top')).toBeCloseTo(60, 0)
  })

  test('bottomOffset', async () => {
    const { getByRole } = render(<Markdown showBtn={['search']} bottomOffset="60" src={poemMd} />)
    await expect(getByRole('button').boundingClientRect('bottom')).toBe(720 - 40 - 60) // 40 为按钮底部外边距的值
  })

  test('miniScreenWidth', async () => {
    await page.viewport(768, 768)
    const { getByRole } = render(<Markdown toc />)
    await expect.element(getByRole('complementary')).toHaveClass('vmd-markdown--mini')
  })

  test('searchOffset', async () => {
    const { getByRole } = render(
      <Markdown keyword="Perched" search src={poemMd} searchOffset={60} />
    )
    await expect.poll(() => getByRole('mark').first().boundingClientRect('top')).toBeCloseTo(60, 0)
  })

  test('searchSmooth', async () => {
    await expect.poll(() => document.documentElement.scrollTop).toBe(0)

    vi.useFakeTimers() // 确保浏览器最小化时正确获取定位信息
    const { getByRole } = render(
      <Markdown keyword="Perched" search searchSmooth src={poemMd} searchOffset={0} />
    )

    vi.runAllTimersAsync()
    const tops = new Set<number>()
    await expect
      .poll(
        () => {
          const top = getByRole('mark').first().boundingClientRect('top')
          tops.add(top)
          return top
        },
        { interval: 16 } // 提高调用频率，确保获取足够的滚动数据
      )
      .toBeCloseTo(0, 1)
    expect(tops.size).toBeGreaterThan(2)
    vi.useRealTimers()
  })

  test('tocOffset', async () => {
    await expect.poll(() => document.documentElement.scrollTop).toBe(0)

    const { getByRole } = render(<Markdown src={poemMd} toc tocOffset={60} />)
    const name = 'The Tyger'
    await getByRole('link', { name }).click()
    await expect(getByRole('heading', { name }).boundingClientRect('top')).toBeCloseTo(60, 0)
  })

  test('tocSmooth', async () => {
    await expect.poll(() => document.documentElement.scrollTop).toBe(0)

    const { getByRole } = render(<Markdown src={poemMd} toc tocSmooth />)

    vi.useFakeTimers() // 确保浏览器最小化时正确获取定位信息
    const name = 'The Raven'
    await getByRole('link', { name }).click()
    await vi.advanceTimersToNextTimerAsync() // packages/vue-markdown-design/src/utils/dom.ts:57:58
    vi.runAllTimersAsync()

    const tops = new Set<number>()
    await expect
      .poll(
        () => {
          const top = getByRole('heading', { name }).boundingClientRect('top')
          tops.add(top)
          return top
        },
        { interval: 16 } // 提高调用频率，确保获取足够的滚动数据
      )
      .toBeCloseTo(0, 0)
    expect(tops.size).toBeGreaterThan(2)
    vi.useRealTimers()
  })

  test('tocPlainText', async () => {
    const { getByRole } = render(<Markdown src={miniMd} toc tocPlainText />)
    await expect.element(getByRole('listitem')).not.toContainElement(getByRole('link'))
  })

  test('tocChangeHash', async () => {
    const { getByRole } = render(<Markdown src={miniMd} toc tocChangeHash={false} />)
    await getByRole('link', { name: 'Title' }).click()
    await expect(window.location.hash).not.toBe('#title')
  })

  test('tocClick', async () => {
    const { getByRole, emitted } = render(<Markdown src={miniMd} toc />)
    await getByRole('link', { name: 'Title' }).click()
    await expect(emitted()['tocClick']).toEqual([
      [
        {
          id: 'title',
          isActive: false,
          level: 1,
          relativeLevel: 0,
          text: 'Title',
          top: 32
        }
      ]
    ])
  })

  test('tocChange', async () => {
    const { getByRole, emitted } = render(<Markdown src={poemMd} toc />)
    const link = getByRole('heading', { name: 'The Raven' })
    await expect.element(link).toBeInTheDocument()
    await link.element().scrollIntoView()
    await expect.poll(() => emitted()['tocChange']).toBeDefined()
  })

  test('tocScrollTo', async () => {
    await expect.poll(() => document.documentElement.scrollTop).toBe(0)
    const wrapper: VueWrapper<any> = mount(<Markdown toc src={poemMd} />, {
      attachTo: document.body
    })
    await nextTick()
    const warnSpy = vi.spyOn(console, 'warn')
    wrapper.vm.tocScrollTo()
    expect(warnSpy).toHaveBeenCalledWith('[vue-markdown-design] Href has no value.')
    wrapper.vm.tocScrollTo('any')
    expect(warnSpy).toHaveBeenCalledWith(
      '[vue-markdown-design] The provided href failed to query the DOM.'
    )
    wrapper.vm.tocScrollTo('the-tyger')
    await expect
      .poll(() => page.getByRole('heading', { name: 'The Tyger' }).boundingClientRect('top'))
      .toBeCloseTo(0, 0)
  })

  test('toc 随 src 内容更改', async () => {
    const { getByRole, rerender } = render(<Markdown toc src="# Old Title" />)
    rerender({ src: '# New Title' })
    await expect.element(getByRole('link', { name: 'Old Title' })).not.toBeInTheDocument()
    await expect.element(getByRole('link', { name: 'New Title' })).toBeInTheDocument()
  })

  test('小屏幕点选目录时目录自动关闭', async () => {
    await page.viewport(768, 768)
    const { getByRole } = render(<Markdown src="# Title" toc />)
    await getByRole('link', { name: 'Title' }).click()
    await expect.element(getByRole('complementary')).not.toBeInTheDocument()
  })

  test('searchBlur/searchFocus', async () => {
    const wrapper: VueWrapper<any> = mount(<Markdown search />, {
      attachTo: document.body
    })
    wrapper.vm.searchFocus()
    await expect.element(page.getByRole('textbox')).toHaveFocus()
    wrapper.vm.searchBlur()
    await expect.element(page.getByRole('textbox')).not.toHaveFocus()
  })

  test('searchClear', async () => {
    const wrapper: VueWrapper<any> = mount(<Markdown search keyword="keyword" />, {
      attachTo: document.body
    })
    wrapper.vm.searchClear()
    await expect.element(page.getByRole('textbox')).not.toHaveValue()
  })

  test('searchClose', async () => {
    const { getByLabelText, emitted } = render(<Markdown search keyword="keyword" />)
    await getByLabelText('Close').click()
    expect(emitted()['searchClose']).toBeDefined()
  })

  describe('searchToggle', () => {
    test('string', async () => {
      const wrapper: VueWrapper<any> = mount(
        <Markdown search keyword="keyword" src={keywordMd} />,
        {
          attachTo: document.body
        }
      )
      const mark = page.getByRole('mark')
      await expect.poll(() => mark.length).toBeGreaterThan(0)
      wrapper.vm.searchToggle('next')
      await expect.element(mark.first()).not.toHaveClass('vmd-search--highlight')
      await expect.element(mark.last()).toHaveClass('vmd-search--highlight')
      wrapper.vm.searchToggle('prev')
      await expect.element(mark.first()).toHaveClass('vmd-search--highlight')
      await expect.element(mark.last()).not.toHaveClass('vmd-search--highlight')
    })

    test('number', async () => {
      const wrapper: VueWrapper<any> = mount(
        <Markdown search keyword="keyword" src={keywordMd} />,
        {
          attachTo: document.body
        }
      )
      const mark = page.getByRole('mark')
      await expect.poll(() => mark.length).toBeGreaterThan(0)
      wrapper.vm.searchToggle(-11)
      await expect.element(mark.first()).not.toHaveClass('vmd-search--highlight')
      await expect.element(mark.last()).toHaveClass('vmd-search--highlight')
    })

    test('ignoreDisabled', async () => {
      const wrapper: VueWrapper<any> = mount(
        <Markdown search searchDisabled keyword="keyword" src={keywordMd} />,
        {
          attachTo: document.body
        }
      )
      const mark = page.getByRole('mark')
      await expect.poll(() => mark.length).toBeGreaterThan(0)
      wrapper.vm.searchToggle('next', false)
      await expect.element(mark.first()).toHaveClass('vmd-search--highlight')
      await expect.element(mark.last()).not.toHaveClass('vmd-search--highlight')
    })
  })

  test('searchTotalChange', async () => {
    const { emitted } = render(<Markdown search keyword="Keyword" src={keywordMd} />)
    await expect.poll(() => emitted()['searchTotalChange']).toEqual([[2]])
  })

  test('searchIndexChange:', async () => {
    const wrapper: VueWrapper<any> = mount(<Markdown search keyword="keyword" src={keywordMd} />, {
      attachTo: document.body
    })
    await page.getByLabelText('Previous').click()
    await expect.poll(() => wrapper.emitted()['searchIndexChange']).toEqual([[1]])
  })

  test('mdInstance', async () => {
    const wrapper: VueWrapper<any> = mount(<Markdown />, {
      attachTo: document.body
    })
    expect(wrapper.vm.mdInstance).toBeInstanceOf(MarkdownIt)
  })
})
