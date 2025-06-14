import { useScrollParent } from '../use-scroll-element'

describe('use-scroll-element', () => {
  it('target 为空', () => {
    const { scrollEl, update } = useScrollParent(null)
    update()
    cy.wrap(scrollEl.value).should('be.undefined')
  })
  it('父节点为空', () => {
    const node = document.createElement('div')
    const { scrollEl, update } = useScrollParent(node)
    update()
    cy.wrap(scrollEl.value).should('be.undefined')
  })
  it('onlyParent', () => {
    cy.mount(() => (
      <div data-cy="parent" style={{ overflow: 'scroll' }}>
        <div data-cy="child"></div>
      </div>
    ))
    cy.get('[data-cy="parent"]').then(($el) => {
      const parent = $el.get(0)
      cy.get('[data-cy="child"]').should(($el) => {
        const { scrollEl, update } = useScrollParent($el.get(0))
        update()
        expect(scrollEl.value).to.eq(parent)
      })
    })
  })
})
