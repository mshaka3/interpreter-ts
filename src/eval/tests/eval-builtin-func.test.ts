import { expect, test } from 'vitest'
import { testEval, testIntegerValue } from './helpers'
import { isErrorValue } from '../types'

test('test eval built in functions', () => {
  const tests = [
    { input: `len("")`, expected: 0 },
    { input: `len("four")`, expected: 4 },
    { input: `len("hello world")`, expected: 11 },
    { input: `len(1)`, expected: `argument to 'len' not supported, got INTEGER` },
    { input: `len("one", "two")`, expected: 'wrong number of arguments. got=2, want=1' }
  ]

  for (const test of tests) {
    const evaluated = testEval(test.input)
    if (typeof test.expected == 'number') {
      expect(testIntegerValue(evaluated, test.expected)).toBe(true)
    } else {
      expect(evaluated.type()).toEqual('ERROR_VALUE')

      if (isErrorValue(evaluated)) {
        expect(evaluated.message).toEqual(test.expected)
      }
    }
  }
})
