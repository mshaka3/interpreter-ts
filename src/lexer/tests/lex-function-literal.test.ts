import { expect, test } from 'vitest'
import { lexer } from '..'

test('test lexing function literal', () => {
  const tests = [
    {
      input: 'function(x, y) { };',
      expected: ['FUNCTION', 'LPAREN', 'IDENT', 'COMMA', 'IDENT', 'RPAREN', 'LBRACE', 'RBRACE', 'SEMICOLON']
    }
  ]

  for (const test of tests) {
    const { getNextToken } = lexer(test.input)
    for (const token of test.expected) {
      expect(getNextToken().type).toBe(token)
    }
  }
})
