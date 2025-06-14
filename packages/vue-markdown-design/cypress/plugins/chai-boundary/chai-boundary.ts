import type { BoundaryMatcher } from './type'

export const chaiBoundary: Chai.ChaiPlugin = (_chai, utils) => {
  _chai.Assertion.overwriteMethod('satisfy', function (_super) {
    return function (this: Chai.AssertionStatic, matcher: BoundaryMatcher, ...args: any[]) {
      const isBoundary = utils.flag(this, 'boundary')
      const el = this._obj.get(0)
      if (isBoundary && el instanceof HTMLElement) {
        const rect = el.getBoundingClientRect()
        this.assert(
          matcher(rect),
          'expected #{this} to satisfy #{exp} but got #{act}',
          'expected #{this} to not satisfy #{exp} but got #{act}',
          matcher
        )
      } else {
        _super.apply(this, matcher, ...args)
      }
    }
  })
  _chai.Assertion.addChainableMethod(
    'boundary',
    function () {},
    function (this: Chai.AssertionStatic) {
      utils.flag(this, 'boundary', true)
    }
  )
}
