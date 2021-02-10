import { h, defineComponent, PropType, computed, cloneVNode } from 'vue'
import {
  chakra,
  DOMElements,
  useStyleConfig,
  ThemingProps,
} from '@chakra-ui/vue-system'
import {
  SystemCSSProperties,
  SystemStyleObject,
} from '@chakra-ui/styled-system'
import { ComponentThemeConfig } from '@chakra-ui/vue-theme'
import { dataAttr, mergeWith } from '@chakra-ui/vue-utils'
import { useButtonGroup } from './button-group'

type ButtonTypes = 'button' | 'reset' | 'submit'

const props = {
  as: {
    type: String as PropType<DOMElements>,
    default: 'button',
  },
  isLoading: Boolean as PropType<boolean>,
  isActive: Boolean as PropType<boolean>,
  isDisabled: Boolean as PropType<boolean>,
  loadingText: String as PropType<string>,
  isFullWidth: Boolean as PropType<boolean>,
  type: String as PropType<ButtonTypes>,
  leftIcon: String as PropType<string>,
  rightIcon: String as PropType<string>,
  colorScheme: String as PropType<string>,
  variant: {
    type: String as PropType<string>,
    default: 'solid',
  },
  size: {
    type: String as PropType<string>,
    default: 'md',
  },
  styleConfig: String as PropType<ComponentThemeConfig>,

  /** Not sure if the SystemCSSProperties is the right prop type for this */
  iconSpacing: {
    type: [String, Number, Array] as PropType<
      SystemCSSProperties['marginRight']
    >,
    default: '0.5rem',
  },
}

/**
 * CButton
 * 
 * The Button component is used to trigger an action or event,
 * such as submitting a form, opening a dialog, canceling
 * an action, or performing a delete operation.
 */
const CButton = defineComponent({
  name: 'CButton',
  props,
  setup(props, { attrs, slots }) {
    const themingProps = computed<ThemingProps>(() => ({
      colorScheme: props.colorScheme,
      variant: props.variant,
      size: props.size,
      styleConfig: props.styleConfig,
    }))

    const group = useButtonGroup()
    const styles = useStyleConfig('Button', { ...group, ...themingProps.value })

    const _focus = mergeWith({}, styles.value?.['_focus'] ?? {}, { zIndex: 1 })

    const buttonStyles: SystemStyleObject = {
      display: 'inline-flex',
      appearance: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 250ms',
      userSelect: 'none',
      position: 'relative',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      outline: 'none',
      width: props.isFullWidth ? '100%' : 'auto',
      ...styles.value,
      ...(!!group && { _focus }),
    }

    return () => (
      <chakra.button
      // @ts-ignore JSX props error
        as={props.as}
        label="button"
        disabled={props.isDisabled || props.isLoading}
        type={props.as === 'button' ? undefined : props.type}
        dataActive={dataAttr(props.isActive)}
        dataLoading={dataAttr(props.isLoading)}
        {...buttonStyles}
        {...attrs}
      >
        {slots}
      </chakra.button>
    )
  },
})

const CButtonSpinner = defineComponent({
  name: 'CButtonSpinner',
  props: {
    label: Boolean as PropType<boolean>,
    spacing: [Number, String, Array] as PropType<
      number | string | string[] | number[]
    >,
    __css: Object as PropType<SystemStyleObject>,
  },
  setup(props, { attrs, slots }) {

    const spinnerStyles: SystemStyleObject = {
      display: "flex",
      alignItems: "center",
      position: props.label ? "relative" : "absolute",
      marginEnd: props.label ? props.spacing : 0,
      ...props.__css,
    }
    return () => (
      // @ts-ignore JSX props error
      <chakra.div label="button__spinner" baseStyle={{}} {...attrs} __css={spinnerStyles}>
        {slots ?? slots}
      </chakra.div>
    )
  },
})

/**
 * CButtonIcon
 * 
 * Button icon component
 */
const CButtonIcon = defineComponent({
  name: 'CButtonIcon',
  setup(_, { slots, attrs }) {
    const children = slots?.default?.()
    const _children = children
      ? cloneVNode(children?.[0], {
          'aria-hidden': true,
          focusable: false,
        })
      : children?.[0]

    return () =>
      <chakra.span label="button__icon" {...attrs}>
        {_children}
      </chakra.span>
  },
})

export default CButton
