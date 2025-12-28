import { scrollToEl } from '../dom'

describe('dom', () => {
  it('scrollToEl', () => {
    cy.mount(() => (
      <>
        <div style="height: 300px; overflow: scroll;">
          <div style="height: 100vh;"></div>
          <div data-cy>content</div>
          <div style="height: 100vh;"></div>
        </div>
      </>
    ))
    cy.get('[data-cy]').should(($el) => {
      scrollToEl($el[0])
      expect($el).to.boundary.satisfy(({ top }) => top === 8)
    })
  })
})
