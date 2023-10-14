import { expect, test } from 'vitest'
import { testEval } from './helpers'
import { isErrorValue } from '../types'

test('test error handling', () => {
  const tests = [
    {
      input: '5 + true;',
      expected: 'type mismatch: INTEGER + BOOLEAN'
    },
    {
      input: '5 + true; 5;',
      expected: 'type mismatch: INTEGER + BOOLEAN'
    },
    {
      input: '-true',
      expected: 'unknown operator: -BOOLEAN'
    },
    {
      input: 'true + false;',
      expected: 'unknown operator: BOOLEAN + BOOLEAN'
    },
    {
      input: '5; true + false; 5',
      expected: 'unknown operator: BOOLEAN + BOOLEAN'
    },
    {
      input: 'if (10 > 1) { true + false; }',
      expected: 'unknown operator: BOOLEAN + BOOLEAN'
    },
    {
      input: 'if (10 > 1) {if (10 > 1) {return true + false;} return 1;}',
      expected: 'unknown operator: BOOLEAN + BOOLEAN'
    },
    {
      input: 'foobar',
      expected: 'identifier not found: foobar'
    }
  ]

  for (const test of tests) {
    const evaluated = testEval(test.input)
    const isErrorType = isErrorValue(evaluated)

    expect(isErrorType).toBe(true)

    if (isErrorType) {
      expect(evaluated.message).toEqual(test.expected)
    }
  }
})
