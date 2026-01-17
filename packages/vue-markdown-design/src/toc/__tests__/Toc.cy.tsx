import Toc, { type TocItem } from '..'

describe('Toc', () => {
  it('startLevel', () => {
    cy.fixture('commonmark/toc.md').then((markdown) => {
      cy.mount(() => <Toc markdown={markdown} startLevel="2" />)
    })
    cy.contains('Title 1').should('not.exist')
  })
  it('endLevel', () => {
    cy.fixture('commonmark/toc.md').then((markdown) => {
      cy.mount(() => <Toc markdown={markdown} endLevel="5" />)
    })
    cy.contains('Title 6').should('not.exist')
  })
  it('level 超出范围', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'warn').as('consoleWarn')
    })
    cy.mount(() => <Toc startLevel="-1" />)
    cy.get('@consoleWarn').should(
      'have.been.calledWith',
      '[vue-markdown-design] The start-level or end-level is outside the valid range.'
    )
  })
  it('startLevel 小于 endLevel', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'warn').as('consoleWarn')
    })
    cy.mount(() => <Toc startLevel="6" endLevel="1" />)
    cy.get('@consoleWarn').should(
      'have.been.calledWith',
      '[vue-markdown-design] The start-level must be less than the end-level.'
    )
  })
  it('orderedList', () => {
    cy.mount(() => <Toc markdown={'# Title\n# Title'} orderedList />)
    cy.get('.vmd-toc__text').each(($el, index) => {
      expect($el.text()).to.equal(`${index + 1}. Title`)
    })
  })
  it('target', () => {
    cy.mount(() => (
      <>
        <Toc target="[data-cy]" />
        <div data-cy>
          <h1>Title 1</h1>
        </div>
        <div>
          <h1>Title 2</h1>
        </div>
      </>
    ))
    cy.get('.vmd-toc__text').should('contain', 'Title 1').and('not.contain', 'Title 2')
  })
  it('ignore', () => {
    cy.fixture('commonmark/toc.md').then((markdown) => {
      cy.mount(() => <Toc markdown={markdown} ignore={[3]} />)
    })
    cy.get('.vmd-toc__text').should('not.contain', 'Title 3')
  })
  it('emptyText', () => {
    cy.mount(() => <Toc markdown="text" />) // 设置为“text”可以覆盖 const { headers = [] } = env 这条语句
    cy.contains('No Data').should('exist')
  })
  it('markdown', () => {
    cy.fixture('commonmark/toc.md').then((markdown) => {
      cy.mount(() => <Toc markdown={markdown} />)
    })
    cy.get('span.vmd-toc__text').should('exist').and('have.length', 6)
  })
  it('slots', () => {
    cy.fixture('commonmark/toc.md').then((markdown) => {
      cy.mount(() => (
        <Toc markdown={markdown}>
          {{
            item: (tocItem: TocItem) => <span data-cy>{tocItem.text}</span>
          }}
        </Toc>
      ))
    })
    cy.get('.vmd-toc__text').children('[data-cy]').should('exist')
  })
  it('小标题放在首位', () => {
    cy.mount(() => <Toc markdown={`## Subtitle\n# Title`} />)
    cy.contains('Subtitle').should('have.css', 'padding-left', '16px')
    cy.contains('Title').should('have.css', 'padding-left', '0px')
  })
  it('英文长文本换行', () => {
    cy.mount(() => (
      <Toc markdown="# lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng" />
    ))
    cy.get('.vmd-toc__text').should('boundary.satisfy', ({ height }) => height > 23)
  })
})
