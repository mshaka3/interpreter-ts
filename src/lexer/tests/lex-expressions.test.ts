import { expect, test } from 'vitest'
import { lexer } from '..'

test('test lexing expressions', () => {
  const tests = [
    { input: 'x + y;', expected: ['IDENT', 'PLUS', 'IDENT', 'SEMICOLON'] },
    { input: 'let x = true;', expected: ['LET', 'IDENT', 'ASSIGN', 'TRUE', 'SEMICOLON'] },
    { input: '!-/*5;', expected: ['BANG', 'MINUS', 'SLASH', 'ASTERISK', 'INT', 'SEMICOLON'] },
    { input: '5 < 10 > 5;', expected: ['INT', 'LT', 'INT', 'GT', 'INT', 'SEMICOLON'] },
    { input: '10 == 10;', expected: ['INT', 'EQ', 'INT', 'SEMICOLON'] },
    { input: '10 != 10;', expected: ['INT', 'NEQ', 'INT', 'SEMICOLON'] }
  ]

  for (const test of tests) {
    const { getNextToken } = lexer(test.input)
    for (const token of test.expected) {
      expect(getNextToken().type).toBe(token)
    }
  }
})
