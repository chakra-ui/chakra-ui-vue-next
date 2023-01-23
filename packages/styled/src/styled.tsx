import clsx from "clsx"
import { mergeProps, SetupContext, h, Fragment } from "vue"
import { CSSInterpolation, serializeStyles } from "@emotion/serialize"
import { extractStyleAttrs } from "@chakra-ui/vue-utils"
import {
  getRegisteredStyles,
  insertStyles,
  SerializedStyles,
} from "@emotion/utils"
import camelCase from "lodash.camelcase"
import { CreateStyled, PrivateStyledComponent, StyledOptions } from "./types"
import { defaultCache, __unusafe_useEmotionCache } from "./cache"
import { useEmotionTheme } from "./theming"
import memoize from "lodash.memoize"

const ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`

let isBrowser = typeof document !== "undefined"

const Noop = () => null
const camelCaseCache: any = {}

const _camelCase = memoize((key) => camelCase(key))

// @ts-ignore
export const createStyled: CreateStyled = (
  tag: any,
  options?: StyledOptions
) => {
  if (process.env.NODE_ENV !== "production") {
    if (tag === undefined) {
      throw new Error(
        "You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it."
      )
    }
  }

  const isReal = tag.__emotion_real === tag
  const baseTag = (isReal && tag.__emotion_base) || tag

  let identifierName: string
  let targetClassName: string
  if (options !== undefined) {
    identifierName = options.__label as string
    targetClassName = options.target as string
  }

  // Extract arguments from template literals
  return function <Props>(): PrivateStyledComponent<Props> {
    let args = arguments
    let styles =
      isReal && tag.__emotion_styles !== undefined
        ? tag.__emotion_styles.slice(0)
        : []

    if (identifierName !== undefined) {
      styles.push(`label:${identifierName};`)
    }
    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args)
    } else {
      if (process.env.NODE_ENV !== "production" && args[0][0] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR)
      }
      styles.push(args[0][0])
      let len = args.length
      let i = 1
      for (; i < len; i++) {
        if (process.env.NODE_ENV !== "production" && args[0][i] === undefined) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR)
        }
        styles.push(args[i], args[0][i])
      }
    }

    function StyledComponent(
      props: any,
      { attrs, expose, slots }: SetupContext
    ) {
      const cache = __unusafe_useEmotionCache(defaultCache)
      const { as, ...restAttrs } = attrs || {}

      let mergedProps = { ...props, ...restAttrs }

      let className = options?.__label
        ? `${cache.key}-${options?.__label || typeof tag === "string" ? tag : "element"
        } `
        : ``
      const FinalTag = as || baseTag
      const classInterpolations = [] as string[]

      mergedProps = {}
      for (let key in props) {
        if (camelCaseCache[key]) {
          mergedProps[key] = camelCaseCache[key]
        } else {
          const attr = _camelCase(key)
          camelCaseCache[attr] = props[key]
          mergedProps[attr] = props[key]
        }
      }

      if (props.theme == null) {
        mergedProps.theme = useEmotionTheme(undefined)
      }

      mergedProps = mergeProps({
        ...attrs,
        ...mergedProps,
      })

      if (attrs.class) {
        className += getRegisteredStyles(
          cache.registered,
          classInterpolations,
          clsx(attrs.class as string)
        )
      }

      const serialized = serializeStyles(
        styles.concat(classInterpolations),
        cache.registered,
        mergedProps
      )

      const rules = insertStyles(
        cache,
        serialized,
        typeof FinalTag === "string"
      )

      className += `${cache.key}-${serialized.name}`
      if (targetClassName !== undefined) {
        className += ` ${targetClassName}`
      }

      const { attrs: htmlAttrs } = extractStyleAttrs(mergedProps)
      const vnodeProps = {
        ...htmlAttrs,
        class: className,
      }
      // @ts-expect-error
      delete vnodeProps?.theme

      const StyledElement = <FinalTag {...vnodeProps}>{slots}</FinalTag>

      let possiblyStyleElement = <Noop />
      if (!isBrowser && rules !== undefined) {
        let serializedNames = serialized.name
        let next = serialized.next
        while (next !== undefined) {
          serializedNames += " " + next.name
          next = next.next
        }
        possiblyStyleElement = (
          <style
            {...{
              [`data-emotion`]: `${cache.key} ${serializedNames}`,
              nonce: cache.sheet.nonce,
            }}
          >
            {rules}
          </style>
        )
      }
      return (
        <>
          {possiblyStyleElement}
          {StyledElement}
        </>
      )
    }

    StyledComponent._name =
      identifierName === undefined
        ? `Styled${typeof baseTag === "string" ? baseTag : baseTag.name || "Component"
        }`
        : identifierName

    StyledComponent.__emotion_real = StyledComponent
    StyledComponent.__emotion_base = baseTag
    StyledComponent.__emotion_styles = styles

    Object.defineProperty(StyledComponent, "toString", {
      value() {
        if (
          targetClassName === undefined &&
          process.env.NODE_ENV !== "production"
        ) {
          return "NO_COMPONENT_SELECTOR"
        }

        return `.${targetClassName}`
      },
    })

    StyledComponent.withComponent = (
      nextTag: any,
      nextOptions: StyledOptions
    ) => {
      return createStyled(
        nextTag,
        nextOptions === undefined
          ? options
          : { ...(options || {}), ...nextOptions }
        // Here we use apply to make TypeScript happy. Otherwise we would use spread operator
      ).apply(null, styles)
    }

    // @ts-ignore
    return StyledComponent
  }
}

export function css(
  ...args: Array<CSSInterpolation | TemplateStringsArray>
): SerializedStyles {
  return serializeStyles(args, {})
}
