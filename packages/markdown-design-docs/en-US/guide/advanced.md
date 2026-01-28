# Advanced Usage

The [Markdown](../component/markdown) component integrates core features like real-time Markdown rendering, table of contents generation, and full-text search. In most cases, importing this component is enough. While it is feature-complete, it can be less flexible in certain scenarios (e.g., custom layouts). To address this, we also provide standalone [Render](../component/render), [Search](../component/search), and [Toc](../component/toc) components (the Markdown component is built on top of these three). This allows you to import only what you need and compose them freely.

::: tip
This demo only demonstrates manual imports. For other import options, see [Global Registration](./quickstart.md#global-registration).
:::

::: demo
guide/Advanced
:::
