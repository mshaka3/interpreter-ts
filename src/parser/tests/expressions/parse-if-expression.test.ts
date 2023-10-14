import { test, expect } from 'vitest'

import { lexer } from '../../../lexer'
import { parser } from '../..'

import { checkParserErrors } from '../../../utils/check-parser-errors'

import { isExpressionStatment, isIFExpression } from '../../types'
import { testIdentifier, testInfixExpression } from './helpers'

test('test if expression', () => {
  var input = 'if (x < y) { x }'

  var l = lexer(input)
  var p = parser(l)
  var program = p.parseProgram()
  checkParserErrors(p.errors)

  expect(program.statements.length).toEqual(1)
  const statement = program.statements[0]

  expect(isExpressionStatment(statement)).toEqual(true)

  if (isExpressionStatment(statement)) {
    expect(statement.expression).not.toBeNull()

    const expression = statement.expression
    if (expression) {
      expect(isIFExpression(expression)).toEqual(true)
      if (isIFExpression(expression)) {
        expect(testInfixExpression(expression.condition, '<', 'x', 'y')).toBe(true)

        const consequence = expression.consequence
        expect(consequence.statements.length).toEqual(1)

        const consequenceStatement = consequence.statements[0]
        expect(consequenceStatement.type == 'EXPRESSION_STATEMENT').toBe(true)

        if (isExpressionStatment(consequenceStatement)) {
          expect(testIdentifier(consequenceStatement.expression, 'x')).toBe(true)
        }

        expect(expression.alternative).toBe(undefined)
      }
    }
  }
})

test('test if else expression', () => {
  var input = 'if (x < y) { x } else { y }'
  var l = lexer(input)
  var p = parser(l)
  var program = p.parseProgram()
  checkParserErrors(p.errors)

  expect(program.statements.length).toEqual(1)
  const statement = program.statements[0]

  expect(isExpressionStatment(statement)).toEqual(true)

  if (isExpressionStatment(statement)) {
    expect(statement.expression).not.toBeNull()

    const expression = statement.expression
    if (expression) {
      expect(isIFExpression(expression)).toEqual(true)
      if (isIFExpression(expression)) {
        expect(testInfixExpression(expression.condition, '<', 'x', 'y')).toBe(true)

        const consequence = expression.consequence
        expect(consequence.statements.length).toEqual(1)

        const consequenceStatement = consequence.statements[0]
        expect(consequenceStatement.type == 'EXPRESSION_STATEMENT').toBe(true)

        if (isExpressionStatment(consequenceStatement)) {
          expect(testIdentifier(consequenceStatement.expression, 'x')).toBe(true)
        }

        expect(expression.alternative).not.toBeNull()
      }
    }
  }
})
