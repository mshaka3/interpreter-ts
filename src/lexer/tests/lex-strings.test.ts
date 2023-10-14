import { expect, test } from 'vitest'
import { lexer } from '..'

test('test lexing string', () => {
  const tests = [
    { input: '"foobar"', expected: 'foobar' },
    { input: '"foo bar"', expected: 'foo bar' }
  ]

  for (const test of tests) {
    const { getNextToken } = lexer(test.input)
    const token = getNextToken()

    expect(token.type).toEqual('STRING')
    expect(token.literal).toEqual(test.expected)
  }
})
