import { expect, test } from 'vitest'
import { testEval, testIntegerValue } from './helpers'

test('test eval function call', () => {
  const tests = [
    { input: 'let identity = function(x) { x; }; identity(5);', expected: 5 },
    { input: 'let identity = function(x) { return x; }; identity(5);', expected: 5 },
    { input: 'let double = function(x) { x * 2; }; double(5);', expected: 10 },
    { input: 'let add = function(x, y) { x + y; }; add(5, 5);', expected: 10 },
    { input: 'let add = function(x, y) { x + y; }; add(5 + 5, add(5, 5));', expected: 20 },
    { input: 'function(x) { x; }(5)', expected: 5 }
  ]

  for (const test of tests) {
    expect(testIntegerValue(testEval(test.input), test.expected)).toBe(true)
  }
})
