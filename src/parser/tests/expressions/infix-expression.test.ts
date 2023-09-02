import { test, expect } from 'vitest'

import { lexer } from '../../../lexer'
import { parser } from '../../'

import { checkParserErrors } from '../../../utils/check-parser-errors'

import { isExpressionStatment } from '../../types'
import { testInfixExpression } from './helpers'

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
      expect(statement.expression).not.toBeNull()

      if (statement.expression) {
        testInfixExpression(statement.expression, test.operator, test.leftValue, test.rightValue)
      }
    }
  }
})
