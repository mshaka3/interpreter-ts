import { expect, test } from 'vitest'
import { lexer } from '../../../lexer'
import { parser } from '../..'
import { checkParserErrors } from '../../../utils/check-parser-errors'
import { isCallExperssion, isExpressionStatment } from '../../types'

test('test call experssion parsing', () => {
  const input = 'add(1, 2 * 3, 4 + 5);'

  const l = lexer(input)
  const p = parser(l)

  const program = p.parseProgram()
  checkParserErrors(p.errors)

  expect(program.statements.length).toEqual(1)
  const statement = program.statements[0]

  expect(isExpressionStatment(statement)).toBe(true)
  if (isExpressionStatment(statement)) {
    const expression = statement.expression
    expect(expression).not.toBeNull()

    if (expression) {
      expect(isCallExperssion(expression)).toBe(true)
    }
  }
})
