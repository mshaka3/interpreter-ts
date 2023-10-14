import { NullValue, ValueType } from '../types'

export function Null(): NullValue {
  function type(): ValueType {
    return 'NULL'
  }

  function inspect() {
    return 'null'
  }

  return { inspect, type }
}
