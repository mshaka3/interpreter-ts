import { StringValue, ValueType } from '../types'

export function String(value: string): StringValue {
  function type(): ValueType {
    return 'STRING'
  }

  function inspect() {
    return value
  }

  return { value, inspect, type }
}
