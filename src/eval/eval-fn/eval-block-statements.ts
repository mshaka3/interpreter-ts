import { evaluate } from '..'
import { Value, EnvireonmentObject, isErrorValue, isReturnValue } from '../types'

import { Statement } from '../../parser/types'
import { Null } from '../values/null'

export function evalBlockStatement(stmts: Statement[], env: EnvireonmentObject): Value {
  var result = Null() // default value to avoid type errors

  for (const stmt of stmts) {
    result = evaluate(stmt, env)

    if (isReturnValue(result) || isErrorValue(result)) {
      return result
    }
  }

  return result
}
