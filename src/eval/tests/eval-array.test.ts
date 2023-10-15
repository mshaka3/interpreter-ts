import { expect, test } from 'vitest'
import { testEval, testIntegerValue, testNullValue } from './helpers'
import { isArrayValue, isIntegerValue } from '../types'

test('test eval array', () => {
  const input = '[1, 2 * 2, 3 + 3]'
  const evaluated = testEval(input)

  expect(evaluated.type()).toEqual('ARRAY')
  if (isArrayValue(evaluated)) {
    const elements = evaluated.elements
    expect(elements.length).toEqual(3)
    if (elements.length > 3) {
      expect(testIntegerValue(elements[0], 1)).toBe(true)
      expect(testIntegerValue(elements[1], 4)).toBe(true)
      expect(testIntegerValue(elements[2], 6)).toBe(true)
    }
  }
})

test('test eval index array', () => {
  const tests = [
    { input: '[1, 2, 3][0]', expected: 1 },
    { input: '[1, 2, 3][1]', expected: 2 },
    { input: '[1, 2, 3][2]', expected: 3 },
    { input: '[1, 2, 3][1 + 1];', expected: 3 },
    { input: 'let myArray = [1, 2, 3]; myArray[2];', expected: 3 },
    { input: 'let myArray = [1, 2, 3]; myArray[0] + myArray[1] + myArray[2];', expected: 6 },
    { input: 'let myArray = [1, 2, 3]; let i = myArray[0]; myArray[i]', expected: 2 },
    { input: '[1, 2, 3][3]', expected: null },
    { input: '[1, 2, 3][-1]', expected: null }
  ]

  for (const test of tests) {
    const evaluated = testEval(test.input)

    if (isIntegerValue(evaluated) && test.expected) {
      expect(evaluated.type()).toEqual('INTEGER')
      expect(testIntegerValue(evaluated, test.expected)).toBe(true)
    } else {
      expect(evaluated.type()).toEqual('NULL')
      expect(testNullValue(evaluated)).toBe(true)
    }
  }
})
