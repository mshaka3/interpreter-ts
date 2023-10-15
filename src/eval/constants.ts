import { BuiltinValue, Value, isArrayValue, isStringValue } from './types'
import { ArrayVal } from './values/array'
import { Boolean } from './values/boolean'
import { Builtin } from './values/builtin'
import { Error } from './values/error'
import { Integer } from './values/integer'
import { Null } from './values/null'

export const NULL = Null()
export const TRUE = Boolean(true)
export const FALSE = Boolean(false)

function lenFunction(args: Value[]): Value {
  if (args.length != 1) {
    return Error(`wrong number of arguments. got=${args.length}, want=1`)
  }
  const arg = args[0]
  if (isArrayValue(arg)) {
    return Integer(BigInt(arg.elements.length))
  }
  if (isStringValue(arg)) {
    return Integer(BigInt(arg.value.length))
  }

  return Error(`argument to 'len' not supported, got ${arg.type()}`)
}

function firstFunction(args: Value[]): Value {
  if (args.length != 1) {
    return Error(`wrong number of arguments. got=${args.length}, want=1`)
  }

  const arg = args[0]
  if (isArrayValue(arg)) {
    return arg.elements.length > 0 ? arg.elements[0] : NULL
  }

  return Error(`argument to 'first' must be ARRAY, got ${arg.type()}`)
}

function lastFunction(args: Value[]): Value {
  if (args.length != 1) {
    return Error(`wrong number of arguments. got=${args.length}, want=1`)
  }

  const arg = args[0]
  if (isArrayValue(arg)) {
    return arg.elements.length > 0 ? arg.elements[arg.elements.length - 1] : NULL
  }

  return Error(`argument to 'last' must be ARRAY, got ${arg.type()}`)
}

function restFunction(args: Value[]): Value {
  if (args.length != 1) {
    return Error(`wrong number of arguments. got=${args.length}, want=1`)
  }

  const arg = args[0]
  if (isArrayValue(arg)) {
    return arg.elements.length > 0 ? ArrayVal([...arg.elements.slice(1)]) : NULL
  }

  return Error(`argument to 'rest' must be ARRAY, got ${arg.type()}`)
}

function pushFunction(args: Value[]): Value {
  if (args.length != 2) {
    return Error(`wrong number of arguments. got=${args.length}, want=2`)
  }

  const arg = args[0]
  if (isArrayValue(arg)) {
    return arg.elements.length > 0 ? ArrayVal([...arg.elements, args[1]]) : NULL
  }

  return Error(`argument to 'rest' must be ARRAY, got ${arg.type()}`)
}

export const BUILTINS = new Map<string, BuiltinValue>()
BUILTINS.set('len', Builtin(lenFunction))
BUILTINS.set('first', Builtin(firstFunction))
BUILTINS.set('last', Builtin(lastFunction))
BUILTINS.set('rest', Builtin(restFunction))
BUILTINS.set('push', Builtin(pushFunction))
