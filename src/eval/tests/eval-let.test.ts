import { expect, test } from 'vitest'
import { testEval, testIntegerValue } from './helpers'

test('test eval let statements', () => {
  const tests = [
    { input: 'let a = 5; a;', expected: 5 },
    { input: 'let a = 5 * 5; a;', expected: 25 },
    { input: 'let a = 5; let b = a; b;', expected: 5 },
    { input: 'let a = 5; let b = a; let c = a + b + 5; c;', expected: 15 }
  ]

  for (const test of tests) {
    expect(testIntegerValue(testEval(test.input), test.expected)).toBe(true)
  }
})
