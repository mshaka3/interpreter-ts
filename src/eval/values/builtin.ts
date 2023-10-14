import { BuiltinFunction, ValueType, BuiltinValue } from '../types'

export function Builtin(fn: BuiltinFunction): BuiltinValue {
  function type(): ValueType {
    return 'BUILTIN_VALUE'
  }

  function inspect(): string {
    return 'builtin function'
  }

  return { inspect, type, fn }
}
