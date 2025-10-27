import MarkdownIt from 'markdown-it'
import Markdown, { type MarkdownInstance } from '..'

describe('Markdown', () => {
  it('keyword/update:keyword', () => {
    cy.fixture('commonmark/keyword.md').then((src) => {
      cy.mount(() => (
        <Markdown src={src} search onUpdate:keyword={cy.spy().as('onUpdateKeyword')} />
      ))
    })
    cy.get('.vmd-search__input').type('Keyword')
    cy.get('@onUpdateKeyword').should('have.been.calledWith', 'Keyword')
    cy.get('.vmd-search--mark').should('have.length', 3)
    cy.get('.vmd-search--mark').first().should('have.class', 'vmd-search--highlight')
  })
  describe('showBtn', () => {
    it('boolean', () => {
      cy.mount(() => <Markdown showBtn />)
      cy.get('.vmd-markdown__btn').should('exist')
    })
    it('array', () => {
      cy.mount(() => <Markdown showBtn={['toc']} />)
      cy.get('.vmd-markdown__btn-toc').should('exist')
      cy.get('.vmd-markdown__btn-search').should('not.exist')
    })
    it('object', () => {
      cy.mount(() => <Markdown showBtn={{ search: true }} />)
      cy.get('.vmd-markdown__btn-search').should('exist')
      cy.get('.vmd-markdown__btn-toc').should('not.exist')
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
  it('topOffset', () => {
    const id = 'the-tyger'
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(Markdown, {
        props: {
          src,
          toc: true,
          search: true,
          topOffset: 60
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
  it('bottomOffset', () => {
    cy.scrollTo('top', { ensureScrollable: false }) // 防止测试之间 <html> 滚动条相互影响
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown showBtn src={src} bottomOffset="60" />)
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
    cy.scrollTo('top', { ensureScrollable: false }) // 防止测试之间 <html> 滚动条相互影响
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown src={src} keyword="Perched" search searchOffset={60} />)
    })
    cy.get('.vmd-search--highlight').should('boundary.satisfy', ({ top }) => Math.floor(top) === 60)
  })
  it('searchSmooth', () => {
    cy.scrollTo('top', { ensureScrollable: false }) // 防止测试之间 <html> 滚动条相互影响
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown src={src} keyword="Perched" search searchSmooth searchOffset={0} />)
    })
    cy.get('.vmd-search--highlight').should(
      'not.boundary.satisfy',
      ({ top }) => Math.floor(top) === 0
    )
    cy.get('.vmd-search--highlight').should('boundary.satisfy', ({ top }) => Math.floor(top) === 0)
  })
  it('tocOffset', () => {
    cy.scrollTo('top', { ensureScrollable: false }) // 防止测试之间 <html> 滚动条相互影响
    const id = 'the-tyger'
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc tocOffset={60} />)
    })
    cy.get(`li a[href='#${id}']`).click()
    cy.get(`[id='${id}']`).should('boundary.satisfy', ({ top }) => Math.floor(top) === 60)
  })
  it('tocBound', () => {
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc tocBound={60} />)
    })
    cy.get('[id=the-tyger]').scrollIntoView({ offset: { top: -60, left: 0 } })
    cy.get('.vmd-toc__item--active').should('contain', 'The Tyger')
  })
  it('tocSmooth', () => {
    cy.scrollTo('top', { ensureScrollable: false }) // 防止测试之间 <html> 滚动条相互影响
    const id = 'the-raven'
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
    const id = 'title'
    cy.fixture('commonmark/mini.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc tocChangeHash={false} />)
    })
    cy.get(`li a[href='#${id}']`).click()
    cy.hash().should('not.eq', id)
  })
  it('tocClick', () => {
    const id = 'title'
    cy.fixture('commonmark/mini.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc onTocClick={cy.spy().as('onTocClick')} />)
    })
    cy.get(`li a[href='#${id}']`).click()
    cy.get('@onTocClick').should('have.been.calledWith', Cypress.sinon.match({ id }))
  })
  it('tocChange', () => {
    const id = 'the-tyger'
    cy.fixture('commonmark/poem.md').then((src) => {
      cy.mount(() => <Markdown src={src} toc onTocChange={cy.spy().as('onTocChange')} />)
    })
    cy.get(`[id='${id}']`).scrollIntoView()
    cy.get('@onTocChange').should('have.been.calledWith', id)
  })
  it('tocRefresh', () => {
    cy.mount(Markdown, {
      props: {
        src: '# Old Title',
        toc: true
      }
    }).then(({ wrapper, component }) => {
      const { element } = wrapper.get('[id=old-title]')
      element.innerHTML = 'New Title'
      ;(component as MarkdownInstance).tocRefresh()
    })
    cy.get('.vmd-toc__text').should('not.contain', 'Old Title').and('contain', 'New Title')
  })
  it('tocScrollTo', () => {
    cy.scrollTo('top', { ensureScrollable: false }) // 防止测试之间 <html> 滚动条相互影响
    const id = 'the-tyger'
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
    cy.get('.vmd-toc__item--active').should('contain', 'The Tyger')
    cy.get(`[id='${id}']`).should('boundary.satisfy', ({ top }) => Math.floor(top) === 0)
  })
  it('toc 随 src 内容更改', () => {
    cy.mount(Markdown, { props: { src: '# Old Title', toc: true } }).then(({ wrapper }) => {
      wrapper.setProps({ src: '# New Title' })
    })
    cy.get('.vmd-toc__text').should('not.contain', 'Old Title').and('contain', 'New Title')
  })
  it(
    '小屏幕点选目录时目录自动关闭',
    {
      viewportWidth: 960,
      viewportHeight: 960
    },
    () => {
      cy.mount(() => <Markdown src={'# Title'} toc />)
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
    cy.mount(Markdown, { props: { search: true, keyword: 'keyword' } }).then(({ component }) => {
      ;(component as MarkdownInstance).searchClear()
    })
    cy.get('.vmd-search__input').should('not.have.value')
  })
  it('searchClose', () => {
    cy.mount(() => <Markdown search onSearchClose={cy.spy().as('onSearchClose')} />)
    cy.get('.vmd-search__close').click()
    cy.get('@onSearchClose').should('have.been.called')
  })
  describe('searchToggle', () => {
    it('string', () => {
      cy.fixture('commonmark/keyword.md').then((src) => {
        cy.mount(Markdown, {
          props: {
            src,
            keyword: 'Keyword',
            search: true
          }
        })
          .then(({ component }) => {
            ;(component as MarkdownInstance).searchToggle('next')
          })
          .as('vue')
      })
      cy.get('.vmd-search--mark:first-child').should('not.have.class', 'vmd-search--highlight')
      cy.get('.vmd-search--mark:not(:first-child)').should('have.class', 'vmd-search--highlight')
      cy.get<{ component: MarkdownInstance }>('@vue').then(({ component }) => {
        ;(component as MarkdownInstance).searchToggle('prev')
      })
      cy.get('.vmd-search--mark:first-child').should('have.class', 'vmd-search--highlight')
      cy.get('.vmd-search--mark:not(:first-child)').should(
        'not.have.class',
        'vmd-search--highlight'
      )
    })
    it('number', () => {
      cy.fixture('commonmark/keyword.md').then((src) => {
        cy.mount(Markdown, {
          props: {
            src,
            keyword: 'Keyword',
            search: true
          }
        }).then(({ component }) => {
          ;(component as MarkdownInstance).searchToggle(-11)
        })
      })
      cy.get('.vmd-search--mark:first-child').should('not.have.class', 'vmd-search--highlight')
      cy.get('.vmd-search--mark:not(:first-child)').should('have.class', 'vmd-search--highlight')
    })
    it('checkDisabled', () => {
      cy.fixture('commonmark/keyword.md').then((src) => {
        cy.mount(Markdown, {
          props: {
            src,
            keyword: 'Keyword',
            search: true,
            searchDisabled: true
          }
        }).then(({ component }) => {
          ;(component as MarkdownInstance).searchToggle('next', true)
        })
      })
      cy.get('.vmd-search--mark:first-child').should('have.class', 'vmd-search--highlight')
      cy.get('.vmd-search--mark:not(:first-child)').should(
        'not.have.class',
        'vmd-search--highlight'
      )
    })
  })
  it('searchTotalChange', () => {
    cy.fixture('commonmark/keyword.md').then((src) => {
      cy.mount(Markdown, {
        props: {
          src,
          keyword: 'Keyword',
          search: true,
          onSearchTotalChange: cy.spy().as('onSearchTotalChange')
        }
      })
    })
    cy.get('@onSearchTotalChange').should('have.been.calledWith', 2)
  })
  it('searchIndexChange:', () => {
    cy.fixture('commonmark/keyword.md').then((src) => {
      cy.mount(Markdown, {
        props: {
          src,
          keyword: 'Keyword',
          search: true,
          onSearchIndexChange: cy.spy().as('onSearchIndexChange')
        }
      })
    })
    cy.get('.vmd-search__prev').click()
    cy.get('@onSearchIndexChange').should('have.been.calledWith', 1)
  })
  it('mdInstance', () => {
    cy.mount(Markdown).then(({ component }) => {
      const md = (component as MarkdownInstance).mdInstance
      expect(md).to.be.instanceOf(MarkdownIt)
    })
  })
})
