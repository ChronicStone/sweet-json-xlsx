---
layout: home

title: Feature-rich Type-safe Excel Reporting
hero:
  name: "Typed-xlsx"
  text: "Feature-rich Type-safe Excel Reporting"
  tagline: "Craft complex Excel reports with ease in a type-safe manner."
  image:
    src: /images/logo.svg
    alt: Typed-xlsx
    style:
      margin-left: 50px
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/key-benefits-why
    - theme: alt
      text: View on GitHub
      link: https://github.com/ChronicStone/typed-xlsx

features:
  - title: Type-safe Schema Builder
    details: Construct type-safe spreadsheet schemas with TypeScript
    icon: "🛠"
  - title: Dynamic Cell Styling/Formatting
    details: Tailor cell styles and formats dynamically, allowing advanced per-row customization
    icon: "🎨"
  - title: Multi-sheet Support
    details: Manage complex datasets easily with support for multiple sheets within a single workbook
    icon: "📑"
  - title: Advanced Row Structures
    details: Leverage sophisticated row layouts that support sub-rows and automatic merging
    icon: "🧩"
  - title: Serializing Complex Data Types
    details: Serialize arrays, booleans, and more in a 100% type-safe way
    icon: "🔄"
  - title: Easy Default Value Management
    details: Simple default / fallback values management for your cells
    icon: "🎯"
  - title: Multiple Tables Per Sheet
    details: Include numerous tables on a single sheet, with deep layout customization (linear or grid-like)
    icon: "🏗️"
  - title: Dynamic Column Mapping
    details: Use type-safe context to generate columns based on your data
    icon: "🗺️"
  - title: Column Summaries
    details: Automatically calculate and insert column summaries to analyze data at a glance
    icon: "🧮"

footer:
  message: "Licensed under the MIT License. Created by Cyprien Thao. Extendable and customizable for developers."
---

<script setup>
    import ExampleRenderer from './.vitepress/theme/components/ExampleRenderer.vue'
</script>

<ClientOnly>
  <ExampleRenderer fileKey="financial-report">
    <template v-slot:schema>
    ```ts twoslash
    import { ExcelSchemaBuilder } from '@chronicstone/typed-xlsx'
    // ---cut-before---
    const schema = ExcelSchemaBuilder.create<{ firstName: string, lastName: string, countries: string[] }>()
    ```
    </template>
    <template v-slot:data>
  <<< ./.examples/financial-report/data.ts
    </template>
    <template v-slot:file>
  <<< ./.examples/financial-report/file.ts
    </template>
  </ExampleRenderer>
</ClientOnly>
