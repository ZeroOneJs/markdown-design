import type { PluginSimple } from 'markdown-it'

export const tableWrapper: PluginSimple = (md) => {
  md.renderer.rules.table_open = () => '<div class="vp-table-wrapper"><table>'
  md.renderer.rules.table_close = () => '</table></div>'
}
