import { expect, test } from 'vitest'
import { lexer } from '../../../lexer'
import { parser } from '../..'
import { checkParserErrors } from '../../../utils/check-parser-errors'
import { isExpressionStatment, isFunctionLiteral } from '../../types'
import { testLiteralExpression } from './helpers'

test('test function literal parsing', () => {
  const input = 'function(x, y) { x + y; }'

  var l = lexer(input)
  var p = parser(l)

  var program = p.parseProgram()
  checkParserErrors(p.errors)

  expect(program.statements.length).toEqual(1)
  const statement = program.statements[0]

  expect(isExpressionStatment(statement)).toBe(true)

  if (isExpressionStatment(statement)) {
    const expression = statement.expression
    expect(expression).not.toBeNull()

    if (expression) {
      expect(isFunctionLiteral(expression)).toBe(true)
      if (isFunctionLiteral(expression)) {
        expect(testLiteralExpression(expression.parameters[0], 'x')).toBe(true)
        expect(testLiteralExpression(expression.parameters[1], 'y')).toBe(true)
      }
    }
  }
})

test('test function parameters', () => {
  const tests = [
    { input: 'function() {};', expectedParams: [] },
    { input: 'function(x) {};', expectedParams: ['x'] },
    { input: 'function(x, y, z) {};', expectedParams: ['x', 'y', 'z'] }
  ]

  for (const test of tests) {
    var l = lexer(test.input)
    var p = parser(l)

    var program = p.parseProgram()
    checkParserErrors(p.errors)

    expect(program.statements.length).toEqual(1)
    const statement = program.statements[0]

    expect(isExpressionStatment(statement)).toBe(true)

    if (isExpressionStatment(statement)) {
      const expression = statement.expression
      expect(expression).not.toBeNull()

      if (expression) {
        expect(isFunctionLiteral(expression)).toBe(true)
        if (isFunctionLiteral(expression)) {
          expect(expression.parameters.length).toEqual(test.expectedParams.length)
        }
      }
    }
  }
})
