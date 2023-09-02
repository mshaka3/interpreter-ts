import { test, expect } from 'vitest'

import { lexer } from '../../../lexer'
import { parser } from '../..'

import { PrefixExpression, isExpressionStatment } from '../../types'
import { testIntegerLiteral } from './helpers'

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
      expect(testIntegerLiteral(prefixExpression.right, BigInt(test.integerValue))).toBe(true)
    }
  }
})
