import type { BoundaryMatcher } from './type'

function getBoundaryResult(this: Chai.AssertionStatic, matcher: BoundaryMatcher) {
  const el = this._obj.get?.(0)
  if (!(el instanceof HTMLElement)) return {}
  const rect = el.getBoundingClientRect()
  return { rect, result: matcher(rect) }
}
export const chaiBoundary: Chai.ChaiPlugin = (_chai, utils) => {
  _chai.Assertion.overwriteMethod('satisfy', function (_super) {
    return function (this: Chai.AssertionStatic, matcher: BoundaryMatcher, ...args: any[]) {
      if (utils.flag(this, 'boundary')) {
        const { rect, result = utils.flag(this, 'negate') } = getBoundaryResult.call(this, matcher)
        this.assert(
          result,
          'expected #{act} to satisfy #{exp}',
          'expected #{act} to not satisfy #{exp}',
          matcher,
          rect
        )
      } else {
        _super.call(this, matcher, ...args)
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
