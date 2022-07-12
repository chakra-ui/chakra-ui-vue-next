import {
  h,
  defineComponent,
  PropType,
  computed,
  watchEffect,
  ComputedRef,
  provide,
  inject,
  Fragment,
  cloneVNode,
} from "vue"
import * as accordion from "@zag-js/accordion"
import { normalizeProps, useMachine, useSetup } from "@zag-js/vue"
import {
  chakra,
  DOMElements,
  StylesProvider,
  ComponentWithProps,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/vue-system"
import { useIds } from "@chakra-ui/vue-composables"
import { createContext, genId, vueThemingProps } from "@chakra-ui/vue-utils"
import { filterUndefined, mergeWith } from "@chakra-ui/utils"
import { SystemStyleObject } from "@chakra-ui/styled-system"
import { getValidChildren } from "@chakra-ui/vue-utils"
import { CIcon } from "@chakra-ui/c-icon"

export type ExpandedIndex = number | number[]

export interface CAccordionProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Accordion"> {
  /**
   * If `true`, multiple accordion items can be expanded at once.
   */
  allowMultiple?: boolean
  /**
   * If `true`, any expanded accordion item can be collapsed again.
   */
  allowToggle?: boolean
  /**
   * The index(es) of the expanded accordion item
   */
  index?: ExpandedIndex
  /**
   * The initial index(es) of the expanded accordion item
   */
  defaultIndex?: ExpandedIndex

  /**
   * If `true`, height animation and transitions will be disabled.
   */
  reduceMotion?: boolean
}

const [AccordionProvider, useAccordion] = createContext<
  ComputedRef<ReturnType<typeof accordion.connect>>
>({
  name: "AccordionContext",
  strict: true,
})

export const CAccordion: ComponentWithProps<CAccordionProps> = defineComponent({
  name: "CAccordion",
  props: {
    as: {
      type: [String] as PropType<DOMElements>,
      default: "div",
    },
    allowMultiple: Boolean as PropType<CAccordionProps["allowMultiple"]>,
    allowToggle: Boolean as PropType<CAccordionProps["allowToggle"]>,
    index: Number as PropType<CAccordionProps["index"]>,
    defaultIndex: Number as PropType<CAccordionProps["defaultIndex"]>,
    reduceMotion: Boolean as PropType<CAccordionProps["reduceMotion"]>,
    ...vueThemingProps,
  },
  setup(_props, { slots, attrs }) {
    const id = computed<string>(() => (attrs.id as string) || genId())
    const [rootId, buttonId, panelId] = useIds(
      id.value,
      "root",
      "button",
      "panel"
    )
    const context = computed(() => ({
      multiple: _props.allowMultiple,
      collapsible: _props.allowToggle,
    }))
    const [state, send] = useMachine(accordion.machine(context.value))
    const apiRef = computed(() =>
      accordion.connect(state.value, send, normalizeProps)
    )

    const props = computed<CAccordionProps>(() => mergeWith({}, _props, attrs))
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: props.value.colorScheme,
        variant: props.value.variant,
        size: props.value.size,
        styleConfig: props.value.styleConfig,
      })
    )

    const styles = useMultiStyleConfig("Accordion", {
      ...props.value,
      ...themingProps.value,
      ...attrs,
    })

    const reduceMotion = computed(() => props.value.reduceMotion)

    provide("AccordionContext", { reduceMotion })

    AccordionProvider(apiRef)
    StylesProvider(styles)

    const ref = useSetup({ send, id: id.value })

    return () => {
      const api = apiRef.value
      console.log("state", state.value)
      return (
        <chakra.div
          sx={{
            "> div": styles.value.root,
          }}
        >
          {() => (
            <>
              <div ref={ref} {...api.rootProps}>
                {slots}
              </div>
            </>
          )}
        </chakra.div>
      )
    }
  },
})

export interface CAccordionItemProps extends HTMLChakraProps<"div"> {
  disabled?: boolean
}

export const CAccordionItem: ComponentWithProps<CAccordionItemProps> =
  defineComponent({
    name: "CAccordionItem",
    props: {
      disabled: Boolean as PropType<boolean>,
    },
    setup(props, { slots, attrs }) {
      const id = computed(() => (attrs.id as string) || genId())
      const api = useAccordion()
      const state = computed(() => api.value.getItemState({ value: id.value }))
      const isOpen = computed(() => state.value.isOpen)
      const isDisabled = computed(() => props.disabled)

      provide("AccordionItemContext", {
        id: computed(() => id.value),
        isOpen,
        isDisabled,
      })

      const styles = useStyles()

      const containerStyles = computed<SystemStyleObject>(() => ({
        ...styles.value.container,
        overflowAnchor: "none",
      }))

      return () => (
        <chakra.div
          __css={containerStyles.value}
          {...api.value.getItemProps({
            value: id.value,
            disabled: props.disabled,
          })}
          {...attrs}
        >
          {slots}
        </chakra.div>
      )
    },
  })

export interface CAccordionButtonProps extends HTMLChakraProps<"button"> {
  disabled?: boolean
}
export const CAccordionButton: ComponentWithProps<CAccordionButtonProps> =
  defineComponent({
    name: "CAccordionButton",
    props: {
      disabled: Boolean as PropType<boolean>,
    },
    setup(props, { slots, attrs }) {
      const { id } = inject("AccordionItemContext")! as any

      const api = useAccordion()
      const styles = useStyles()
      const buttonStyles = computed<SystemStyleObject>(() => ({
        display: "flex",
        alignItems: "center",
        width: "100%",
        outline: 0,
        ...styles.value.button,
      }))

      return () => (
        <chakra.button
          {...api.value.getTriggerProps({
            value: id.value,
            disabled: props.disabled,
          })}
          __css={buttonStyles.value}
          {...attrs}
        >
          {slots}
        </chakra.button>
      )
    },
  })

export interface CAccordionPanelProps extends HTMLChakraProps<"div"> {
  disabled?: boolean
}
export const CAccordionPanel: ComponentWithProps<CAccordionPanelProps> =
  defineComponent({
    name: "CAccordionPanel",
    props: {
      disabled: Boolean as PropType<boolean>,
    },
    setup(props, { slots, attrs }) {
      const { id } = inject("AccordionItemContext")! as any
      const api = useAccordion()
      const styles = useStyles()

      return () => {
        const contentProps = api.value.getContentProps({
          value: id.value,
          disabled: props.disabled,
        })
        return (
          <chakra.div {...contentProps} __css={styles.value.panel} {...attrs}>
            {slots}
          </chakra.div>
        )
      }
    },
  })

export interface CAccordionIconProps extends HTMLChakraProps<"svg"> {}
export const CAccordionIcon: ComponentWithProps<CAccordionIconProps> =
  defineComponent({
    name: "CAccordionIcon",
    setup(props, { slots, attrs }) {
      const { isOpen, isDisabled } = inject("AccordionItemContext")! as any
      const { reduceMotion } = inject("AccordionContext")! as any
      const api = useAccordion()
      const styles = useStyles()

      const iconStyles = computed<SystemStyleObject>(() => ({
        opacity: isDisabled.value ? 0.4 : 1,
        transform: isOpen.value ? "rotate(-180deg)" : undefined,
        transition: reduceMotion.value ? undefined : "transform 0.2s",
        transformOrigin: "center",
        ...styles.value.icon,
      }))

      return () => {
        return (
          <CIcon
            viewBox="0 0 24 24"
            aria-hidden
            __css={iconStyles.value}
            {...attrs}
          >
            <path
              fill="currentColor"
              d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
            />
          </CIcon>
        )
      }
    },
  })
