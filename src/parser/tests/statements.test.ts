import { test, expect } from 'vitest'
import { lexer } from '../../lexer'
import { parser } from '..'

import { LetStatement, Statement, isLetStatement } from '../types'
import { checkParserErrors } from '../../utils/check-parser-errors'
import { testLiteralExpression } from './expressions/helpers'

test('Parsing let statements', () => {
  const tests = [
    { input: 'let x = 5;', expectedIdentifier: 'x', expectedValue: 5 },
    { input: 'let y = true;', expectedIdentifier: 'y', expectedValue: true },
    { input: 'let foobar = y;', expectedIdentifier: 'foobar', expectedValue: 'y' }
  ]

  for (const test of tests) {
    const l = lexer(test.input)
    const p = parser(l)

    const program = p.parseProgram()
    const errors = p.errors
    checkParserErrors(errors)

    expect(checkParserErrors(errors)).toBe(false)
    expect(program).not.toBeNull()
    expect(program.statements.length).toBe(1)

    const stmt = program.statements[0]
    expect(testLetStatement(stmt, test.expectedIdentifier)).toBe(true)
    expect(isLetStatement(stmt)).toBe(true)
    if (isLetStatement(stmt)) {
      expect(testLiteralExpression(stmt.value, test.expectedValue)).toBe(true)
    }
  }

  function testLetStatement(s: Statement, expectedName: string): boolean {
    if (s.tokenLiteral() !== 'let') {
      console.error(`s.tokenLiteral not 'let'. got=${s.tokenLiteral()}`)
      return false
    }

    const letStmt = s as LetStatement
    if (letStmt.name.value !== expectedName) {
      console.error(`letStmt.name.value not '${expectedName}'. got=${letStmt.name.value}`)
      return false
    }

    if (letStmt.name.tokenLiteral() !== expectedName) {
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
