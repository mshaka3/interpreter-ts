import { test, expect } from 'vitest'
import { program } from '../AST'
import { identifier } from '../AST/expressions'
import { letStatement } from '../AST/statements'

test('test print method', () => {
  const p = program()

  const letS = letStatement({ type: 'LET', literal: 'let' }, identifier({ type: 'IDENT', literal: 'myVar' }, 'myVar'))
  letS.value = identifier({ type: 'IDENT', literal: 'anotherVar' }, 'anotherVar')
  p.statements.push(letS)

  expect(p.print()).toEqual('let myVar = anotherVar;')
})
