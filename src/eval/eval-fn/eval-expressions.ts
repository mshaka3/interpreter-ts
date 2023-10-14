import { evaluate } from '..'
import { Expression } from '../../parser/types'
import { EnvireonmentObject, Value, isErrorValue } from '../types'

export function evalExpressions(expressions: Expression[], env: EnvireonmentObject): Value[] {
  var result: Value[] = []

  for (const exp of expressions) {
    const evalValue = evaluate(exp, env)
    if (isErrorValue(evalValue)) {
      return [evalValue]
    }

    result.push(evalValue)
  }

  return result
}
