export * from './function'
export * from './types'
export * from './dom'
export * from './array'
export * from './object'
export * from './number'
export * from './dom-query'
export * from './tabbable'
export * from './assertion'
export * from 'css-box-model'
export * from './responsive'

export function orient(options: {
  orientation?: 'vertical' | 'horizontal'
  vertical: any
  horizontal: any
}) {
  const { orientation, vertical, horizontal } = options
  if (!orientation) return {}
  return orientation === 'vertical' ? vertical : horizontal
}
