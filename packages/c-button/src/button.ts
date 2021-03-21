import { defineComponent, PropType, computed, cloneVNode, h } from 'vue'
import {
  chakra,
  useStyleConfig,
  ThemingProps,
  SystemStyleObject,
} from '@chakra-ui/vue-system'
import { dataAttr, filterUndefined, mergeWith } from '@chakra-ui/vue-utils'
import { useButtonGroup } from './button-group'
import { CIcon } from '@chakra-ui/c-icon'
import { CSpinner } from '@chakra-ui/c-spinner'
import { BUTTON_PROPS } from './button.utils'

const CButtonSpinner = defineComponent({
  name: 'CButtonSpinner',
  inheritAttrs: false,
  props: {
    label: Boolean as PropType<boolean>,
    spacing: [Number, String, Array] as PropType<
      number | string | string[] | number[]
    >,
  },
  setup(props, { attrs }) {
    const spinnerStyles = computed<SystemStyleObject>(() => ({
      display: 'flex',
      alignItems: 'center',
      position: props.label ? 'relative' : 'absolute',
      marginEnd: props.label ? props.spacing : 0,
    }))
    return () =>
      h(
        chakra('div', {
          label: 'button__spinner',
        }),
        {
          ...spinnerStyles.value,
          ...attrs,
        },
        [
          h(CSpinner, {
            color: 'currentColor',
            width: '1em',
            height: '1em',
          }),
        ]
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
  inheritAttrs: false,
  props: {
    icon: String as PropType<string>,
  },
  setup(props, { attrs }) {
    return () =>
      h(CIcon, {
        label: 'button__icon',
        name: props.icon,
        ...attrs,
      })
  },
})

/**
 * CButton
 *
 * The Button component is used to trigger an action or event,
 * such as submitting a form, opening a dialog, canceling
 * an action, or performing a delete operation.
 */
const CButton = defineComponent({
  name: 'CButton',
  props: BUTTON_PROPS,
  setup(props, { attrs, slots }) {
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )

    const group = useButtonGroup()
    const styles = useStyleConfig('Button', {
      ...group?.(),
      ...themingProps.value,
    })

    const _focus = mergeWith({}, styles.value?.['_focus'] ?? {}, { zIndex: 1 })

    const buttonStyles = computed<SystemStyleObject>(() => ({
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
    }))

    return () =>
      h(
        chakra(props.as, {
          label: 'button',
        }),
        {
          ...((props.isDisabled || props.isLoading) && {
            disabled: props.isDisabled || props.isLoading,
          }),
          type: props.as === 'button' ? undefined : props.type,
          dataActive: dataAttr(props.isActive),
          dataLoading: dataAttr(props.isLoading),
          ...buttonStyles.value,
          ...attrs,
        },
        () => [
          props.leftIcon &&
            !props.isLoading &&
            h(CButtonIcon, {
              icon: props.leftIcon,
              marginEnd: props.iconSpacing,
            }),
          props.isLoading &&
            // @ts-expect-error Suppress (No overload matches this call.). Not sure about how to fix this now
            h(CButtonSpinner, {
              spacing: props.iconSpacing,
              label: props.loadingText,
              __css: { fontSize: '1em', lineHeight: 'normal' },
            }),
          props.isLoading
            ? props.loadingText ||
              h(chakra.span, { opacity: 0 }, slots?.default?.())
            : slots?.default?.(),
          props.rightIcon &&
            !props.isLoading &&
            h(CButtonIcon, {
              icon: props.rightIcon,
              marginStart: props.iconSpacing,
            }),
        ]
      )
  },
})

export default CButton
