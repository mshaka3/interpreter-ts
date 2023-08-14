import { test, expect } from 'vitest'

import { lexer } from '../../lexer'
import { parser } from '..'

import { checkParserErrors } from '../../utils/check-parser-errors'

import {
  Expression,
  InfixExpression,
  IntegerLiteral,
  PrefixExpression,
  isExpressionStatment,
  isIntegerLiteral
} from '../types'
import { warn } from 'console'

test('test indentifer expression', () => {
  var input = 'foobar;'

  var l = lexer(input)
  var p = parser(l)

  var prog = p.parseProgram()
  console.log(prog)
  checkParserErrors(p.errors)

  expect(prog.statements.length).toEqual(1)
  const stmt = prog.statements[0]
  expect(stmt.type == 'EXPRESSION_STATEMENT').toBe(true)
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
    expect(statement.expression?.type == 'INTEGER_LITERAL').toBe(true)

    const integerLiteralStmt = statement.expression as IntegerLiteral
    expect(integerLiteralStmt.value).toBe(BigInt(5))
    expect(integerLiteralStmt.tokenLiteral()).toBe('5')
  }
})

test('test parseing prefix expression', () => {
  const prefixTests = [
    { input: '!5;', operator: '!', integerValue: 5 },
    { input: '-15;', operator: '-', integerValue: 15 }
  ]

  for (const test of prefixTests) {
    const l = lexer(test.input)
    const p = parser(l)

    const program = p.parseProgram()

    expect(program.statements.length).toBe(1)
    const statement = program.statements[0]

    expect(isExpressionStatment(statement)).toBe(true)

    if (isExpressionStatment(statement)) {
      expect(statement.expression?.type == 'PREFIX_EXPRESSION').toBe(true)
      const prefixExpression = statement.expression as PrefixExpression
      expect(prefixExpression.operator).toEqual(test.operator)
      expect(testIntegerLiteral(prefixExpression.right, test.integerValue)).toBe(true)
    }
  }
})

test('test parse infix expression', () => {
  const infixTests = [
    { input: '5 + 5;', leftValue: 5, operator: '+', rightValue: 5 },
    { input: '5 - 5;', leftValue: 5, operator: '-', rightValue: 5 },
    { input: '5 * 5;', leftValue: 5, operator: '*', rightValue: 5 },
    { input: '5 / 5;', leftValue: 5, operator: '/', rightValue: 5 },
    { input: '5 > 5;', leftValue: 5, operator: '>', rightValue: 5 },
    { input: '5 < 5;', leftValue: 5, operator: '<', rightValue: 5 },
    { input: '5 == 5;', leftValue: 5, operator: '==', rightValue: 5 },
    { input: '5 != 5;', leftValue: 5, operator: '!=', rightValue: 5 }
  ]

  for (const test of infixTests) {
    var l = lexer(test.input)
    var p = parser(l)

    var program = p.parseProgram()
    checkParserErrors(p.errors)

    expect(program.statements.length).toBe(1)
    const statement = program.statements[0]

    expect(isExpressionStatment(statement)).toBe(true)

    if (isExpressionStatment(statement)) {
      expect(statement.expression?.type == 'INFIX_EXPRESSION').toBe(true)

      const infixExpression = statement.expression as InfixExpression
      expect(infixExpression.operator).toEqual(test.operator)
      expect(testIntegerLiteral(infixExpression.left, BigInt(test.leftValue))).toBe(true)
      expect(testIntegerLiteral(infixExpression.right, BigInt(test.rightValue))).toBe(true)
    }
  }
})

function testIntegerLiteral(expression: Expression | null, value: bigint): boolean {
  if (!expression) return false

  if (!isIntegerLiteral(expression)) {
    return false
  } else if (expression.value != value) {
    return false
  }

  return true
}
