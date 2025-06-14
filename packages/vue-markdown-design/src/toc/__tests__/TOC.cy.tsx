import TOC, { type TOCItem } from '..'

describe('MdTOC', () => {
  it('startLevel', () => {
    cy.fixture('commonmark/toc.md').then((markdown) => {
      cy.mount(() => <TOC markdown={markdown} startLevel="2" />)
    })
    cy.contains('标题 1').should('not.exist')
  })
  it('endLevel', () => {
    cy.fixture('commonmark/toc.md').then((markdown) => {
      cy.mount(() => <TOC markdown={markdown} endLevel="5" />)
    })
    cy.contains('标题 6').should('not.exist')
  })
  it('level 超出范围', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'warn').as('consoleWarn')
    })
    cy.mount(() => <TOC startLevel="-1" />)
    cy.get('@consoleWarn').should(
      'have.been.calledWith',
      '[vue-markdown-design] The start-level or end-level is outside the valid range.'
    )
  })
  it('startLevel 小于 endLevel', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'warn').as('consoleWarn')
    })
    cy.mount(() => <TOC startLevel="6" endLevel="1" />)
    cy.get('@consoleWarn').should(
      'have.been.calledWith',
      '[vue-markdown-design] The start-level must be less than the end-level.'
    )
  })
  it('orderedList', () => {
    cy.mount(() => <TOC markdown={'# 标题\n# 标题'} orderedList />)
    cy.get('.vmd-toc__text').each(($el, index) => {
      expect($el.text()).to.equal(`${index + 1}. 标题`)
    })
  })
  it('target', () => {
    cy.mount(() => (
      <>
        <TOC target="[data-cy]" />
        <div data-cy>
          <h1>标题 1</h1>
        </div>
        <div>
          <h1>标题 2</h1>
        </div>
      </>
    ))
    cy.get('.vmd-toc__text').should('contain', '标题 1').and('not.contain', '标题 2')
  })
  it('ignore', () => {
    cy.fixture('commonmark/toc.md').then((markdown) => {
      cy.mount(() => <TOC markdown={markdown} ignore={[3]} />)
    })
    cy.get('.vmd-toc__text').should('not.contain', '标题 3')
  })
  it('emptyText', () => {
    cy.mount(() => <TOC markdown="纯文本" />) // 设置为“纯文本”可以覆盖 const { headers = [] } = env 这条语句
    cy.contains('No Data').should('exist')
  })
  it('markdown', () => {
    cy.fixture('commonmark/toc.md').then((markdown) => {
      cy.mount(() => <TOC markdown={markdown} />)
    })
    cy.get('span.vmd-toc__text').should('exist').and('have.length', 6)
  })
  it('slots', () => {
    cy.fixture('commonmark/toc.md').then((markdown) => {
      cy.mount(() => (
        <TOC markdown={markdown}>
          {{
            item: (tocItem: TOCItem) => <li data-cy>{tocItem.text}</li>
          }}
        </TOC>
      ))
    })
    cy.get('.vmd-toc__list').children('.vmd-toc__item').should('not.exist')
    cy.get('.vmd-toc__list').children('[data-cy]').should('exist')
  })
  it('小标题放在首位', () => {
    cy.mount(() => <TOC markdown={`## 小标题\n# 大标题`} />)
    cy.contains('小标题').should('have.css', 'padding-left', '16px')
    cy.contains('大标题').should('have.css', 'padding-left', '0px')
  })
  it('英文长文本换行', () => {
    cy.mount(() => (
      <TOC markdown="# lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng" />
    ))
    cy.get('.vmd-toc__text').should('boundary.satisfy', ({ height }) => height > 23)
  })
})
