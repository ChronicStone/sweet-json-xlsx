import { defineConfig } from 'vitepress'
import { transformerTwoslash } from 'vitepress-plugin-twoslash'
import container from 'markdown-it-container'
import { renderSandbox } from 'vitepress-plugin-sandpack'
import Unocss from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Typed-xlsx',
  description: 'Documentation of typed-xlsx library',
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    codeTransformers: [
      transformerTwoslash(),
    ],
    config(md) {
      md
        .use(container, 'sandbox', {
          render(tokens, idx) {
            return renderSandbox(tokens, idx, 'sandbox')
          },
        })
        .use(container, 'code-sandbox', {
          render(tokens, idx) {
            return renderSandbox(tokens, idx, 'code-sandbox')
          },
        })
    },
  },
  lastUpdated: true,
  ignoreDeadLinks: true,
  cleanUrls: true,
  titleTemplate: 'Typed-xlsx | :title',
  themeConfig: {
    aside: true,
    logo: '/images/logo.png',
    editLink: {
      pattern: 'https://github.com/ChronicStone/typed-xlsx/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    search: { provider: 'local' },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/getting-started/key-benefits-why' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ChronicStone/typed-xlsx' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Cyprien THAO',
    },
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Key Benefits & Why', link: '/getting-started/key-benefits-why' },
          { text: 'Installation', link: '/getting-started/installation' },
        ],
      },
      {
        text: 'Schema Builder',
        items: [
          { text: 'Create schema', link: '/schema-builder/create-schema' },
          { text: 'Define columns', link: '/schema-builder/columns' },
          { text: 'Dynamic Columns', link: '/schema-builder/dynamic-columns' },
          { text: 'Global Transformers', link: '/schema-builder/global-transformers' },
          { text: 'Build Schema', link: '/schema-builder/build-schema' },
        ],
      },
      // {
      //   text: 'Column Definition',
      //   items: [
      //     { text: 'Header', link: '/column-definition/header' },
      //     { text: 'Value Transformation', link: '/column-definition/value-transformation' },
      //     { text: 'Key & Value', link: '/column-definition/key-value' },
      //     { text: 'Default Value', link: '/column-definition/default-value' },
      //     { text: 'Cell Format', link: '/column-definition/cell-format' },
      //     { text: 'Cell Style', link: '/column-definition/cell-style' },
      //     { text: 'Summary', link: '/column-definition/summary' },
      //   ],
      // },
      {
        text: 'File Builder',
        items: [
          { text: 'Create file builder', link: '/file-builder/create-file-builder' },
          { text: 'Define Sheets', link: '/file-builder/define-sheets' },
          { text: 'Define Tables', link: '/file-builder/define-tables' },
          { text: 'Build excel file', link: '/file-builder/build-excel-file' },
        ],
      },
    ],
  },
  vite: {
    plugins: [
      // @ts-expect-error unknown ts issue
      Unocss({}),
    ],
  },
})
