import { expect, test } from 'vitest'

import { testBooleanValue, testEval } from './helpers'

test('test eval bang expreission', () => {
  const tests = [
    { input: '!true', expected: false },
    { input: '!false', expected: true },
    { input: '!5', expected: false },
    { input: '!!true', expected: true },
    { input: '!!false', expected: false },
    { input: '!!5', expected: true }
  ]

  for (const test of tests) {
    const evaluated = testEval(test.input)
    expect(testBooleanValue(evaluated, test.expected)).toBe(true)
  }
})
