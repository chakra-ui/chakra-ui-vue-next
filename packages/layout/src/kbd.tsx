import { vueThemingProps, extractStyleAttrs } from "@chakra-ui/vue-utils"
import {
  chakra,
  DOMElements,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { ThemingProps } from "@chakra-ui/styled-system"
import { computed, defineComponent, h, PropType } from "vue"
import { filterUndefined } from "@chakra-ui/utils"
import type * as CSS from "csstype"

export interface KbdProps extends HTMLChakraProps<"kbd">, ThemingProps<"Kbd"> {}

/**
 * Semantic component to render a keyboard shortcut
 * within an application.
 *
 * @example
 *
 * ```jsx
 * <CKbd>⌘ + T</CKbd>
 * ```
 *
 * @see Docs https://vue.chakra-ui.com/docs/data-display/kbd
 */
export const CKbd = defineComponent({
  name: "CKbd",
  props: {
    as: {
      type: [String, Object] as PropType<DOMElements>,
      default: "h2",
    },
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )
    const styles = useStyleConfig("Kbd", themingProps)

    return () => (
      <chakra.kbd
        __label="kbd"
        __css={{ fontFamily: "mono", ...styles.value }}
        {...attrs}
      >
        {slots}
      </chakra.kbd>
    )
  },
})
