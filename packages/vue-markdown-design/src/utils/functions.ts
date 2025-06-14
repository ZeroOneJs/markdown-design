export function runFnWithOptions<T extends {}>(options: T | boolean, fn: (options?: T) => void) {
  if (!options) return
  options === true ? fn() : fn(options)
}
