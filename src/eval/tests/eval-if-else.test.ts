import { expect, test } from 'vitest'
import { testEval, testIntegerValue, testNullValue } from './helpers'

test('test eval if else expression', () => {
  const tests = [
    { input: 'if (true) { 10 }', expected: 10 },
    { input: 'if (false) { 10 }', expected: null },
    { input: 'if (1) { 10 }', expected: 10 },
    { input: 'if (1 < 2) { 10 }', expected: 10 },
    { input: 'if (1 > 2) { 10 }', expected: null },
    { input: 'if (1 > 2) { 10 } else { 20 }', expected: 20 },
    { input: 'if (1 < 2) { 10 } else { 20 }', expected: 10 }
  ]

  for (const test of tests) {
    const evaluated = testEval(test.input)

    if (test.expected != null) {
      expect(testIntegerValue(evaluated, test.expected)).toBe(true)
    } else {
      expect(testNullValue(evaluated)).toBe(true)
    }
  }
})
