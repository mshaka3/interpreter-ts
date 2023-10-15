import { NULL } from '../constants'
import { ArrayValue, IntegerValue, Value, isArrayValue, isIntegerValue } from '../types'
import { Error } from '../values/error'

export function evalIndexExpression(left: Value, index: Value): Value {
  if (isArrayValue(left) && isIntegerValue(index)) {
    return evalArrayIndexExpression(left, index)
  }

  return Error(`index operator not supported:${left.type()}`)
}

function evalArrayIndexExpression(left: ArrayValue, index: IntegerValue): Value {
  const idx = index.value
  const max = left.elements.length - 1

  if (idx < 0 || idx > max) {
    return NULL
  }

  return left.elements[Number(idx)]
}
