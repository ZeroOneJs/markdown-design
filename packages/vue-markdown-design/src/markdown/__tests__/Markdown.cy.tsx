import MarkdownIt from 'markdown-it'
import Markdown, { type MarkdownInstance } from '..'

describe('Markdown', () => {
  it('keyword/update:keyword', () => {
    cy.mount(() => (
      <Markdown
        src="关键字。换行的关键<br>字。"
        search
        onUpdate:keyword={cy.spy().as('onUpdateKeyword')}
      />
    ))
    cy.get('.vmd-search__input').type('关键字')
    cy.get('@onUpdateKeyword').should('have.been.calledWith', '关键字')
    cy.get('.vmd-search--mark').should('have.length', 3)
    cy.get('.vmd-search--mark').first().should('have.class', 'vmd-search--highlight')
  })
  it('current/update:current', () => {
    cy.mount(() => (
      <Markdown
        src="关键字。换行的关键<br>字。"
        search
        keyword="关键字"
        onUpdate:current={cy.spy().as('onUpdateCurrent')}
      />
    ))
    cy.get('.vmd-search--mark').then(() => {
      cy.get('.vmd-search__next').click()
    })
    cy.get('@onUpdateCurrent').should('have.been.calledWith', 1)
    cy.get('.vmd-search--mark:first-child').should('not.have.class', 'vmd-search--highlight')
    cy.get('.vmd-search--mark:not(:first-child)').should('have.class', 'vmd-search--highlight')
  })
  describe('showBtn', () => {
    it('boolean', () => {
      cy.mount(() => <Markdown showBtn />)
      cy.get('.vmd-markdown__btn').should('exist')
    })
    it('Array', () => {
      cy.mount(() => <Markdown showBtn={['toc']} />)
      cy.get('.vmd-markdown__btn-search').should('exist')
      cy.get('.vmd-markdown__btn-toc').should('not.exist')
    })
    it('Object', () => {
      cy.mount(() => <Markdown showBtn={{ search: true }} />)
      cy.get('.vmd-markdown__btn-toc').should('exist')
      cy.get('.vmd-markdown__btn-search').should('not.exist')
    })
  })
  it('search/update:search', () => {
    cy.mount(() => <Markdown search showBtn onUpdate:search={cy.spy().as('onUpdateSearch')} />)
    cy.get('.vmd-markdown__search').should('exist')
    cy.get('.vmd-markdown__btn-search').click()
    cy.get('@onUpdateSearch').should('have.been.calledWith', false)
    cy.get('.vmd-markdown__search').should('not.exist')
  })
  it('toc/update:toc', () => {
    cy.mount(() => <Markdown toc showBtn onUpdate:toc={cy.spy().as('onUpdateToc')} />)
    cy.get('.vmd-markdown__toc').should('exist')
    cy.get('.vmd-markdown__btn-toc').click()
    cy.get('@onUpdateToc').should('have.been.calledWith', false)
    cy.get('.vmd-markdown__toc').should('not.exist')
  })
  it('offsetTop', () => {
    const id = encodeURI('出师表')
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(Markdown, {
        props: {
          src,
          toc: true,
          search: true,
          offsetTop: 60
        }
      }).as('vue')
    })
    cy.get('.vmd-markdown__search').should('boundary.satisfy', ({ top }) => top === 60)
    cy.get('.vmd-markdown__toc').should('boundary.satisfy', ({ top }) => top === 60)
    cy.get(`li a[href='#${id}']`).click()
    cy.get('.vmd-markdown__search').then(($el) => {
      const { height } = $el.get(0).getBoundingClientRect()
      cy.get(`[id='${id}']`).should(
        'boundary.satisfy',
        ({ top }) => Math.floor(top) === 60 + height
      )
    })
    cy.get<{ wrapper: typeof Markdown }>('@vue').then(({ wrapper }) => {
      wrapper.setProps({ search: false })
    })
    cy.get(`li a[href='#${id}']`).click()
    cy.get(`[id='${id}']`).should('boundary.satisfy', ({ top }) => Math.floor(top) === 60)
  })
  it('offsetBottom', () => {
    cy.wait(100) // 防止测试之间 <html> 滚动条相互影响
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown showBtn src={src} offsetBottom="60" />)
    })
    cy.get('.vmd-markdown__btn').should(($el) => {
      const marginBottom = parseInt($el.css('margin-bottom'))
      const viewportHeight = Cypress.config('viewportHeight')
      expect($el).to.boundary.satisfy(({ bottom }) => bottom === viewportHeight - marginBottom - 60)
    })
  })
  it(
    'miniScreenWidth',
    {
      viewportWidth: 960,
      viewportHeight: 960
    },
    () => {
      cy.mount(() => <Markdown toc />)
      cy.get('.vmd-markdown').should('not.have.class', 'vmd-markdown--large')
    }
  )
  it('searchOffset', () => {
    cy.wait(100) // 防止测试之间 <html> 滚动条相互影响
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown src={src} keyword="清风徐来，水波不兴" search searchOffset={60} />)
    })
    cy.get('.vmd-search--highlight').should('boundary.satisfy', ({ top }) => Math.floor(top) === 60)
  })
  it('searchSmooth', () => {
    cy.wait(100) // 防止测试之间 <html> 滚动条相互影响
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => (
        <Markdown src={src} keyword="清风徐来，水波不兴" search searchSmooth searchOffset={0} />
      ))
    })
    cy.get('.vmd-search--highlight').should(
      'not.boundary.satisfy',
      ({ top }) => Math.floor(top) === 0
    )
    cy.get('.vmd-search--highlight').should('boundary.satisfy', ({ top }) => Math.floor(top) === 0)
  })
  it('tocOffset', () => {
    cy.wait(100) // 防止测试之间 <html> 滚动条相互影响
    const id = encodeURI('出师表')
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc tocOffset={60} />)
    })
    cy.get(`li a[href='#${id}']`).click()
    cy.get(`[id='${id}']`).should('boundary.satisfy', ({ top }) => Math.floor(top) === 60)
  })
  it('tocBound', () => {
    const text = '出师表'
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc tocBound={60} />)
    })
    cy.get(`[id='${encodeURI(text)}']`).scrollIntoView({ offset: { top: -60, left: 0 } })
    cy.get('.vmd-toc__item--active').should('contain', text)
  })
  it('tocSmooth', () => {
    cy.wait(100) // 防止测试之间 <html> 滚动条相互影响
    const id = encodeURI('赤壁赋')
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc tocSmooth />)
    })
    cy.get(`li a[href='#${id}']`).click()
    cy.get(`[id='${id}']`).should('not.boundary.satisfy', ({ top }) => Math.floor(top) === 0)
    cy.get(`[id='${id}']`).should('boundary.satisfy', ({ top }) => Math.floor(top) === 0)
  })
  it('tocPlainText', () => {
    cy.fixture('commonmark/mini.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc tocPlainText />)
    })
    cy.get('.vmd-toc__item').should('not.have.descendants', 'a').and('have.descendants', 'span')
  })
  it('tocChangeHash', () => {
    const id = encodeURI('标题')
    cy.fixture('commonmark/mini.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc tocChangeHash={false} />)
    })
    cy.get(`li a[href='#${id}']`).click()
    cy.hash().should('not.eq', id)
  })
  it('tocClick', () => {
    const id = encodeURI('标题')
    cy.fixture('commonmark/mini.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc onTocClick={cy.spy().as('onTocClick')} />)
    })
    cy.get(`li a[href='#${id}']`).click()
    cy.get('@onTocClick').should('have.been.calledWith', Cypress.sinon.match({ id }))
  })
  it('tocChange', () => {
    const id = encodeURI('出师表')
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc onTocChange={cy.spy().as('onTocChange')} />)
    })
    cy.get(`[id='${id}']`).scrollIntoView()
    cy.get('@onTocChange').should('have.been.calledWith', id)
  })
  it('tocRefresh', () => {
    cy.mount(Markdown, {
      props: {
        src: '# 旧标题',
        toc: true
      }
    }).then(({ wrapper, component }) => {
      const { element } = wrapper.get(`[id='${encodeURI('旧标题')}']`)
      element.innerHTML = '新标题'
      ;(component as MarkdownInstance).tocRefresh()
    })
    cy.get('.vmd-toc__text').should('not.contain', '旧标题').and('contain', '新标题')
  })
  it('tocScrollTo', () => {
    cy.wait(100) // 防止测试之间 <html> 滚动条相互影响
    const text = '出师表'
    const id = encodeURI(text)
    cy.window().then((win) => {
      cy.spy(win.console, 'warn').as('console.warn')
    })
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(Markdown, {
        props: {
          src,
          toc: true
        }
      }).then(({ component }) => {
        cy.get('@console.warn').should((spy) => {
          ;(component as MarkdownInstance).tocScrollTo()
          expect(spy).to.be.calledWith('[vue-markdown-design] Href has no value.')
          ;(component as MarkdownInstance).tocScrollTo('any')
          expect(spy).to.be.calledWith(
            '[vue-markdown-design] The provided href failed to query the DOM.'
          )
        })
        ;(component as MarkdownInstance).tocScrollTo(id)
      })
    })
    cy.get('.vmd-toc__item--active').should('contain', text)
    cy.get(`[id='${id}']`).should('boundary.satisfy', ({ top }) => Math.floor(top) === 0)
  })
  it('toc 随 src 内容更改', () => {
    cy.mount(Markdown, { props: { src: '# 旧标题', toc: true } }).then(({ wrapper }) => {
      wrapper.setProps({ src: '# 新标题' })
    })
    cy.get('.vmd-toc__text').should('not.contain', '旧标题').and('contain', '新标题')
  })
  it(
    '小屏幕点选目录时目录自动关闭',
    {
      viewportWidth: 960,
      viewportHeight: 960
    },
    () => {
      cy.mount(() => <Markdown src={'# 标题'} toc />)
      cy.get('.vmd-toc__text').click()
      cy.get('.vmd-markdown__aside').should('not.exist')
    }
  )
  it('searchBlur/searchFocus', () => {
    cy.mount(Markdown, { props: { search: true } })
      .then(({ component }) => {
        ;(component as MarkdownInstance).searchFocus()
      })
      .as('vue')
    cy.get('.vmd-search__input').should('have.focus')
    cy.get<{ component: MarkdownInstance }>('@vue').then(({ component }) => {
      component.searchBlur()
    })
    cy.get('.vmd-search__input').should('not.have.focus')
  })
  it('searchClear', () => {
    cy.mount(Markdown, { props: { search: true, keyword: '关键词' } }).then(({ component }) => {
      ;(component as MarkdownInstance).searchClear()
    })
    cy.get('.vmd-search__input').should('not.have.value')
  })
  it('searchClose', () => {
    cy.mount(() => <Markdown search onSearchClose={cy.spy().as('onSearchClose')} />)
    cy.get('.vmd-search__close').click()
    cy.get('@onSearchClose').should('have.been.called')
  })
  it('getMdit', () => {
    cy.mount(Markdown).then(({ component }) => {
      const md = (component as MarkdownInstance).getMdit()
      expect(md).to.be.instanceOf(MarkdownIt)
    })
  })
})
