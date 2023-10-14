import { ReturnValue, Value, ValueType } from '../types'

export function ReturnValue(value: Value): ReturnValue {
  function inspect() {
    console.log('value type is:', value.type())
    return `${value.inspect()}`
  }

  function type(): ValueType {
    return 'RETURN_VALUE'
  }

  return { inspect, type, value }
}
