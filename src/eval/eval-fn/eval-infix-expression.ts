import { nativeBoolToBooleanValue } from '../../utils/native-bool-to-boolean'
import { IntegerValue, Value, isBooleanValue, isIntegerValue } from '../types'
import { Error } from '../values/error'
import { Integer } from '../values/integer'

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

  if (left.type() != right.type()) {
    return Error(`type mismatch: ${left.type()} ${operator} ${right.type()}`)
  }

  return Error(`unknown operator: ${left.type()} ${operator} ${right.type()}`)
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
