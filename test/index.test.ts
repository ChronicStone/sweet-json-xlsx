import fs from 'node:fs'
import { describe, it } from 'vitest'
import { faker } from '@faker-js/faker'
import type { TransformersMap } from '../src/types'
import { ExcelBuilder, ExcelSchemaBuilder } from '../src'

interface Organization {
  id: number
  name: string
}

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  roles: string[]
  organizations: Organization[]
  results: {
    general: { overall: number }
    technical: { overall: number }
    interview?: { overall: number }
  }
  createdAt: Date
  balance: number
}

const transformers = {
  boolean: (key: boolean) => key ? 'Yes' : 'No',
  list: (key: (string)[]) => key.join(', '),
  arrayLength: (key: any[] | string) => key.length,
  date: (key: Date) => key.toLocaleDateString(),
} satisfies TransformersMap
// Usage example

describe('should', () => {
  it('exported', () => {
    const organizations: Organization[] = Array.from({ length: 10 }, (_, id) => ({
      id,
      name: faker.company.name(),
    }))

    const users: User[] = Array.from({ length: 100 }, (_, id) => ({
      id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      roles: ['admin', 'user', 'manager', 'guest'].filter(() => Math.random() > 0.5),
      // RANDOM NUMBER OF ORGANIZATIONS
      organizations: organizations.filter(() => Math.random() > 0.5),
      results: {
        general: { overall: Math.floor(Math.random() * 10) },
        technical: { overall: Math.floor(Math.random() * 10) },
        ...(Math.random() > 0.5 ? { interview: { overall: Math.floor(Math.random() * 10) } } : {}),
      },
      balance: +faker.finance.amount(0, 1000000, 2),
      createdAt: faker.date.past(),
    }))
    const assessmentExport = ExcelSchemaBuilder
      .create<User>()
      .withTransformers(transformers)
      .column('id', { key: 'id' })
      .column('firstName', { key: 'firstName' })
      .column('lastName', { key: 'lastName' })
      .column('email', { key: 'email' })
      .column('roles', {
        key: 'roles',
        transform: 'list',
        cellStyle: data => ({ font: { color: { rgb: data.roles.includes('admin') ? 'd10808' : undefined } } }),
      })
      .column('balance', { key: 'balance', format: '"$"#,##0.00_);\\("$"#,##0.00\\)' })
      .column('nbOrgs', { key: 'organizations', transform: 'arrayLength' })
      .column('orgs', { key: 'organizations', transform: org => org.map(org => org.name).join(', ') })
      .column('generalScore', { key: 'results.general.overall', format: '# / 10' })
      .column('technicalScore', { key: 'results.technical.overall' })
      .column('interviewScore', { key: 'results.interview.overall', default: 'N/A' })
      .column('createdAt', { key: 'createdAt', format: 'd mmm yyyy' })
      .group('group:org', (builder, context: Organization[]) => {
        for (const org of context) {
          builder
            .column(org.id.toString(), {
              label: org.name,
              key: 'organizations',
              transform: orgs => orgs.some(o => o.id === org.id) ? 'YES' : 'NO',
            })
        }
      })
      .column('test', { key: 'id' })
      .build()

    const schema = ExcelSchemaBuilder
      .create<User>()
      .withTransformers(transformers)
      .column('id', { key: 'id' })
      .build()

    const buffer = ExcelBuilder
      .create()
      .sheet('sheet1', {
        data: users,
        schema: assessmentExport,
        select: {
          'group:org': false,
        },
        context: {
          // 'group:org': organizations,
        },

      })
      .sheet('sheet2', {
        data: users,
        schema: assessmentExport,
        select: {
          'firstName': true,
          'lastName': false,
          'email': false,
          'group:org': false,
        },
        context: {
          // 'group:org': organizations,
        },
      })
      .sheet('sheet3', {
        data: users,
        schema,
      })
      .build()

    fs.writeFileSync('example.xlsx', buffer)
  })
})
