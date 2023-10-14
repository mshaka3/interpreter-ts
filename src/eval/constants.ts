import { BuiltinValue, Value, isStringValue } from './types'
import { Boolean } from './values/boolean'
import { Builtin } from './values/builtin'
import { Error } from './values/error'
import { Integer } from './values/integer'
import { Null } from './values/null'

export const NULL = Null()
export const TRUE = Boolean(true)
export const FALSE = Boolean(false)

function LenFunction(args: Value[]): Value {
  if (args.length != 1) {
    return Error(`wrong number of arguments. got=${args.length}, want=1`)
  }
  const arg = args[0]
  if (isStringValue(arg)) {
    return Integer(BigInt(arg.value.length))
  }

  return Error(`argument to 'len' not supported, got ${arg.type()}`)
}

export const BUILTINS = new Map<string, BuiltinValue>()
BUILTINS.set('len', Builtin(LenFunction))
