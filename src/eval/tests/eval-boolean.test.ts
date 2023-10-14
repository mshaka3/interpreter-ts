import { expect, test } from 'vitest'
import { testBooleanValue, testEval } from './helpers'

test('test eval boolean experssion', () => {
  const tests = [
    { input: 'true', expected: true },
    { input: 'false', expected: false },
    { input: '1 < 2', expected: true },
    { input: '1 > 2', expected: false },
    { input: '1 > 1', expected: false },
    { input: '1 < 1', expected: false },
    { input: '1 == 1', expected: true },
    { input: '1 != 1', expected: false },
    { input: '1 == 2', expected: false },
    { input: '1 != 2', expected: true },
    { input: 'true == true', expected: true },
    { input: 'false == false', expected: true },
    { input: 'true == false', expected: false },
    { input: 'true != false', expected: true },
    { input: 'false != true', expected: true },
    { input: '(1 < 2) == true', expected: true },
    { input: '(1 < 2) == false', expected: false },
    { input: '(1 > 2) == true', expected: false },
    { input: '(1 > 2) == false', expected: true }
  ]

  for (const test of tests) {
    const evaluated = testEval(test.input)
    expect(testBooleanValue(evaluated, test.expected)).toBe(true)
  }
})
