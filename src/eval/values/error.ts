import { ErrorValue, ValueType } from '../types'

export function Error(message: string): ErrorValue {
  function type(): ValueType {
    return 'ERROR_VALUE'
  }

  function inspect() {
    return `Error: ${message}`
  }

  return { inspect, type, message }
}
