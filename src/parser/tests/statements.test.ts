import { test, expect } from 'vitest'
import { lexer } from '../../lexer'
import { parser } from '..'

import { LetStatement, Statement } from '../types'
import { checkParserErrors } from '../../utils/check-parser-errors'

test('Parsing let statements', () => {
  const input = `
      let x = 5;
      let y = 10;
      let foobar = 838383;
    `

  const l = lexer(input)
  const p = parser(l)

  const program = p.parseProgram()
  const errors = p.errors

  expect(checkParserErrors(errors)).toBe(false)
  expect(program).not.toBeNull()
  expect(program.statements.length).toBe(3)

  const tests = [{ expectedIdentifier: 'x' }, { expectedIdentifier: 'y' }, { expectedIdentifier: 'foobar' }]

  for (let i = 0; i < tests.length; i++) {
    const tt = tests[i]
    const stmt = program.statements[i]
    expect(testLetStatement(stmt, tt.expectedIdentifier)).toBe(true)
  }

  function testLetStatement(s: Statement, name: string): boolean {
    if (s.tokenLiteral() !== 'let') {
      console.error(`s.tokenLiteral not 'let'. got=${s.tokenLiteral()}`)
      return false
    }

    const letStmt = s as LetStatement
    if (letStmt.name.value !== name) {
      console.error(`letStmt.name.value not '${name}'. got=${letStmt.name.value}`)
      return false
    }

    if (letStmt.name.tokenLiteral() !== name) {
      console.error(`s.name not '${name}'. got=${letStmt.name}`)
      return false
    }

    return true
  }
})

test('test return statements', () => {
  const input = `
    return 5;
    return 10;
    return 993322;`
  const l = lexer(input)
  const p = parser(l)

  const program = p.parseProgram()
  const errors = p.errors

  expect(checkParserErrors(errors)).toBe(false)
  expect(program).not.toBeNull()
  expect(program.statements.length).toBe(3)

  for (const stm of program.statements) {
    expect(testReturnStm(stm)).toBe(true)
  }

  function testReturnStm(stmt: Statement) {
    if (!stmt || stmt.type != 'RETURN_STATEMENT') {
      return false
    }

    if (stmt.tokenLiteral() != 'return') {
      return false
    }

    return true
  }
})
