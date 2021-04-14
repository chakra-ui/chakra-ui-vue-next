import {
  arrow,
  eventListeners,
  flip,
  offset,
  preventOverflow,
  popperGenerator,
  popperOffsets,
  computeStyles,
  applyStyles,
} from '@popperjs/core'
import {
  innerArrow,
  matchWidth,
  positionArrow,
  transformOrigin,
} from './modifiers'
import { getEventListenerOptions } from './utils'

/* -------------------------------------------------------------------------------------------------
  We're initializing our own `createPopper` function with our opinionated defaults to
  keep the bundle size low.

  @see https://popper.js.org/docs/v2/tree-shaking/
* -----------------------------------------------------------------------------------------------*/

const defaultModifiers = [
  eventListeners,
  popperOffsets,
  computeStyles,
  applyStyles,
]

export interface CreatePopperOptions {
  offset?: [x: number, y: number]
  gutter?: number
  preventOverflow?: boolean
  flip?: boolean
  matchWidth?: boolean
  boundary?: 'clippingParents' | 'scrollParent' | HTMLElement
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  eventListeners?: boolean | { scroll?: boolean; resize?: boolean }
  arrowPadding?: number
}

export function createPopperFn(options: CreatePopperOptions) {
  return popperGenerator({
    defaultOptions: {
      placement: 'bottom',
      strategy: 'absolute',
      modifiers: [],
    },
    defaultModifiers: [
      ...defaultModifiers,
      positionArrow,
      innerArrow,
      transformOrigin,
      {
        ...eventListeners,
        ...getEventListenerOptions(options.eventListeners),
      },
      {
        ...arrow,
        options: {
          padding: options.arrowPadding,
        },
      },
      {
        ...offset,
        options: {
          offset: options.offset ?? [0, options.gutter],
        },
      },
      {
        ...flip,
        enabled: !!options.flip,
        options: {
          padding: 8,
        },
      },
      {
        ...preventOverflow,
        enabled: !!options.preventOverflow,
        options: {
          boundary: options.boundary || 'clippingParents',
        },
      },
      {
        ...matchWidth,
        enabled: !!options.matchWidth,
      },
    ],
  })
}
