import { describe, expect, it } from 'vitest'
import MarkdownIt from 'markdown-it'
import { headers } from '../src/index'
import Token from 'markdown-it/lib/token.mjs'

describe('markdown-it-headers', () => {
  it('render', () => {
    const md = new MarkdownIt()
    md.use(headers)
    const env = {}
    md.render('# 标题 1\n## 标题 2\n### 标题 3\n#### 标题 4\n##### 标题 5\n###### 标题 6', env)
    expect(env).toMatchObject({
      headings: [
        { level: 1, text: '标题 1' },
        { level: 2, text: '标题 2' },
        { level: 3, text: '标题 3' },
        { level: 4, text: '标题 4' },
        { level: 5, text: '标题 5' },
        { level: 6, text: '标题 6' }
      ]
    })
  })
  it('emoji', () => {
    const md = new MarkdownIt()
    md.use(headers)
    const token = new Token('emoji', '', 0)
    token.content = '😃'
    md.core.ruler.push('emoji', (state) => {
      const { children } = state.tokens[1]
      children?.push(token)
    })
    const env = {}
    md.render('# 标题', env)
    expect(env).toMatchObject({ headings: [{ level: 1, text: '标题😃' }] })
  })
})
