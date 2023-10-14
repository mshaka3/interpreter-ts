import { EnvireonmentObject, Value } from '../types'

export function NewEnvireonment(outer?: EnvireonmentObject): EnvireonmentObject {
  var store = new Map<string, Value>()

  function get(name: string): Value | undefined {
    const value = this.store.get(name)

    if (!value && outer) {
      return outer.get(name)
    }

    return value
  }

  function set(name: string, value: Value) {
    this.store.set(name, value)
  }

  return { store, get, set, outer }
}
