export type UnionStr<T> = T | (string & {})

export type ObjectToUnion<T extends {}> = boolean | UnionStr<keyof T>[] | T

export type KeysAddPrefix<T extends {}, P extends string> = {
  [K in keyof T as `${P}${Capitalize<K & string>}`]: T[K]
}
