import { test, expect } from 'vitest'

import { lexer } from '../../../lexer'
import { parser } from '../..'

import { checkParserErrors } from '../../../utils/check-parser-errors'

import { isExpressionStatment } from '../../types'
import { testIntegerLiteral, testIdentifier } from './helpers'

test('test indentifer expression', () => {
  var input = 'foobar;'

  var l = lexer(input)
  var p = parser(l)

  var prog = p.parseProgram()
  checkParserErrors(p.errors)

  expect(prog.statements.length).toEqual(1)
  const stmt = prog.statements[0]

  if (isExpressionStatment(stmt)) {
    expect(testIdentifier(stmt.expression, 'foobar')).toBe(true)
  }
})

test('test integer literal expression', () => {
  var input = '5'
  var l = lexer(input)
  var p = parser(l)

  checkParserErrors(p.errors)

  var prog = p.parseProgram()
  const statement = prog.statements[0]

  expect(prog.statements.length).toEqual(1)
  expect(isExpressionStatment(statement)).toBe(true)

  if (isExpressionStatment(statement)) {
    expect(testIntegerLiteral(statement.expression, BigInt(5))).toBe(true)
  }
})
