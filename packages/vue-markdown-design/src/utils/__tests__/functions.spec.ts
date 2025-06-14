import { describe, expect, it } from 'vitest'
import { runFnWithOptions } from '../functions'

describe('functions', () => {
  it('runFnWithOptions', () => {
    expect(runFnWithOptions(false, () => {})).toBeUndefined()
  })
})
