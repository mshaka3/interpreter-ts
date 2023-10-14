import { BlockStatment, Identifier } from '../parser/types'

export type ValueType =
  | 'INTEGER'
  | 'BOOLEAN'
  | 'STRING'
  | 'RETURN_VALUE'
  | 'NULL'
  | 'ERROR_VALUE'
  | 'FUNCTION_VALUE'
  | 'BUILTIN_VALUE'

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

export interface StringValue extends Value {
  value: string
}

export interface NullValue extends Value {}

export interface ReturnValue extends Value {
  value: Value
}

export interface ErrorValue extends Value {
  message: string
}

export interface BuiltinValue extends Value {
  fn: BuiltinFunction
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

export type BuiltinFunction = (args: Value[]) => Value
export type MonkeyValue = IntegerValue | BooleanValue | ReturnValue | NullValue | ErrorValue

// TYPE GUARDS

export function isIntegerValue(value: Value): value is IntegerValue {
  return value.type() == 'INTEGER'
}

export function isBooleanValue(value: Value): value is BooleanValue {
  return value.type() == 'BOOLEAN'
}

export function isStringValue(value: Value): value is StringValue {
  return value.type() == 'STRING'
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

export function isBuiltinValue(value: Value): value is BuiltinValue {
  return value.type() == 'BUILTIN_VALUE'
}
