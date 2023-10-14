import { FALSE, TRUE } from '../constants'
import { Value, isBooleanValue, isIntegerValue, isNullValue } from '../types'
import { Error } from '../values/error'
import { Integer } from '../values/integer'

export function evalPrefixExpression(operator: string, right: Value): Value {
  if (operator == '!') {
    return evalBangOperatorExpression(right)
  }
  if (operator == '-') {
    return evalminusPrefixExpression(right)
  }

  return Error(`unknown operator: ${operator}`)
}

function evalBangOperatorExpression(right: Value): Value {
  if (isBooleanValue(right)) {
    return right.value == true ? FALSE : TRUE
  }

  if (isNullValue(right)) {
    return TRUE
  }

  return FALSE
}

function evalminusPrefixExpression(right: Value): Value {
  if (!isIntegerValue(right)) {
    return Error(`unknown operator: -${right.type()}`)
  }

  return Integer(-right.value)
}
