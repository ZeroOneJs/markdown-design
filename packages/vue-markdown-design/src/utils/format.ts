import { fromPairs, isBoolean, isNumber, mapKeys, upperFirst } from 'lodash'
import type { KeysAddPrefix, ObjectToUnion, UnionStr } from './types'

const scrollLogicalPosition = new Set(['start', 'end', 'center', 'nearest'])
export function computeOffset(offset: UnionStr<ScrollLogicalPosition> | number = 'start') {
  let block: ScrollLogicalPosition = 'start'
  let diff = 0
  if (isNumber(offset)) {
    diff = offset
  } else if (scrollLogicalPosition.has(offset)) {
    block = offset as ScrollLogicalPosition
  }
  return {
    block,
    diff
  }
}

export function keysAddPrefix<T extends {}, P extends string>(props: T, prefix: P) {
  return mapKeys(props, (_, key) => prefix + upperFirst(key)) as KeysAddPrefix<T, P>
}

function arrToObject<T extends {}>(arr: UnionStr<keyof T>[], value = true) {
  return fromPairs(arr.map((key) => [key, value])) as T
}
export function allToObject<T extends {}>(value: ObjectToUnion<T>, keys: (keyof T)[]): T {
  if (isBoolean(value)) {
    return arrToObject(keys, value)
  }
  if (Array.isArray(value)) {
    return arrToObject(value)
  }
  return value
}

export function addUnit(value: number) {
  return `${value}px`
}

export function createNamespace(str: string) {
  const name = `vmd-${str}`
  return {
    name,
    addPrefix: (str: string) => name + str
  }
}

export function allToArray<T>(value: T | T[]) {
  return Array.isArray(value) ? value : [value]
}
