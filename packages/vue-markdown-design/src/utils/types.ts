import type { ScrollAction } from 'compute-scroll-into-view'

export type UnionStr<T> = T | (string & {})

export type ObjectToUnion<T extends {}> = boolean | UnionStr<keyof T>[] | T

export type KeysAddPrefix<T extends {}, P extends string> = {
  [K in keyof T as `${P}${Capitalize<K & string>}`]: T[K]
}

export type Offset =
  | UnionStr<ScrollLogicalPosition>
  | number
  | ((scrollAction: ScrollAction) => number | undefined)
