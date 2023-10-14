import { Identifier } from '../../parser/types'
import { EnvireonmentObject, Value } from '../types'
import { Error } from '../values/error'

export function evalIdenitifier(node: Identifier, env: EnvireonmentObject): Value {
  const val = env.get(node.value)

  if (!val) {
    return Error(`identifier not found: ${node.value}`)
  }

  return val
}
