import { h, defineComponent, PropType, provide } from 'vue'
import {
  chakra,
  ColorScheme,
  DeepComponentThemeConfig,
  ThemingProps,
  useMultiStyleConfig,
  provideComponentStyles,
} from '@chakra-ui/system-vue'
import { DOMElements } from '@chakra-ui/system-vue'
import { SystemStyleObject } from '@chakra-ui/styled-system'

const STATUSES = {
  info: {
    colorScheme: 'blue' as ColorScheme,
  },
  success: {
    colorScheme: 'green' as ColorScheme,
  },
  warning: {
    colorScheme: 'orange' as ColorScheme,
  },
  error: {
    colorScheme: 'red' as ColorScheme,
  },
}

type AlertStatus = keyof typeof STATUSES
export type AlertVariant = 'solid' | 'subtle' | 'left-accent' | 'top-accent'

interface AlertState {
  status: AlertStatus
}

const CAlert = defineComponent({
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

    provideComponentStyles('Alert', alertStyles)
    provide('$AlertState', { status: props.status } as AlertState)

    return () =>
      h(
        chakra(props.as, 'alert'),
        {
          role: 'alert',
          ...alertStyles,
          ...attrs,
        },
        slots
      )
  },
})

export default CAlert
