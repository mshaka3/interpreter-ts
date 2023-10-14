import { BlockStatment, Identifier } from '../parser/types'

export type ValueType = 'INTEGER' | 'BOOLEAN' | 'RETURN_VALUE' | 'NULL' | 'ERROR_VALUE' | 'FUNCTION_VALUE'

export interface Value {
  type: () => ValueType
  inspect: () => string
}

export interface IntegerValue extends Value {
  value: bigint
}

export interface BooleanValue extends Value {
  value: boolean
}

export interface NullValue extends Value {}

export interface ReturnValue extends Value {
  value: Value
}

export interface ErrorValue extends Value {
  message: string
}

export interface FunctionValue extends Value {
  parameters: Identifier[]
  body: BlockStatment
  env: EnvireonmentObject
}

export interface EnvireonmentObject {
  store: Map<string, Value>
  outer?: EnvireonmentObject
  get: (name: string) => Value | undefined
  set: (name: string, value: Value) => void
}

export type MonkeyValue = IntegerValue | BooleanValue | ReturnValue | NullValue | ErrorValue

// TYPE GUARDS

export function isIntegerValue(value: Value): value is IntegerValue {
  return value.type() == 'INTEGER'
}

export function isBooleanValue(value: Value): value is BooleanValue {
  return value.type() == 'BOOLEAN'
}

export function isReturnValue(value: Value): value is ReturnValue {
  return value.type() == 'RETURN_VALUE'
}

export function isNullValue(value: Value): value is NullValue {
  return value.type() == 'NULL'
}

export function isErrorValue(value: Value): value is ErrorValue {
  return value.type() == 'ERROR_VALUE'
}

export function isFunctionValue(value: Value): value is FunctionValue {
  return value.type() == 'FUNCTION_VALUE'
}
