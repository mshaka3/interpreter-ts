import { expect, test } from 'vitest'
import { testEval } from './helpers'
import { isFunctionValue } from '../types'
import { isBlockStatment } from '../../parser/types'

test('test function eval', () => {
  const test = 'function(x) { x + 2; };'

  const evalValue = testEval(test)

  expect(isFunctionValue(evalValue)).toBe(true)

  if (isFunctionValue(evalValue)) {
    expect(evalValue.parameters.length).toEqual(1)
    if (evalValue.parameters.length > 0) {
      expect(evalValue.parameters[0].print()).toEqual('x')
    }

    expect(isBlockStatment(evalValue.body)).toBe(true)
    if (isBlockStatment(evalValue.body)) {
      expect(evalValue.body.print()).toEqual('(x + 2)')
    }
  }
})
