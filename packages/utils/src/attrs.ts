import camelCase from "lodash.camelcase"
import { StyleObjectOrFn, isStyleProp } from "@chakra-ui/styled-system"
import { HTMLAttributes } from "vue"
import memoize from "lodash.memoize"

export type StyleAndHTMLAttibutes = StyleObjectOrFn &
  Record<string, string | number | boolean | unknown> &
  HTMLAttributes

interface ExtractedStyleAttrs {
  styles: Partial<StyleAndHTMLAttibutes>
  attrs: Partial<HTMLAttributes>
}

const camelCaseCache: any = {}
const _isStyledProp = memoize((attr) => isStyleProp(attr))

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
    let _attr: string
    if (camelCaseCache[prop]) {
      _attr = camelCaseCache[prop]
    } else {
      _attr = `${prop.startsWith("_") ? "_" : ""}${camelCase(prop)}`
      camelCaseCache[prop] = _attr
    }

    if (_isStyledProp(_attr)) {
      styles[_attr] = styleProps[prop]
    } else if (_isStyledProp(prop)) {
      styles[_attr] = styleProps[prop]
    } else {
      // @ts-expect-error Not sure how to cast returned string into typeof key of U
      attrs[prop as keyof U] = styleProps[prop]
    }
  }

  return {
    styles,
    attrs,
  }
}
