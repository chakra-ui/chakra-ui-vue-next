/**
 * Hey! Welcome to @chakra-ui/vue-next CTag
 *
 * Tag component
 *
 * @see Docs     https://next.vue.chakra-ui.com/c-tag
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue-next/blob/main/packages/c-tag/src/c-tag/c-tag.ts
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2
 */

import {
  h,
  defineComponent,
  PropType,
  DefineComponent,
  computed,
  watchEffect,
} from "vue"
import {
  AnatomyParts,
  chakra,
  ChakraProps,
  createStylesContext,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { SystemStyleObject, ThemingProps } from "@chakra-ui/styled-system"
import { CIcon, createIconComponent } from "@chakra-ui/c-icon"
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

const [StylesProvider, useTagStyles] =
  createStylesContext<AnatomyParts.Tag>("CTag")

export const CTagLabel = defineComponent({
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

    const styles = useTagStyles()

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

export const CTagCloseIcon = defineComponent((_, attrs) => {
  return () => (
    <CIcon verticalAlign="inherit" viewBox="0 0 512 512" {...attrs}>
      <path
        fill="currentColor"
        d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
      />
    </CIcon>
  )
})

export const CTagCloseButton = defineComponent({
  props: CloseButtonProps,
  setup(props, { slots, attrs }) {
    const styles = useTagStyles()

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
        {slots.default ? () => getValidChildren(slots) : <CTagCloseIcon />}
      </chakra.button>
    )
  },
})

export const CTag = defineComponent({
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

    const styles = useMultiStyleConfig<AnatomyParts.Tag>(
      "Tag",
      themingProps.value
    )

    StylesProvider(styles)

    const tagContainerStyles = computed<SystemStyleObject>(() => ({
      display: "inline-flex",
      verticalAlign: "top",
      alignItems: "center",
      maxWidth: "100%",
      ...styles.value.container,
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
