/**
 * Hey! Welcome to @chakra-ui/vue-next CSkipNav
 *
 * My component description
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-skip-nav
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-skip-nav/src/c-skip-nav/c-skip-nav.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent } from "vue"
import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
  SystemStyleObject,
  useStyleConfig,
} from "@chakra-ui/vue-system"
import { CBox } from "@chakra-ui/vue-next"

const FALLBACK_ID = "chakra-skip-nav"

export interface CSkipNavLinkProps extends HTMLChakraProps<"a"> {}

export const CSkipNavLink: ComponentWithProps<DeepPartial<CSkipNavLinkProps>> =
  defineComponent({
    name: "CSkipNavLink",
    props: {
      id: {
        type: String,
        default: FALLBACK_ID,
      },
    },
    setup(props, { slots, attrs }) {
      function getBaseStyles(styles: any): SystemStyleObject {
        return {
          userSelect: "none",
          border: "0",
          borderRadius: "md",
          fontWeight: "semibold",
          height: "1px",
          width: "1px",
          margin: "-1px",
          padding: "0",
          outline: "0",
          overflow: "hidden",
          position: "absolute",
          clip: "rect(0 0 0 0)",
          ...styles,
          _focus: {
            clip: "auto",
            width: "auto",
            height: "auto",
            boxShadow: "outline",
            padding: "1rem",
            position: "fixed",
            top: "1.5rem",
            insetStart: "1.5rem",
            ...styles["_focusVisible"],
          },
        }
      }

      const styles = useStyleConfig("SkipLink", props)

      return () => {
        return h(
          chakra("a", {
            __css: {
              ...getBaseStyles(styles.value),
            },
          }),
          {
            ...attrs,
            href: `#${props.id}`,
          },
          slots
        )
      }
    },
  })

export interface CSkipNavContentProps extends HTMLChakraProps<"div"> {}

export const CSkipNavContent: ComponentWithProps<
  DeepPartial<CSkipNavContentProps>
> = defineComponent({
  name: "CSkipNavContent",
  props: {
    id: {
      type: String,
      default: FALLBACK_ID,
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      return h(
        chakra(CBox),
        {
          ...attrs,
          id: props.id,
          tabIndex: "-1",
          "data-testid": FALLBACK_ID,
        },
        slots
      )
    }
  },
})
