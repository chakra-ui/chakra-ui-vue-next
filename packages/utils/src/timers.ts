/** Debounce function */
export function debounce(func: Function, wait: number, immediate?: boolean) {
  let timeout: any
  return (...args: any[]) => {
    if (immediate && !timeout) func(...args)
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
