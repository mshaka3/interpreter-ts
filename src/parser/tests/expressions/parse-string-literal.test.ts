import { expect, test } from 'vitest'
import { lexer } from '../../../lexer'
import { parser } from '../..'
import { checkParserErrors } from '../../../utils/check-parser-errors'
import { isExpressionStatment, isStringLiteral } from '../../types'

test('test parsing string literal expression', () => {
  const input = '"hello world";'

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
    expect(expression.type).toEqual('STRING_LITERAL')

    if (isStringLiteral(expression)) {
      expect(expression.value).toEqual('hello world')
    }
  }
})
