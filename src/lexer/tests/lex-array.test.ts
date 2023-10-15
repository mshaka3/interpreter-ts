import { expect, test } from 'vitest'
import { lexer } from '..'

test('test lexing array', () => {
  const tests = [{ input: '[1, 2];', expected: ['LBRACKET', 'INT', 'COMMA', 'INT', 'RBRACKET', 'SEMICOLON', 'EOF'] }]

  for (const test of tests) {
    const { getNextToken } = lexer(test.input)
    for (const token of test.expected) {
      expect(getNextToken().type).toBe(token)
    }
  }
})
