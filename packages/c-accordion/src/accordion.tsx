import { h, defineComponent, PropType, computed, ComputedRef, ref } from "vue"
import * as accordion from "@zag-js/accordion"
import { normalizeProps, useMachine } from "@zag-js/vue"
import {
  chakra,
  DOMElements,
  HTMLChakraProps,
  useMultiStyleConfig,
  createStylesContext,
  AnatomyParts,
} from "@chakra-ui/vue-system"

import { useId } from "@chakra-ui/vue-composables"
import {
  createContext,
  genId,
  SNAO,
  getValidChildren,
  vueThemingProps,
} from "@chakra-ui/vue-utils"
import { filterUndefined, mergeWith } from "@chakra-ui/utils"
import { SystemStyleObject, ThemingProps } from "@chakra-ui/styled-system"
import { CCollapse } from "@chakra-ui/c-motion"
import { CIcon } from "@chakra-ui/c-icon"

export type ExpandedValues = string | string[]

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
  index?: ExpandedValues
  defaultIndex?: ExpandedValues
  /**
   * The initial index(es) of the expanded accordion item
   */
  defaultOpen?: ExpandedValues

  /**
   * If `true`, height animation and transitions will be disabled.
   */
  reduceMotion: boolean
}

export interface CAccordionContext {
  api: ComputedRef<ReturnType<typeof accordion.connect>>
  reduceMotion: ComputedRef<boolean>
}

const [AccordionProvider, useAccordion] = createContext<CAccordionContext>({
  name: "AccordionContext",
  strict: true,
})

const [StylesProvider, useStyles] =
  createStylesContext<AnatomyParts.Accordion>("Accordion")

export const CAccordion = defineComponent({
  name: "CAccordion",
  props: {
    as: {
      type: [String] as PropType<DOMElements>,
      default: "div",
    },
    allowMultiple: Boolean as PropType<CAccordionProps["allowMultiple"]>,
    allowToggle: Boolean as PropType<CAccordionProps["allowToggle"]>,
    index: SNAO as PropType<CAccordionProps["index"]>,
    defaultIndex: SNAO as PropType<CAccordionProps["defaultIndex"]>,
    reduceMotion: {
      type: Boolean as PropType<CAccordionProps["reduceMotion"]>,
      default: false,
    },
    ...vueThemingProps,
  },
  setup(_props, { slots, attrs }) {
    const uid = ref(genId())
    const context = computed(() => ({
      multiple: _props.allowMultiple,
      collapsible: _props.allowToggle,
    }))
    const [state, send] = useMachine(accordion.machine({ id: uid.value }), {
      context,
    })
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

    const styles = useMultiStyleConfig<AnatomyParts.Accordion>(
      "Accordion",
      themingProps
    )

    const reduceMotion = computed(() => props.value.reduceMotion)

    AccordionProvider({
      api: apiRef,
      reduceMotion,
    })
    StylesProvider(styles)

    return () => {
      const api = apiRef.value
      return (
        <chakra.div
          sx={{
            "> div": styles.value.root,
          }}
        >
          {() => <div {...api.rootProps}>{getValidChildren(slots)}</div>}
        </chakra.div>
      )
    }
  },
})

export interface CAccordionItemProps extends HTMLChakraProps<"div"> {
  disabled?: boolean
}

export interface CAccordionItemContext {
  id: ComputedRef<string>
  isOpen: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean | undefined>
}

const [AccordionItemProvider, useAccordionItem] =
  createContext<CAccordionItemContext>({
    name: "AccordionItemContext",
    strict: true,
  })
export const CAccordionItem = defineComponent({
  name: "CAccordionItem",
  props: {
    disabled: Boolean as PropType<boolean>,
    value: String as PropType<string>,
  },
  setup(props, { slots, attrs }) {
    const _uid = useId(undefined, "accordion-item")
    const id = computed(() => (attrs.id as string) || _uid.value)
    const { api } = useAccordion()
    const itemValue = computed(() => id.value)
    const state = computed(() =>
      api.value.getItemState({ value: itemValue.value })
    )

    const isOpen = computed(() => state.value.isOpen)
    const isDisabled = computed(() => props.disabled)

    AccordionItemProvider({
      id,
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
          value: itemValue.value,
          disabled: props.disabled,
        })}
        {...attrs}
      >
        {getValidChildren(slots)}
      </chakra.div>
    )
  },
})

export interface CAccordionButtonProps extends HTMLChakraProps<"button"> {
  disabled?: boolean
}
export const CAccordionButton = defineComponent({
  name: "CAccordionButton",
  props: {
    disabled: Boolean as PropType<boolean>,
  },
  setup(props, { slots, attrs }) {
    const { id } = useAccordionItem()

    const { api } = useAccordion()
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
        {() => getValidChildren(slots)}
      </chakra.button>
    )
  },
})

export interface CAccordionPanelProps extends HTMLChakraProps<"div"> {
  disabled?: boolean
}
export const CAccordionPanel = defineComponent({
  name: "CAccordionPanel",
  props: {
    disabled: Boolean as PropType<boolean>,
  },
  setup(props, { slots, attrs }) {
    const { id, isOpen } = useAccordionItem()
    const { api } = useAccordion()
    const styles = useStyles()

    return () => {
      const { hidden, ...contentProps } = api.value.getContentProps({
        value: id.value,
        disabled: props.disabled,
      })
      return (
        <CCollapse isOpen={isOpen.value}>
          <chakra.div {...contentProps} __css={styles.value.panel} {...attrs}>
            {getValidChildren(slots)}
          </chakra.div>
        </CCollapse>
      )
    }
  },
})

export interface CAccordionIconProps extends HTMLChakraProps<"svg"> {}
export const CAccordionIcon = defineComponent({
  name: "CAccordionIcon",
  setup(props, { slots, attrs }) {
    const { isOpen, isDisabled } = useAccordionItem()
    const { reduceMotion } = useAccordion()
    const styles = useStyles()

    const iconStyles = computed<SystemStyleObject>(() => ({
      opacity: isDisabled.value ? 0.4 : 1,
      transform: isOpen.value ? "rotate(-180deg)" : undefined,
      transition: reduceMotion.value ? undefined : "transform 0.2s",
      transformOrigin: "center",
      ...styles.value.icon,
    }))

    return () => (
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
  },
})
