import { expect, test } from 'vitest'
import { lexer } from '../../../lexer'
import { parser } from '../..'
import { checkParserErrors } from '../../../utils/check-parser-errors'
import { isExpressionStatment, isIndexExpression } from '../../types'
import { testIdentifier, testInfixExpression } from './helpers'

test('test parsing index expression', () => {
  const input = 'myArray[1 + 1]'

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
    expect(expression.type).toEqual('INDEX_EXPRESSION')

    if (isIndexExpression(expression)) {
      expect(testIdentifier(expression.left, 'myArray')).toBe(true)
      expect(testInfixExpression(expression.index, '+', 1, 1)).toBe(true)
    }
  }
})
