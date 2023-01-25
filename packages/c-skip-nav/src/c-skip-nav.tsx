/**
 * Hey! Welcome to @chakra-ui/vue-next CSkipNav
 *
 * Component tandem to allow users to skip navigation content
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-skip-nav
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-skip-nav/src/c-skip-nav.tsx
 * @see WebAIM   https://webaim.org/techniques/skipnav/
 */

import { defineComponent, computed, h } from "vue"
import {
  chakra,
  ComponentWithProps,
  HTMLChakraProps,
  SystemStyleObject,
  useStyleConfig,
} from "@chakra-ui/vue-system"
import { getValidChildren } from "@chakra-ui/vue-utils"

const FALLBACK_ID = "chakra-skip-nav"

export interface CSkipNavLinkProps extends HTMLChakraProps<"a"> {}

export const CSkipNavLink = defineComponent({
  name: "CSkipNavLink",
  props: {
    id: {
      type: String,
      default: FALLBACK_ID,
    },
  },
  setup(props, { slots, attrs }) {
    const styles = useStyleConfig(
      "SkipLink",
      computed(() => props as any)
    )

    const skipLinkStyles = computed<SystemStyleObject>(() => {
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
        ...styles.value,
        _focus: {
          clip: "auto",
          width: "auto",
          height: "auto",
          boxShadow: "outline",
          padding: "1rem",
          position: "fixed",
          top: "1.5rem",
          insetStart: "1.5rem",
        },
      }
    })

    return () => {
      return (
        <chakra.a href={`#${props.id}`} __css={skipLinkStyles.value} {...attrs}>
          {() => getValidChildren(slots)}
        </chakra.a>
      )
    }
  },
})

export interface CSkipNavContentProps extends HTMLChakraProps<"div"> {}

export const CSkipNavContent = defineComponent({
  name: "CSkipNavContent",
  props: {
    id: {
      type: String,
      default: FALLBACK_ID,
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      return (
        <chakra.div
          tabindex="-1"
          id={props.id}
          data-testid={FALLBACK_ID}
          {...attrs}
        >
          {() => getValidChildren(slots)}
        </chakra.div>
      )
    }
  },
})
