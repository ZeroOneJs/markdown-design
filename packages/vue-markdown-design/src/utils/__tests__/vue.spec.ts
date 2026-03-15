import { describe, expect, test } from 'vitest'
import { createApp } from 'vue'
import { withInstall } from '../vue'

describe('vue', () => {
  test('withInstall', () => {
    const component = withInstall({
      name: 'ViComponent'
    })
    const app = createApp({})
    app.use(component)
    expect(app.component('ViComponent')).toBeDefined()
  })

  test('withInstall 没有组件名将不会注册组件', () => {
    const component = withInstall({})
    const app = createApp({})
    app.use(component)
    expect(app._context.components).toEqual({})
  })
})
