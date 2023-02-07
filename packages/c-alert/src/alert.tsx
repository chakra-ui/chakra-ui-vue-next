import {
  h,
  defineComponent,
  PropType,
  computed,
  ComputedRef,
  Fragment,
} from "vue"
import {
  chakra,
  ThemingProps,
  useMultiStyleConfig,
  createStylesContext,
  DOMElements,
  SystemStyleObject,
} from "@chakra-ui/vue-system"
import { createContext, getValidChildren } from "@chakra-ui/vue-utils"
import { CCheckIcon, CErrorIcon, CInfoIcon, CWarningIcon } from "./icons"

const STATUSES = {
  info: {
    colorScheme: "blue",
    icon: CInfoIcon,
  },
  success: {
    colorScheme: "green",
    icon: CCheckIcon,
  },
  warning: {
    colorScheme: "orange",
    icon: CWarningIcon,
  },
  error: {
    colorScheme: "red",
    icon: CErrorIcon,
  },
  loading: { icon: CInfoIcon, colorScheme: "blue" },
}

const [StylesProvider, useStyles] = createStylesContext("Alert")
type AlertStatus = keyof typeof STATUSES
export type AlertVariant = "solid" | "subtle" | "left-accent" | "top-accent"

interface AlertContext {
  status: ComputedRef<AlertStatus>
}

const [AlertProvider, useAlertContext] = createContext<AlertContext>({
  name: "AlertContext",
  errorMessage:
    "useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<c-alert />`",
})

/**
 * CAlert component
 *
 * This is the container component for all Alert components.
 * It also provides state and context to it's compound components
 */
export const CAlert = defineComponent({
  name: "CAlert",
  props: {
    as: {
      type: [String, Object] as PropType<DOMElements>,
      default: "div",
    },
    status: {
      type: [String] as PropType<AlertStatus>,
      default: "info",
    },
    colorScheme: {
      type: [String] as PropType<string>,
    },
    styleConfig: {
      type: [Object] as PropType<any>,
    },
    variant: {
      type: [String] as PropType<AlertVariant>,
      default: "solid",
    },
  },
  setup(props, { slots, attrs }) {
    const colorScheme = computed<string>(
      () => props.colorScheme || STATUSES[props?.status]?.colorScheme
    )

    const themingProps = computed<ThemingProps>(() => ({
      colorScheme: colorScheme.value,
      variant: props.variant,
    }))

    AlertProvider({ status: computed(() => props.status) })
    const styles = useMultiStyleConfig("Alert", themingProps)
    StylesProvider(styles)

    const alertStyles = computed<SystemStyleObject>(() => ({
      width: "100%",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "body",
      ...styles.value.container,
    }))

    return () => {
      return (
        <chakra.div
          role="alert"
          __label="alert"
          __css={alertStyles.value}
          {...attrs}
        >
          {() => getValidChildren(slots)}
        </chakra.div>
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
  name: "CAlertTitle",
  setup(_, { attrs, slots }) {
    const styles = useStyles()

    return () => {
      return (
        <chakra.div
          __label="alert__title"
          __css={styles.value.title}
          {...attrs}
        >
          {slots}
        </chakra.div>
      )
    }
  },
})

/**«
 * CAlertDescription component
 *
 * The description component for alerts
 */
export const CAlertDescription = defineComponent({
  name: "CAlertDescription",
  setup(_, { attrs, slots }) {
    const styles = useStyles()
    return () => {
      return (
        <chakra.div
          __label="alert__description"
          __css={styles.value.description}
          {...attrs}
        >
          {() => getValidChildren(slots)}
        </chakra.div>
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
  name: "CAlertIcon",
  setup(_, { attrs, slots }) {
    const styles = useStyles()
    const { status } = useAlertContext()
    const { icon: BaseIcon } = STATUSES[status.value]
    const css = computed(() =>
      status.value === "loading" ? styles.value.spinner : styles.value.icon
    )

    return () => {
      const validChildren = getValidChildren(slots)
      return (
        <chakra.span
          display="inherit"
          __label="alert__icon"
          {...attrs}
          __css={css.value}
        >
          {() => (
            <>{validChildren.length ? slots : <BaseIcon h="100%" w="100%" />}</>
          )}
        </chakra.span>
      )

      // return <icon {...styles.value.icon} {...attrs}></icon>
    }
  },
})
