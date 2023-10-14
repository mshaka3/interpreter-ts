import { Identifier } from '../../parser/types'
import { BUILTINS } from '../constants'
import { EnvireonmentObject, Value } from '../types'
import { Error } from '../values/error'

export function evalIdenitifier(node: Identifier, env: EnvireonmentObject): Value {
  const val = env.get(node.value)
  if (val) {
    return val
  }

  const builtin = BUILTINS.get(node.value)
  if (builtin) {
    return builtin
  }

  return Error(`identifier not found: ${node.value}`)
}
