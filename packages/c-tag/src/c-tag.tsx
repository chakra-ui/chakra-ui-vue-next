/**
 * Hey! Welcome to @chakra-ui/vue-next CTag
 *
 * Tag component
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-tag
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/master/packages/c-tag/src/c-tag/c-tag.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import { h, defineComponent, PropType, DefineComponent, computed } from "vue"
import {
  chakra,
  ChakraProps,
  ComponentWithProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { CIcon } from "@chakra-ui/c-icon"
import { filterUndefined } from "@chakra-ui/utils"
import { getValidChildren, vueThemingProps } from "@chakra-ui/vue-utils"
interface TagOptions {
  variantColor?: string
}

export interface CTagProps
  extends ChakraProps,
    TagOptions,
    ThemingProps<"CTag"> {}

export interface CTagLabelProps
  extends ChakraProps,
    ThemingProps<"CTagLabel"> {}

export const CTagLabel: ComponentWithProps<CTagLabelProps> = defineComponent({
  props: {
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
    const styles = useMultiStyleConfig("Tag", themingProps)

    return () => (
      <chakra.span __css={styles.value.label} noOfLines={1} {...attrs}>
        {() => getValidChildren(slots)}
      </chakra.span>
    )
  },
})

export interface CTagCloseButtonProps
  extends ChakraProps,
    ThemingProps<"CTagCloseButton"> {
  isDisabled?: boolean
}

const TagProps = {
  variantColor: String as PropType<TagOptions["variantColor"]>,
  ...vueThemingProps,
}

export const CTagLeftIcon: DefineComponent = defineComponent({
  setup(props, { attrs }) {
    return () => <CIcon {...attrs} marginEnd="0.5rem" />
  },
})

export const CTagRightIcon: DefineComponent = defineComponent({
  setup(props, { attrs }) {
    return () => <CIcon {...attrs} marginStart="0.5rem" />
  },
})

const CloseButtonProps = {
  isDisabled: Boolean as PropType<CTagCloseButtonProps["isDisabled"]>,
  ...vueThemingProps,
}

export const CTagCloseButton: ComponentWithProps<CTagCloseButtonProps> =
  defineComponent({
    props: CloseButtonProps,
    setup(props, { slots, attrs }) {
      const themingProps = computed<ThemingProps>(() =>
        filterUndefined({
          colorScheme: props.colorScheme,
          variant: props.variant,
          size: props.size,
          styleConfig: props.styleConfig,
        })
      )

      const styles = useMultiStyleConfig("Tag", themingProps)

      const buttonStyles: SystemStyleObject = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "0",
        ...styles.value.closeButton,
      }

      return () => (
        <chakra.button
          aria-label="close"
          type="button"
          __css={buttonStyles}
          {...attrs}
          disabled={props?.isDisabled}
        >
          {slots.default
            ? () => getValidChildren(slots)
            : () => <CIcon name="close" />}
        </chakra.button>
      )
    },
  })

export const CTag: ComponentWithProps<CTagProps> = defineComponent({
  props: TagProps,
  setup(props, { slots, attrs }) {
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )
    const styles = useMultiStyleConfig("Tag", themingProps)
    const tagContainerStyles = computed<SystemStyleObject>(() => ({
      ...styles.value?.container,
      bg: props.variantColor ?? styles.value?.container?.bg,
    }))

    return () => (
      <chakra.span
        __label="tag"
        aria-label="tag"
        __css={tagContainerStyles.value}
        {...attrs}
      >
        {() => getValidChildren(slots)}
      </chakra.span>
    )
  },
})
