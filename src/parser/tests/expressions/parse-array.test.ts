import { expect, test } from 'vitest'
import { lexer } from '../../../lexer'
import { parser } from '../..'
import { checkParserErrors } from '../../../utils/check-parser-errors'
import { isArrayLiteral, isExpressionStatment, isInfixExpression, isIntegerLiteral } from '../../types'
import { testInfixExpression, testIntegerLiteral } from './helpers'

test('test parsing array literal', () => {
  const input = '[1, 2 * 2, 3 + 3]'

  const l = lexer(input)
  const p = parser(l)

  checkParserErrors(p.errors)
  expect(p.errors.length).toEqual(0)

  const program = p.parseProgram()
  expect(program.statements.length).toEqual(1)

  const statement = program.statements[0]
  expect(statement.type).toEqual('EXPRESSION_STATEMENT')

  if (isExpressionStatment(statement)) {
    const expression = statement.expression
    expect(expression.type).toEqual('ARRAY_LITERAL')

    if (isArrayLiteral(expression)) {
      expect(expression.elements.length).toEqual(3)

      if (expression.elements.length == 3) {
        const elements = expression.elements
        expect(elements[0].type).toEqual('INTEGER_LITERAL')

        if (isIntegerLiteral(elements[0])) {
          expect(testIntegerLiteral(elements[0], BigInt(1))).toBe(true)
        }
        if (isInfixExpression(elements[1])) {
          expect(testInfixExpression(elements[1], '*', 2, 2)).toBe(true)
        }
        if (isInfixExpression(elements[2])) {
          expect(testInfixExpression(elements[2], '+', 3, 3)).toBe(true)
        }
      }
    }
  }
})
