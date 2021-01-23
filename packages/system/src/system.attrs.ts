import kebabCase from 'lodash.kebabcase'
import camelCase from 'lodash.camelcase'
import { propNames, StyleObjectOrFn } from '@chakra-ui/styled-system'
import { HTMLAttributes } from 'vue'

type StyleAndHTMLAttibutes = StyleObjectOrFn &
  Record<string, string | number | boolean | unknown> &
  HTMLAttributes

export const allStylePropNames = propNames.reduce(
  (acc: StyleAndHTMLAttibutes, curr: string) => {
    acc[curr] = true
    acc[kebabCase(curr)] = true
    return acc
  },
  {}
)

interface ExtractedStyleAttrs {
  styles: Partial<StyleAndHTMLAttibutes>
  attrs: Partial<HTMLAttributes>
}

/** Extracts CSS style properties and HTML attributes from merged component attributs */
export const extractStyleAttrs = <
  T extends StyleAndHTMLAttibutes,
  U extends Partial<HTMLAttributes> | Record<string, string | number | boolean>
>(
  styleProps: T
): ExtractedStyleAttrs => {
  const styles = {} as T
  const attrs = {} as U

  for (const prop in styleProps) {
    // TODO: Cache style prop names so that that camelCases is only computed once for eahc property
    const _attr = camelCase(prop)
    if (_attr in allStylePropNames) {
      // @ts-expect-error Not sure how to cast returned string into typeof key of U
      styles[_attr] = styleProps[prop]
    } else {
      // @ts-expect-error Not sure how to cast returned string into typeof key of U
      attrs[prop] = styleProps[prop]
    }
  }

  return {
    styles,
    attrs,
  }
}
