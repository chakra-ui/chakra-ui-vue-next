import { h, defineComponent, PropType, computed, ComputedRef } from 'vue'
import {
  chakra,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  StylesProvider,
  DOMElements,
  SystemStyleObject,
} from '@chakra-ui/vue-system'
import { createContext } from '@chakra-ui/vue-utils'
import { CIcon } from '@chakra-ui/c-icon'

const STATUSES = {
  info: {
    colorScheme: 'blue',
    icon: 'info',
  },
  success: {
    colorScheme: 'green',
    icon: 'check-circle',
  },
  warning: {
    colorScheme: 'orange',
    icon: 'warning-alt',
  },
  error: {
    colorScheme: 'red',
    icon: 'warning',
  },
}

type AlertStatus = keyof typeof STATUSES
export type AlertVariant = 'solid' | 'subtle' | 'left-accent' | 'top-accent'

interface AlertContext {
  status: ComputedRef<AlertStatus>
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
      type: [String] as PropType<string>,
    },
    styleConfig: {
      type: [Object] as PropType<any>,
    },
    variant: {
      type: [String] as PropType<AlertVariant>,
      default: 'solid',
    },
  },
  setup(props, { slots, attrs }) {
    const colorScheme = computed<string>(
      () => props.colorScheme || STATUSES[props.status].colorScheme
    )

    const themingProps = computed<ThemingProps>(() => ({
      colorScheme: colorScheme.value,
      variant: props.variant,
    }))

    AlertProvider({ status: computed(() => props.status) })
    const styles = useMultiStyleConfig('Alert', themingProps.value)
    StylesProvider(styles)

    const alertStyles = computed<SystemStyleObject>(() => ({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      ...styles.value.container,
    }))

    return () => {
      return h(
        chakra(props.as, { label: 'alert' }),
        {
          role: 'alert',
          ...alertStyles.value,
          ...attrs,
        },
        slots
      )
    }
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
    return () => {
      const styles = useStyles()

      return h(
        chakra('div', { label: 'alert__title' }),
        {
          ...styles.value.title,
          ...attrs,
        },
        slots
      )
    }
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
    return () => {
      return h(
        chakra('div', { label: 'alert__description' }),
        {
          ...styles.value.description,
          ...attrs,
        },
        slots
      )
    }
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
    const styles = useStyles()
    const { status } = useAlertContext()
    const { icon } = STATUSES[status.value]
    const alertIcon = computed(() => props.icon || icon)

    return () => {
      return h(CIcon, {
        class: 'alert__icon',
        name: alertIcon.value,
        ...styles.value.icon,
        ...attrs,
      })
    }
  },
})
