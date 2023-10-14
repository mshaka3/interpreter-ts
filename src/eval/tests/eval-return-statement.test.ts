import { expect, test } from 'vitest'
import { testEval, testIntegerValue } from './helpers'

test('test return statement', () => {
  const tests = [
    { input: 'return 10;', expected: 10 },
    { input: 'return 10; 9;', expected: 10 },
    { input: 'return 2 * 5; 9;', expected: 10 },
    { input: '9; return 2 * 5; 9;', expected: 10 },
    { input: 'if (10 > 1) { if (10 > 1) {return 10;} return 1; }', expected: 10 }
  ]

  for (const test of tests) {
    const evaluated = testEval(test.input)
    expect(testIntegerValue(evaluated, test.expected)).toBe(true)
  }
})
