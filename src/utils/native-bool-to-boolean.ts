import { FALSE, TRUE } from '../constants'
import { BooleanValue } from '../eval/types'

export function nativeBoolToBooleanValue(input: boolean): BooleanValue {
  return input ? TRUE : FALSE
}
