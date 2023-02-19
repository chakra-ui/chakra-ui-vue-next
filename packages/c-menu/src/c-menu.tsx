import { filterUndefined } from "@chakra-ui/utils"
import * as menu from "@zag-js/menu"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { Machine, StateMachine } from "@zag-js/core"
import {
  StylesProvider,
  useMultiStyleConfig,
  chakra,
  useStyles,
  useStyleConfig,
} from "@chakra-ui/vue-system"
import { ThemingProps } from "@chakra-ui/styled-system"
import {
  createContext,
  getValidChildren,
  vueThemingProps,
} from "@chakra-ui/vue-utils"
import { ComputedRef, computed, defineComponent, h } from "vue"

export const [MenuProvider, useMenu] = createContext<{
  root: ComputedRef<ReturnType<typeof menu.connect>>
  machine: ReturnType<typeof menu.machine>
  rootEmit: (event: "select", ...args: any[]) => void
}>({
  name: "MenuContext",
  strict: true,
})

export const CMenu = defineComponent({
  name: "CMenu",
  props: {
    menuId: {
      type: String,
    },
    ariaLabel: {
      type: String,
      required: true,
    },
    initialActiveId: {
      type: String,
    },
    ...vueThemingProps,
  },
  emits: ["select"],
  setup(props, { slots, attrs, emit, expose }) {
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: props.colorScheme || "gray",
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )

    const styles = useMultiStyleConfig("Menu", themingProps)
    const [state, send, machine] = useMachine(
      menu.machine({
        id: props.menuId || "1",
        "aria-label": props.ariaLabel,
        onSelect: (value) => emit("select", value.value),
      })
    )

    const root = computed(() => menu.connect(state.value, send, normalizeProps))
    // Set active id on first render
    if (props.initialActiveId) {
      // @ts-expect-error setActiveId not typed correctly
      root.value.setActiveId(props.initialActiveId)
    }
    expose({
      open: root.value.open,
      isOpen: root.value.isOpen,
      close: root.value.close,
    })
    MenuProvider({ root, machine, rootEmit: emit })
    StylesProvider(styles)

    return () => (
      <chakra.div __label="menu" {...attrs}>
        {slots.default?.()}
      </chakra.div>
    )
  },
})

export const CMenuTrigger = defineComponent({
  props: {
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const themingProps = computed<ThemingProps<"Button">>(() =>
      filterUndefined({
        colorScheme: props.colorScheme || "gray",
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )
    const styles = useStyles()
    const buttonStyles = useStyleConfig("Button", props)
    const triggerStyles = computed(() => ({
      ...buttonStyles.value,
      ...styles.value.button,
    }))
    const { root } = useMenu()

    return () => (
      <chakra.button
        __label="menu-trigger"
        __css={triggerStyles.value}
        {...root.value.triggerProps}
        {...attrs}
      >
        {slots.default?.()}
      </chakra.button>
    )
  },
})

export const CMenuDivider = defineComponent({
  setup(_, { attrs }) {
    const styles = useStyles()
    const { root } = useMenu()
    const separatorProps = computed(() => root.value)
    return () => (
      <chakra.hr
        __label="menu-divider"
        __css={styles.value.divider}
        {...separatorProps.value}
        {...attrs}
      />
    )
  },
})

export const CMenuGroup = defineComponent({
  props: {
    groupTitle: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const styles = useStyles()
    const { root } = useMenu()
    const groupProps = computed(() =>
      root.value.getItemGroupProps({ id: props.groupTitle })
    )
    const labelProps = computed(() =>
      root.value.getItemGroupLabelProps({ htmlFor: props.groupTitle })
    )

    return () => (
      <chakra.div __label="menu-group" {...attrs}>
        <chakra.p
          __label="menu-group-label"
          __css={styles.value.groupTitle}
          {...labelProps.value}
        >
          {props.groupTitle}
        </chakra.p>
        <chakra.div {...groupProps.value}>
          {() => getValidChildren(slots)}
        </chakra.div>
      </chakra.div>
    )
  },
})
