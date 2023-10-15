import { ValueType, ArrayValue, Value } from '../types'

export function ArrayVal(elements: Value[]): ArrayValue {
  function inspect() {
    const elementStr = elements.map((elm) => elm.inspect())
    return '[' + elementStr.join(', ') + ']'
  }

  function type(): ValueType {
    return 'ARRAY'
  }

  return { type, inspect, elements }
}
