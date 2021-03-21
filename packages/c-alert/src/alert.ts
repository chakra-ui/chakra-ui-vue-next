import { h, defineComponent, PropType, computed } from 'vue'
import {
  chakra,
  ColorScheme,
  DeepComponentThemeConfig,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  StylesProvider,
  DOMElements,
} from '@chakra-ui/vue-system'
import { SystemStyleObject } from '@chakra-ui/vue-system'
import { createContext } from '@chakra-ui/vue-utils'
import { CIcon } from '@chakra-ui/c-icon'

const STATUSES = {
  info: {
    colorScheme: 'blue' as ColorScheme,
    icon: 'info',
  },
  success: {
    colorScheme: 'green' as ColorScheme,
    icon: 'check-circle',
  },
  warning: {
    colorScheme: 'orange' as ColorScheme,
    icon: 'warning-alt',
  },
  error: {
    colorScheme: 'red' as ColorScheme,
    icon: 'warning',
  },
}

type AlertStatus = keyof typeof STATUSES
export type AlertVariant = 'solid' | 'subtle' | 'left-accent' | 'top-accent'

interface AlertContext {
  status: AlertStatus
}

const [AlertProvider, useAlertContext] = createContext<AlertContext>({
  name: 'AlertContext',
  errorMessage:
    'useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<c-alert />`',
})

/**
 * CAlert component
 *
 * This is the container component for all Alert components.
 * It also provides state and context to it's compound components
 */
export const CAlert = defineComponent({
  name: 'CAlert',
  props: {
    as: {
      type: [String, Object] as PropType<DOMElements>,
      default: 'div',
    },
    status: {
      type: [String] as PropType<AlertStatus>,
      default: 'info',
    },
    colorScheme: {
      type: [String] as PropType<ColorScheme>,
    },
    styleConfig: {
      type: [Object] as PropType<DeepComponentThemeConfig>,
    },
    variant: {
      type: [String] as PropType<AlertVariant>,
      default: 'solid',
    },
  },
  setup(props, { slots, attrs }) {
    const colorScheme: ColorScheme =
      props.colorScheme || STATUSES[props.status].colorScheme

    const themingProps: ThemingProps = {
      colorScheme,
      variant: props.variant,
    }
    const styles = useMultiStyleConfig('Alert', themingProps)
    const alertStyles: SystemStyleObject = {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      ...styles.value.container,
    }

    StylesProvider(styles.value)
    AlertProvider({ status: props.status })

    return () =>
      h(
        chakra(props.as, { label: 'alert' }),
        {
          role: 'alert',
          ...alertStyles,
          ...attrs,
        },
        slots
      )
  },
})

/**
 * CAlertTitle component
 *
 * The title component for alerts
 */
export const CAlertTitle = defineComponent({
  name: 'CAlertTitle',
  setup(_, { attrs, slots }) {
    const styles = useStyles()

    return () =>
      h(
        chakra('div', { label: 'alert__title' }),
        {
          ...styles.title,
          ...attrs,
        },
        slots
      )
  },
})

/**
 * CAlertDescription component
 *
 * The description component for alerts
 */
export const CAlertDescription = defineComponent({
  name: 'CAlertDescription',
  setup(_, { attrs, slots }) {
    const styles = useStyles()

    return () =>
      h(
        chakra('div', { label: 'alert__description' }),
        {
          ...styles.description,
          ...attrs,
        },
        slots
      )
  },
})

/**
 * CAlertIcon component
 *
 * The Icon component for alerts
 */
export const CAlertIcon = defineComponent({
  name: 'CAlertIcon',
  props: {
    icon: {
      type: [String] as PropType<string>,
    },
  },
  setup(props, { attrs }) {
    const { status } = useAlertContext()
    const { icon } = STATUSES[status]
    const styles = useStyles()

    const alertIcon = computed(() => props.icon || icon)

    return () =>
      h(CIcon, {
        class: 'alert__icon',
        name: alertIcon.value,
        ...styles.icon,
        ...attrs,
      })
  },
})
