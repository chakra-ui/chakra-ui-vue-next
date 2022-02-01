/**
 * Credit:
 * Adapted from the good folks at @headlessui/vue
 */
export function match<T extends string | number = string, U = unknown>(
  value: T,
  lookup: Record<T, U | ((...args: any[]) => U)>,
  ...args: any[]
): U {
  if (value in lookup) {
    let returnValue = lookup[value]
    return typeof returnValue === "function"
      ? returnValue(...args)
      : returnValue
  }

  let error = new Error(
    `Tried to handle "${value}" but there is no handler defined. Only defined handlers are: ${Object.keys(
      lookup
    )
      .map((key) => `"${key}"`)
      .join(", ")}.`
  )
  /** @ts-expect-error "captureStackTrace" not in default Error constuctor typee  */
  if (Error?.captureStackTrace) Error.captureStackTrace(error, match)
  throw error
}
