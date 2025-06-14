import Search from '..'

describe('MdSearch', () => {
  it('clearable', () => {
    cy.mount(() => <Search modelValue="关键字" />)
    cy.get('.vmd-search__clearable').should('exist')
  })
  it('border', () => {
    cy.mount(() => <Search />)
    cy.get('.vmd-search').should('have.css', 'border-bottom', '1px solid rgb(220, 223, 230)')
  })
  it('size', () => {
    cy.mount(() => <Search size="small" />)
    cy.get('.vmd-search').should('have.css', 'font-size', '12px')
    cy.get('.vmd-search__input').and('have.css', 'height', '24px')
  })
  it('disabled', () => {
    cy.mount(() => <Search disabled />)
    cy.get('.vmd-search__input').should('be.disabled')
  })
  it('placeholder', () => {
    cy.mount(() => <Search placeholder="请输入内容" />)
    cy.get('.vmd-search__input').should('have.attr', 'placeholder', '请输入内容')
  })
  it('target', () => {
    cy.mount(() => (
      <>
        <Search target="[data-cy='target']" modelValue="关键字" />
        <div data-cy="target">关键字</div>
        <div data-cy="other">关键字</div>
      </>
    ))
    cy.get('[data-cy="target"] mark.vmd-search--mark').should('exist')
    cy.get('[data-cy="other"] mark.vmd-search--mark').should('not.exist')
  })
  it('target 类型错误', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('console.error')
    })
    cy.mount(() => (
      <>
        <Search target="[data-cy]" />
        <svg data-cy></svg>
      </>
    ))
    cy.get('@console.error').should(
      'have.been.calledWith',
      '[vue-markdown-design] Target is not of the HTMLElement type.'
    )
  })
  it('target 不存在', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('console.error')
    })
    cy.mount(() => <Search target="[data-cy]" />)
    cy.get('@console.error').should(
      'have.been.calledWith',
      '[vue-markdown-design] Target does not exist.'
    )
  })
  it('closeIcon', () => {
    cy.mount(() => <Search />)
    cy.get('.vmd-search__close').should('exist')
  })
  it('inputAttrs', () => {
    cy.mount(() => <Search inputAttrs={{ maxlength: 10 }} />)
    cy.get('.vmd-search__input').should('have.attr', 'maxlength', '10')
  })
  it('input', () => {
    cy.mount(() => <Search onInput={cy.spy().as('onInput')} />)
    cy.get('.vmd-search__input').type('关键字')
    cy.get('@onInput').should('have.been.calledWith', Cypress.sinon.match({ type: 'input' }))
  })
  it('focus/blur', () => {
    cy.mount(() => <Search onFocus={cy.spy().as('onFocus')} onBlur={cy.spy().as('onBlur')} />)
    cy.get('.vmd-search__input').focus()
    cy.get('@onFocus').should('have.been.calledWith', Cypress.sinon.match({ type: 'focus' }))
    cy.get('.vmd-search__input').blur()
    cy.get('@onBlur').should('have.been.calledWith', Cypress.sinon.match({ type: 'blur' }))
  })
  it('change', () => {
    cy.mount(() => <Search onChange={cy.spy().as('onChange')} />)
    cy.get('.vmd-search__input').type('关键字{enter}')
    cy.get('@onChange').should('have.been.calledWith', Cypress.sinon.match({ type: 'change' }))
  })
  it('clear', () => {
    cy.mount(Search, {
      props: { modelValue: '关键字', disabled: true, onClear: cy.spy().as('onClear') }
    }).as('vue')
    cy.get('.vmd-search__clearable').click()
    cy.get('@onClear').should('not.have.been.called')
    cy.get<{ wrapper: typeof Search }>('@vue').then(({ wrapper }) =>
      wrapper.setProps({ disabled: false })
    )
    cy.get('.vmd-search__clearable').click()
    cy.get('@onClear').should('have.been.called')
  })
  it('toggle', () => {
    cy.mount(Search, {
      props: { modelValue: '关键字', disabled: true, onToggle: cy.spy().as('onToggle') }
    }).as('vue')
    cy.get('.vmd-search__prev').click()
    cy.get('@onToggle').should('not.have.been.called')
    cy.get<{ wrapper: typeof Search }>('@vue').then(({ wrapper }) =>
      wrapper.setProps({ disabled: false })
    )
    cy.get('.vmd-search__prev').click()
    cy.get('@onToggle').should('have.been.calledWith', 'prev')
    cy.get('.vmd-search__input').type('{enter}')
    cy.get('@onToggle').should('have.been.calledWith', 'next')
  })
  it('totalChange', () => {
    cy.mount(Search, { props: { onTotalChange: cy.spy().as('onTotalChange') } }).then(
      ({ wrapper }) => wrapper.setProps({ modelValue: '关键字' })
    )
    cy.get('@onTotalChange').should('have.been.calledWith', 0)
  })
})
