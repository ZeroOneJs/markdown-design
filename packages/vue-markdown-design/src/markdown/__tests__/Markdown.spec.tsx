import { page } from 'vitest/browser'
import Markdown from '..'
import MarkdownIt from 'markdown-it'
import { render } from 'vitest-browser-vue'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { type VueWrapper, enableAutoUnmount, mount } from '@vue/test-utils'

import keywordMd from '../../__tests__/fixtures/commonmark/keyword.md?raw'
import miniMd from '../../__tests__/fixtures/commonmark/mini.md?raw'
import poemMd from '../../__tests__/fixtures/commonmark/poem.md?raw'

enableAutoUnmount(beforeEach)

// 防止测试用例之间的滚动条相互干扰
const style = {
  width: '100vw',
  height: '100vh',
  overflow: 'auto'
}

describe('Markdown', () => {
  test('keyword/update:keyword', async () => {
    const { emitted } = render(<Markdown src={keywordMd} search />)
    await page.getByRole('textbox').fill('Keyword')
    expect(emitted()['update:keyword']).toBeDefined()
    const locator = page.getByRole('mark')
    await expect.element(locator).toHaveLength(3)
    await expect.element(locator.first()).toHaveClass('vmd-search--highlight')
  })

  describe('showBtn', () => {
    test('boolean', async () => {
      render(<Markdown showBtn />)
      await expect.element(page.getByRole('button')).toHaveLength(2)
    })

    test('array', async () => {
      render(<Markdown showBtn={['toc']} />)
      await expect.element(page.getByLabelText('Table of contents')).toBeInTheDocument()
      await expect.element(page.getByLabelText('Search')).not.toBeInTheDocument()
    })

    test('object', async () => {
      render(<Markdown showBtn={{ search: true }} />)
      await expect.element(page.getByLabelText('Search')).toBeInTheDocument()
      await expect.element(page.getByLabelText('Table of contents')).not.toBeInTheDocument()
    })
  })

  test('search/update:search', async () => {
    const { emitted } = render(<Markdown search showBtn />)
    const locator = page.getByRole('textbox')
    await expect.element(locator).toBeInTheDocument()
    await page.getByLabelText('Search').click()
    expect(emitted()['update:search']).toEqual([[false]])
    await expect.element(locator).not.toBeInTheDocument()
  })

  test('toc/update:toc', async () => {
    const { emitted } = render(<Markdown toc showBtn={['toc']} />)
    const locator = page.getByRole('navigation')
    await expect.element(locator).toBeInTheDocument()
    await page.getByRole('button').click()
    expect(emitted()['update:toc']).toEqual([[false]])
    await expect.element(locator).not.toBeInTheDocument()
  })

  test('topOffset', async () => {
    const { rerender } = render(<Markdown src={poemMd} toc search topOffset="60" style={style} />, {
      global: {
        stubs: { transition: false }
      }
    })
    expect(page.getByRole('textbox').boundingClientRect('top')).toBe(60)
    expect(page.getByRole('navigation').boundingClientRect('top')).toBe(60)

    const name = 'The Tyger'
    const linkLocator = page.getByRole('link', { name })
    const headingLocator = page.getByRole('heading', { name })
    await linkLocator.click()
    expect(headingLocator.boundingClientRect('top')).toBeCloseTo(60 + 57, 0) // 57 为搜索框高度
    rerender({ search: false })
    await linkLocator.click()
    expect(headingLocator.boundingClientRect('top')).toBeCloseTo(60, 0)
  })

  test('bottomOffset', () => {
    render(<Markdown src={poemMd} bottomOffset="60" showBtn={['search']} />)
    expect(page.getByRole('button').boundingClientRect('bottom')).toBe(720 - 40 - 60) // 40 为按钮底部外边距的值
  })

  test('miniScreenWidth', async () => {
    await page.viewport(768, 768)
    render(<Markdown toc />)
    await expect.element(page.getByRole('complementary')).toHaveClass('vmd-markdown--mini')
  })

  test('searchOffset', async () => {
    render(<Markdown src={poemMd} search keyword="Perched" style={style} searchOffset={60} />)
    await expect
      .poll(() => page.getByRole('mark').first().boundingClientRect('top'))
      .toBeCloseTo(60, 0)
  })

  test('searchSmooth', async () => {
    vi.useFakeTimers() // 确保浏览器最小化时正确获取定位信息
    render(
      <Markdown src={poemMd} search searchSmooth keyword="Perched" style={style} searchOffset={0} />
    )

    vi.runAllTimersAsync()
    const tops = new Set<number>()
    await expect
      .poll(
        () => {
          const top = page.getByRole('mark').first().boundingClientRect('top')
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
    render(<Markdown src={poemMd} toc style={style} tocOffset={60} />)
    const name = 'The Tyger'
    await page.getByRole('link', { name }).click()
    expect(page.getByRole('heading', { name }).boundingClientRect('top')).toBeCloseTo(60, 0)
  })

  test('tocSmooth', async () => {
    render(<Markdown src={poemMd} toc tocSmooth />)

    vi.useFakeTimers() // 确保浏览器最小化时正确获取定位信息
    const name = 'The Raven'
    await page.getByRole('link', { name }).click()
    await vi.advanceTimersToNextTimerAsync() // packages/vue-markdown-design/src/utils/dom.ts:57:58
    vi.runAllTimersAsync()

    const tops = new Set<number>()
    await expect
      .poll(
        () => {
          const top = page.getByRole('heading', { name }).boundingClientRect('top')
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
    render(<Markdown src={miniMd} toc tocPlainText />)
    await expect.element(page.getByRole('link', { name: 'Title' })).not.toBeInTheDocument()
  })

  test('tocChangeHash', async () => {
    render(<Markdown src={miniMd} toc tocChangeHash={false} />)
    await page.getByRole('link', { name: 'Title' }).click()
    expect(window.location.hash).not.toBe('#title')
  })

  test('tocClick', async () => {
    const { emitted } = render(<Markdown src={miniMd} toc />)
    await page.getByRole('link', { name: 'Title' }).click()
    expect(emitted()['tocClick']).toEqual([
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
    const { emitted } = render(<Markdown src={poemMd} toc style={style} />)
    await page.getByRole('heading', { name: 'The Raven' }).element().scrollIntoView()
    await expect.poll(() => emitted()['tocChange']).toBeDefined()
  })

  test('tocScrollTo', async () => {
    const wrapper: VueWrapper<any> = mount(<Markdown src={poemMd} toc style={style} />, {
      attachTo: document.body
    })

    const warnSpy = vi.spyOn(console, 'warn')
    wrapper.vm.tocScrollTo()
    expect(warnSpy).toHaveBeenCalledWith('[vue-markdown-design] Href has no value.')
    wrapper.vm.tocScrollTo('any')
    expect(warnSpy).toHaveBeenCalledWith(
      '[vue-markdown-design] The provided href failed to query the DOM.'
    )
    const locator = page.getByRole('heading', { name: 'The Tyger' })
    await expect.element(locator).toBeInTheDocument()
    wrapper.vm.tocScrollTo('the-tyger')
    await expect.poll(() => locator.boundingClientRect('top')).toBeCloseTo(0, 0)
  })

  test('toc 随 src 内容更改', async () => {
    const { rerender } = render(<Markdown src="# Old Title" toc />)
    rerender({ src: '# New Title' })
    await expect.element(page.getByRole('link', { name: 'Old Title' })).not.toBeInTheDocument()
    await expect.element(page.getByRole('link', { name: 'New Title' })).toBeInTheDocument()
  })

  test('小屏幕点选目录时目录自动关闭', async () => {
    await page.viewport(768, 768)
    render(<Markdown src="# Title" toc />)
    await page.getByRole('link', { name: 'Title' }).click()
    await expect.element(page.getByRole('complementary')).not.toBeInTheDocument()
  })

  test('searchBlur/searchFocus', async () => {
    const wrapper: VueWrapper<any> = mount(<Markdown search />, {
      attachTo: document.body
    })
    wrapper.vm.searchFocus()
    const locator = page.getByRole('textbox')
    await expect.element(locator).toHaveFocus()
    wrapper.vm.searchBlur()
    await expect.element(locator).not.toHaveFocus()
  })

  test('searchClear', async () => {
    const wrapper: VueWrapper<any> = mount(<Markdown search keyword="keyword" />, {
      attachTo: document.body
    })
    wrapper.vm.searchClear()
    await expect.element(page.getByRole('textbox')).not.toHaveValue()
  })

  test('searchClose', async () => {
    const { emitted } = render(<Markdown search keyword="keyword" />)
    await page.getByLabelText('Close').click()
    expect(emitted()['searchClose']).toBeDefined()
  })

  describe('searchToggle', () => {
    test('string', async () => {
      const wrapper: VueWrapper<any> = mount(
        <Markdown src={keywordMd} search keyword="keyword" />,
        {
          attachTo: document.body
        }
      )
      const locator = page.getByRole('mark')
      await expect.poll(() => locator).toHaveLength(3)
      wrapper.vm.searchToggle('next')
      await expect.element(locator.first()).not.toHaveClass('vmd-search--highlight')
      await expect.element(locator.last()).toHaveClass('vmd-search--highlight')
      wrapper.vm.searchToggle('prev')
      await expect.element(locator.first()).toHaveClass('vmd-search--highlight')
      await expect.element(locator.last()).not.toHaveClass('vmd-search--highlight')
    })

    test('number', async () => {
      const wrapper: VueWrapper<any> = mount(
        <Markdown src={keywordMd} search keyword="keyword" />,
        {
          attachTo: document.body
        }
      )
      const locator = page.getByRole('mark')
      await expect.poll(() => locator).toHaveLength(3)
      wrapper.vm.searchToggle(-11)
      await expect.element(locator.first()).not.toHaveClass('vmd-search--highlight')
      await expect.element(locator.last()).toHaveClass('vmd-search--highlight')
    })

    test('ignoreDisabled', async () => {
      const wrapper: VueWrapper<any> = mount(
        <Markdown src={keywordMd} search searchDisabled keyword="keyword" />,
        {
          attachTo: document.body
        }
      )
      const locator = page.getByRole('mark')
      await expect.poll(() => locator).toHaveLength(3)
      wrapper.vm.searchToggle('next', false)
      await expect.element(locator.first()).toHaveClass('vmd-search--highlight')
      await expect.element(locator.last()).not.toHaveClass('vmd-search--highlight')
    })
  })

  test('searchTotalChange', async () => {
    const { emitted } = render(<Markdown src={keywordMd} search keyword="Keyword" />)
    await expect.poll(() => emitted()['searchTotalChange']).toEqual([[2]])
  })

  test('searchIndexChange:', async () => {
    const wrapper: VueWrapper<any> = mount(<Markdown src={keywordMd} search keyword="keyword" />, {
      attachTo: document.body
    })
    await page.getByLabelText('Previous').click()
    await expect.poll(() => wrapper.emitted()['searchIndexChange']).toEqual([[1]])
  })

  test('mdInstance', () => {
    const wrapper: VueWrapper<any> = mount(<Markdown />, {
      attachTo: document.body
    })
    expect(wrapper.vm.mdInstance).toBeInstanceOf(MarkdownIt)
  })
})
