import Render, { type RenderInstance } from '..'

describe('MdRender', () => {
  it('src', () => {
    cy.fixture('commonmark/mini.md').then((src) => {
      cy.mount(() => <Render src={src} />)
    })
    cy.get('.markdown-body').should(
      'have.html',
      '<h1 id="title" tabindex="-1"><a class="vmd-render__anchor" href="#title" data-vmd-anchor="">#</a>Title</h1>\n<p>This is a paragraph used to test the rendering effect of markdown.</p>\n'
    )
  })
  describe('plugins', () => {
    it('function', () => {
      cy.fixture('commonmark/mini.md').then((src) => {
        cy.mount(() => (
          <Render
            src={src}
            plugins={(md) => {
              md.renderer.rules.paragraph_open = () => '<span>'
              md.renderer.rules.paragraph_close = () => '</span>'
            }}
          />
        ))
      })
    })
    it('array', () => {
      cy.fixture('commonmark/mini.md').then((src) => {
        cy.mount(() => (
          <Render
            src={src}
            plugins={[
              (md) => {
                md.renderer.rules.paragraph_open = () => '<span>'
              },
              [
                (md, params) => {
                  md.renderer.rules.paragraph_close = () => params
                },
                '</span>'
              ]
            ]}
          />
        ))
      })
    })
    afterEach(() => {
      cy.get('p').should('not.exist')
      cy.get('span')
        .should('exist')
        .and('contain', 'This is a paragraph used to test the rendering effect of markdown.')
    })
  })
  it('inline', () => {
    cy.mount(() => <Render src="**markdown**" inline />)
    cy.get('p').should('not.exist')
    cy.get('strong').should('exist')
  })
  it('preset', () => {
    cy.mount(Render, {
      props: {
        src: '<br>'
      }
    }).as('vue')
    cy.get('br').should('exist')
    cy.get<{ wrapper: typeof Render }>('@vue').then(({ wrapper }) => {
      wrapper.setProps({ preset: 'zero' })
    })
    cy.get('br').should('not.exist')
  })
  it('html', () => {
    cy.mount(() => <Render src={'<span data-cy>markdown</span>'} />)
    cy.get('[data-cy]').should('exist')
  })
  it('sanitize', () => {
    cy.mount(() => <Render src={'<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'} />)
    cy.get('.markdown-body').should('have.html', '<p>abc</p>')
  })
  it('xhtmlOut', () => {
    cy.mount(Render, { props: { xhtmlOut: true } }).should(({ component }) => {
      const html = (component as RenderInstance).getMdit().render('---')
      expect(html).to.eq('<hr />\n')
    })
  })
  it('breaks', () => {
    cy.mount(() => <Render src={'a\nb'} breaks />)
    cy.get('.markdown-body').should('have.html', '<p>a<br>\nb</p>\n')
  })
  it('langPrefix', () => {
    cy.mount(() => <Render src={'```js\nconst = foo\n```'} langPrefix="cy-" />)
    cy.get('code[class^=language-]').should('not.exist')
    cy.get('code[class^=cy-]').should('exist')
  })
  it('linkify', () => {
    cy.mount(() => <Render src={'foo@example.com'} linkify />)
    cy.get('.markdown-body').should(
      'have.html',
      '<p><a href="mailto:foo@example.com">foo@example.com</a></p>\n'
    )
  })
  it('typographer', () => {
    cy.mount(() => <Render src={'"foo" \'bar\''} typographer />)
    cy.get('.markdown-body').should('have.html', '<p>“foo” ‘bar’</p>\n')
  })
  it('quotes', () => {
    cy.mount(() => (
      <Render src={'"foo" \'bar\''} typographer quotes={['[[[', ']]', '(((((', '))))']} />
    ))
    cy.get('.markdown-body').should('have.html', '<p>[[[foo]] (((((bar))))</p>\n')
  })
  it('highlight', () => {
    cy.mount(Render, {
      props: {
        src: '```js\nconst = foo\n```'
      }
    }).as('vue')
    cy.get('code.language-js').should('exist')
    cy.get<{ wrapper: typeof Render }>('@vue').then(({ wrapper }) => {
      wrapper.setProps({ src: '```\nconst = foo\n```' })
    })
    cy.get('code.language-js').should('not.exist')
    cy.get('[class^=hljs-]').should('exist')
    cy.get<{ wrapper: typeof Render }>('@vue').then(({ wrapper }) => {
      wrapper.setProps({ highlight: false })
    })
    cy.get('[class^=hljs-]').should('not.exist')
  })
  it('highlightOptions', () => {
    cy.mount(() => (
      <Render src={'```js\nconst = foo\n```'} highlightOptions={{ classPrefix: 'cy-' }} />
    ))
    cy.get('[class^=hljs-]').should('not.exist')
    cy.get('[class^=cy-]').should('exist')
  })
  it('emoji', () => {
    cy.mount(() => <Render src={':)'} />)
    cy.contains('😃').should('exist')
  })
  describe('anchor', () => {
    const selector = '[id=title]'
    it('boolean', () => {
      cy.mount(() => <Render src={'# Title'} />)
      cy.get(selector).should('exist')
    })
    it('object', () => {
      cy.mount(() => <Render src={'# Title'} anchor={{ tabIndex: false }} />)
      cy.get(selector).should('not.have.attr', 'tabIndex')
    })
    it('function', () => {
      cy.mount(() => (
        <Render
          src={'# Title'}
          anchor={(anchor) => ({
            permalink: anchor.permalink.headerLink({
              renderAttrs: () => ({
                'data-cy': 'title'
              })
            })
          })}
        />
      ))
      cy.get('a[data-cy="title"]').should('exist')
    })
  })
  describe('permalink', () => {
    it('默认', () => {
      cy.mount(() => <Render src={'# Title'} />)
      cy.get('a.vmd-render__anchor').should('exist')
    })
    it('禁用', () => {
      cy.mount(() => <Render src={'# Title'} permalink={false} />)
      cy.get('a.vmd-render__anchor').should('not.exist')
    })
  })
  it('markdownClass', () => {
    cy.mount(() => <Render markdownClass="cy-test" />)
    cy.get('.markdown-body').should('not.exist')
    cy.get('.cy-test').should('exist')
  })
  it('envChange', () => {
    cy.mount(() => <Render onEnvChange={cy.spy().as('onEnvChange')} />)
    cy.get('@onEnvChange').should('have.been.calledWith', {})
  })
})
