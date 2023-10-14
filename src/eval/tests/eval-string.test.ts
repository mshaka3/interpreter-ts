import { expect, test } from 'vitest'
import { testEval } from './helpers'
import { isStringValue } from '../types'

test('test eval string', () => {
  const tests = [
    { input: '"hello world";', expected: 'hello world' },
    { input: `"Hello" + " " + "World!"`, expected: 'Hello World!' }
  ]

  for (const test of tests) {
    const evaluated = testEval(test.input)
    expect(evaluated.type()).toEqual('STRING')

    if (isStringValue(evaluated)) {
      expect(evaluated.value).toEqual(test.expected)
    }
  }
})
