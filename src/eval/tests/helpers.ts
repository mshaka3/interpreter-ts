import { evaluate } from '..'
import { lexer } from '../../lexer'
import { parser } from '../../parser'

import { Value, isBooleanValue, isIntegerValue, isNullValue } from '../types'
import { NewEnvireonment } from '../values/envireonment'

export function testEval(input: string) {
  const l = lexer(input)
  const p = parser(l)

  const program = p.parseProgram()
  const env = NewEnvireonment()

  return evaluate(program, env)
}

export function testIntegerValue(value: Value, expected: number): boolean {
  if (!isIntegerValue(value)) {
    console.error('Value is not Integer. got', value.inspect())
    return false
  }

  if (value.value != BigInt(expected)) {
    console.error('Value:', value, 'is not equal expected:', expected)
    return false
  }

  return true
}

export function testBooleanValue(value: Value, expected: boolean): boolean {
  if (!isBooleanValue(value)) {
    console.error('Value is not Boolean. got', value.inspect())
    return false
  }

  if (value.value != expected) {
    console.error('Value:', value, 'is not equal expected:', expected)
    return false
  }

  return true
}

export function testNullValue(value: Value): boolean {
  if (!isNullValue(value)) {
    console.error('Value type is not Null. got unknown type')
    return false
  }

  return true
}
