import { UnionStringArray, omit } from "@chakra-ui/utils"
import { keyframes, injectGlobal } from "@emotion/css"
import { PropType } from "vue"
import { ThemingProps } from "./system.types"

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.[element]` syntax.
 *
 * Adapted from React package
 */
export const domElements = [
  "a",
  "b",
  "article",
  "aside",
  "blockquote",
  "button",
  "caption",
  "cite",
  "circle",
  "code",
  "dd",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "iframe",
  "img",
  "input",
  "kbd",
  "label",
  "li",
  "mark",
  "main",
  "nav",
  "ol",
  "p",
  "path",
  "pre",
  "q",
  "rect",
  "s",
  "svg",
  "section",
  "select",
  "strong",
  "small",
  "span",
  "sub",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul",
] as const

export type DOMElements = UnionStringArray<typeof domElements>

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export type ToPropType<T> = {
  [P in keyof T]?: PropType<T[P]>
}

export { keyframes, injectGlobal }
