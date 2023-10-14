import { expect, test } from 'vitest'
import { lexer } from '..'

test('test  lexing let statements', function () {
  const tests = [
    { input: 'let five = 5;', expected: ['LET', 'IDENT', 'ASSIGN', 'INT', 'SEMICOLON'] },
    { input: 'let x = true;', expected: ['LET', 'IDENT', 'ASSIGN', 'TRUE', 'SEMICOLON'] },
    {
      input: 'let result = add(five, ten);',
      expected: ['LET', 'IDENT', 'ASSIGN', 'IDENT', 'LPAREN', 'IDENT', 'COMMA', 'IDENT', 'RPAREN', 'SEMICOLON']
    }
  ]

  for (const test of tests) {
    const { getNextToken } = lexer(test.input)
    for (const token of test.expected) {
      expect(getNextToken().type).toBe(token)
    }
  }
})
