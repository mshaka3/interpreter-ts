import { nativeBoolToBooleanValue } from '../../utils/native-bool-to-boolean'
import { IntegerValue, StringValue, Value, isBooleanValue, isIntegerValue, isStringValue } from '../types'
import { Error } from '../values/error'
import { Integer } from '../values/integer'
import { String } from '../values/string-value'

export function evalInfixExpression(operator: string, left: Value, right: Value): Value {
  if (isIntegerValue(left) && isIntegerValue(right)) {
    return evalIntegerInfixExpression(operator, left, right)
  }

  if (isBooleanValue(left) && isBooleanValue(right)) {
    if (operator == '==') {
      return nativeBoolToBooleanValue(left.value == right.value)
    }
    if (operator == '!=') {
      return nativeBoolToBooleanValue(left.value != right.value)
    }
  }

  if (isStringValue(left) && isStringValue(right)) {
    return evalStringInfixExpression(operator, left, right)
  }

  if (left.type() != right.type()) {
    return Error(`type mismatch: ${left.type()} ${operator} ${right.type()}`)
  }

  return Error(`unknown operator: ${left.type()} ${operator} ${right.type()}`)
}

function evalStringInfixExpression(operator: string, left: StringValue, right: StringValue): Value {
  if (operator != '+') {
    return Error(`unknown operator: ${left.type()} ${operator} ${right.type()}`)
  }

  return String(left.value + right.value)
}

function evalIntegerInfixExpression(operator: string, left: IntegerValue, right: IntegerValue): Value {
  const leftVal = left.value
  const rightVal = right.value

  switch (operator) {
    case '+':
      return Integer(leftVal + rightVal)
    case '-':
      return Integer(leftVal - rightVal)
    case '*':
      return Integer(leftVal * rightVal)
    case '/':
      return Integer(leftVal / rightVal)
    case '<':
      return nativeBoolToBooleanValue(leftVal < rightVal)
    case '>':
      return nativeBoolToBooleanValue(leftVal > rightVal)
    case '==':
      return nativeBoolToBooleanValue(leftVal == rightVal)
    case '!=':
      return nativeBoolToBooleanValue(leftVal != rightVal)
    default:
      return Error(`unknown operator: ${left.type()} ${operator} ${right.type()}`)
  }
}
