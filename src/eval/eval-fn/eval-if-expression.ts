import { evaluate } from '..'
import { NULL } from '../../constants'
import { IFExpression } from '../../parser/types'
import { EnvireonmentObject, Value, isBooleanValue, isErrorValue, isNullValue } from '../types'

export function evalIfExpression(node: IFExpression, evn: EnvireonmentObject): Value {
  const condition = evaluate(node.condition, evn)

  if (isErrorValue(condition)) {
    return condition
  }

  if (isTruthy(condition)) {
    return evaluate(node.consequence, evn)
  } else if (node.alternative != undefined) {
    return evaluate(node.alternative, evn)
  }

  return NULL
}

function isTruthy(condition: Value): boolean {
  if (isBooleanValue(condition)) {
    return condition.value
  }
  if (isNullValue(condition)) {
    return false
  }

  return true
}
