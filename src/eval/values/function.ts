import { BlockStatment, Identifier } from '../../parser/types'
import { EnvireonmentObject, FunctionValue, ValueType } from '../types'

export function Function(parameters: Identifier[], body: BlockStatment, env: EnvireonmentObject): FunctionValue {
  function type(): ValueType {
    return 'FUNCTION_VALUE'
  }

  function inspect(): string {
    const params = parameters.reduce((str, parm) => (str += parm.print()), '')
    return 'fn (' + params + ') {\n' + body.print() + '\n}'
  }

  return { body, parameters, env, type, inspect }
}
