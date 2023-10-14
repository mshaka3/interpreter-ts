import { BooleanValue, ValueType } from '../types'

export function Boolean(value: boolean): BooleanValue {
  function inspect() {
    return `${value}`
  }

  function type(): ValueType {
    return 'BOOLEAN'
  }

  return { value, type, inspect }
}
