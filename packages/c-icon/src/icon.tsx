import {
  h,
  defineComponent,
  computed,
  inject,
  SVGAttributes,
  PropType,
  DefineComponent,
} from "vue"
import { chakra, ChakraProps } from "@chakra-ui/vue-system"
import type {} from "@vue/runtime-core"
import { SNAO, camelCase, mergeWith } from "@chakra-ui/vue-utils"

const fallbackIcon = {
  path: `
    <g stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        fill="none"
        d="M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      />
      <path
        fill="currentColor"
        strokeLinecap="round"
        d="M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      />
      <circle fill="none" strokeMiterlimit="10" cx="12" cy="12" r="11.25" />
    </g>
  `,
  viewBox: "0 0 24 24",
}

export interface IconProps
  extends Omit<SVGAttributes, keyof ChakraProps>,
    ChakraProps {
  /**
   * Icon Size
   */
  size?: string | number | object
  name?: string | undefined
}

export const _iconProps = {
  as: {
    type: SNAO as PropType<IconProps["as"]>,
    default: "svg",
  },
  size: {
    type: SNAO as PropType<IconProps["size"]>,
    default: "1em",
  },
  name: String as PropType<IconProps["name"]>,
}

export const CIcon = defineComponent({
  name: "CIcon",
  props: _iconProps,
  setup(_props, { slots, attrs }) {
    const props = computed<IconProps>(() => mergeWith({}, _props))
    const icons = inject<Record<string, any>>("$chakraIcons")
    const icon = computed(
      () => icons?.[props.value?.name as string] || fallbackIcon
    )

    const hasDefaultSlot = computed(() => slots?.default?.()?.length)
    const vnodeProps = computed(() => ({
      w: props.value.size,
      h: props.value.size,
      display: "inline-block",
      lineHeight: "1em",
      flexShrink: 0,
      color: "currentColor",
      ...(!hasDefaultSlot.value && {
        innerHTML: icon.value.path,
      }),
      focusable: false,
      viewBox: icon.value.viewBox || fallbackIcon.viewBox,
    }))

    return () => (
      <chakra.svg
        as={props.value.as}
        __label="icon"
        {...(icon.value.attrs || {})}
        {...vnodeProps.value}
        {...attrs}
      >
        {slots}
      </chakra.svg>
    )
  },
})

export function createIconComponent(name: string) {
  const componentName = camelCase(name)
  const iconComponent = defineComponent(
    (props: IconProps, { slots, attrs }) => {
      return () => (
        <CIcon name={name} {...props} {...attrs}>
          {slots}
        </CIcon>
      )
    }
  ) as any as DefineComponent

  iconComponent.name = componentName
  return iconComponent
}

export interface CreateIconOptions {
  name: string
  path: string
  viewBox?: string
}

const { name, ...__icon_props__ } = _iconProps
export function createIcon(options: CreateIconOptions) {
  const componentName = camelCase(options.name)
  const iconComponent = defineComponent({
    name: componentName,
    props: __icon_props__,
    setup(props, { slots, attrs }) {
      const hasDefaultSlot = computed(() => slots?.default?.()?.length)
      const vnodeProps = computed(() => ({
        w: props.size,
        h: props.size,
        display: "inline-block",
        lineHeight: "1em",
        flexShrink: 0,
        color: "currentColor",
        ...(!hasDefaultSlot.value && {
          innerHTML: options.path,
        }),
        focusable: false,
        viewBox: options.viewBox || fallbackIcon.viewBox,
      }))

      return () => (
        <chakra.svg __label="icon" {...vnodeProps.value} {...attrs}>
          {slots.default?.()}
        </chakra.svg>
      )
    },
  })
  return iconComponent
}
