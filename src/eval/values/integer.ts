import { IntegerValue, ValueType } from '../types'

export function Integer(value: bigint): IntegerValue {
  function inspect() {
    return `${value}`
  }

  function type(): ValueType {
    return 'INTEGER'
  }

  return { inspect, type, value }
}
