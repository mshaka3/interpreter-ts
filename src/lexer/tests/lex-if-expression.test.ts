import { expect, test } from 'vitest'
import { lexer } from '..'

test('test lex if expression', () => {
  const tests = [
    {
      input: 'if(5 < 10) { return true } else {return false}',
      expected: [
        'IF',
        'LPAREN',
        'INT',
        'LT',
        'INT',
        'RPAREN',
        'LBRACE',
        'RETURN',
        'TRUE',
        'RBRACE',
        'ELSE',
        'LBRACE',
        'RETURN',
        'FALSE',
        'RBRACE'
      ]
    }
  ]

  for (const test of tests) {
    const { getNextToken } = lexer(test.input)
    for (const token of test.expected) {
      expect(getNextToken().type).toBe(token)
    }
  }
})
