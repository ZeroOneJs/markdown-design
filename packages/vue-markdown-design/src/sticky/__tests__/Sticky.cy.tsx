import Sticky from '..'

describe('Sticky', () => {
  describe('posY', () => {
    it('top', () => {
      cy.mount(() => (
        <>
          <div style="height: 100vh">placeholder</div>
          <div data-cy="target" style="height: 200px;">
            <Sticky target="[data-cy='target']">
              <div data-cy="content">content</div>
            </Sticky>
            <div data-cy="inside" style="height: 100vh">
              placeholder
            </div>
          </div>
          <div data-cy="outside" style="height: 100vh">
            placeholder
          </div>
        </>
      ))
      cy.get('[data-cy="inside"]').scrollIntoView()
      cy.get('[data-cy="content"]').should('boundary.satisfy', ({ top }) => top === 0)
      cy.get('[data-cy="outside"]').scrollIntoView()
      cy.get('[data-cy="content"]').should('boundary.satisfy', ({ top }) => top < 0)
    })
    it('bottom', () => {
      cy.scrollTo('top', { ensureScrollable: false }) // 防止测试之间 <html> 滚动条相互影响
      cy.mount(() => (
        <>
          <div style="height: 100vh">placeholder</div>
          <div data-cy="target">
            <div style="height: 100px">placeholder</div>
            <Sticky target="[data-cy='target']" posY="bottom">
              <div data-cy="content">content</div>
            </Sticky>
          </div>
          <div style="height: 100vh">placeholder</div>
        </>
      ))
      const viewportHeight = Cypress.config('viewportHeight')
      cy.get('[data-cy="content"]').should(
        'boundary.satisfy',
        ({ bottom }) => bottom > viewportHeight
      )
      cy.scrollTo(0, 50)
      cy.get('[data-cy="content"]').should(
        'boundary.satisfy',
        ({ bottom }) => bottom === viewportHeight
      )
    })
  })
  it('posX', () => {
    cy.mount(() => (
      <div data-cy="target" style="width: 500px;height: 500px;position: absolute;left: 0;">
        <Sticky target="[data-cy='target']" posX="right" flow={false}>
          <div data-cy="content">content</div>
        </Sticky>
      </div>
    ))
    cy.get('[data-cy="content"]').should('boundary.satisfy', ({ right }) => right === 500)
  })
  it('offset', () => {
    cy.mount(() => (
      <div data-cy="target" style="height: 200px;">
        <Sticky target="[data-cy='target']" offset="100">
          <div data-cy="content">content</div>
        </Sticky>
      </div>
    ))
    cy.get('[data-cy="content"]').should('boundary.satisfy', ({ top }) => top === 100)
  })
  it('flow', () => {
    cy.mount(() => (
      <div data-cy="target" style="height: 200px;">
        <Sticky target="[data-cy='target']" flow={false}>
          <div>content</div>
        </Sticky>
      </div>
    ))
    cy.get('.vmd-sticky').should('have.css', 'height', '0px')
  })
  it('zIndex', () => {
    cy.mount(() => (
      <div data-cy="target" style="height: 200px;">
        <Sticky target="[data-cy='target']" zIndex="0" offset="100">
          <div>content</div>
        </Sticky>
      </div>
    ))
    cy.get('.vmd-sticky__wrapper').should('have.css', 'z-index', '0')
  })
  it('滚动对象', () => {
    cy.scrollTo('top', { ensureScrollable: false }) // 防止测试之间 <html> 滚动条相互影响
    cy.mount(() => (
      <>
        <div style="height: 90vh">placeholder</div>
        <div data-cy="scroll" style="height: 100px; overflow: scroll; background:mark;">
          <div data-cy="target">
            <div style="height: 90vh">placeholder</div>
            <Sticky target="[data-cy='target']" posY="bottom">
              <div data-cy="content">content</div>
            </Sticky>
            <div style="height: 90vh">placeholder</div>
          </div>
        </div>
        <div style="height: 100vh">placeholder</div>
      </>
    ))
    const viewportHeight = Cypress.config('viewportHeight')
    cy.get('[data-cy="content"]').should(
      'not.boundary.satisfy',
      ({ bottom }) => bottom === viewportHeight
    )
    cy.scrollTo('center')
    cy.get('[data-cy="scroll"]').then(($el) => {
      const { bottom: scrollBottom } = $el.get(0).getBoundingClientRect()
      cy.get('[data-cy="content"]').should(
        'boundary.satisfy',
        ({ bottom }) => bottom === scrollBottom
      )
    })
  })
})
