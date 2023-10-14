import { evaluate } from '..'
import { EnvireonmentObject, FunctionValue, Value, isBuiltinValue, isFunctionValue, isReturnValue } from '../types'
import { NewEnvireonment } from '../values/envireonment'
import { Error } from '../values/error'

export function evalCallFunction(func: Value, args: Value[]): Value {
  if (isFunctionValue(func)) {
    const extendEnv = extendFunctionEnv(func, args)
    const evaluated = evaluate(func.body, extendEnv)
    return unwrapReturnValue(evaluated)
  }

  if (isBuiltinValue(func)) {
    return func.fn(args)
  }

  return Error(`not a function: ${func.type()}`)
}

function extendFunctionEnv(func: FunctionValue, args: Value[]): EnvireonmentObject {
  const env = NewEnvireonment(func.env)

  for (var i = 0; i < func.parameters.length; i++) {
    env.set(func.parameters[i].value, args[i])
  }

  return env
}

function unwrapReturnValue(returnValue: Value): Value {
  if (isReturnValue(returnValue)) {
    return returnValue.value
  }

  return returnValue
}
