import { fromPairs, isBoolean, isFunction, isString, mapKeys, upperFirst } from 'lodash'
import type { KeysAddPrefix, ObjectToUnion, Offset, UnionStr } from './types'
import type { ScrollAction } from 'compute-scroll-into-view'

const scrollLogicalPosition = new Set(['start', 'end', 'center', 'nearest'])
export function computeOffset(offset: Offset = 'start') {
  if (isString(offset) && scrollLogicalPosition.has(offset)) {
    return {
      block: offset as ScrollLogicalPosition,
      getOffset: () => 0
    }
  }
  return {
    block: 'start' as ScrollLogicalPosition,
    getOffset: (scrollAction: ScrollAction, isParent: boolean) => {
      if (isFunction(offset)) return offset(scrollAction) || 0
      // 如果 offset 是数值只设置离元素最近的滚动对象的偏移量
      return isParent ? Number(offset) : 0
    }
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
