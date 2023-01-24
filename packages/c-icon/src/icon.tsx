import {
  h,
  defineComponent,
  computed,
  inject,
  SVGAttributes,
  PropType,
  Fragment,
  DefineComponent,
} from "vue"
import {
  chakra,
  ChakraProps,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import type { } from "@vue/runtime-core"
import { SNAO, camelCase } from "@chakra-ui/vue-utils"
import { mergeWith } from "@chakra-ui/utils"

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

export const iconProps = {
  as: "svg",
  size: "1em",
}

const _iconProps = {
  as: SNAO as PropType<IconProps["as"]>,
  size: SNAO as PropType<IconProps["size"]>,
  name: String as PropType<IconProps["name"]>,
}

// @ts-ignore
export const CIcon = defineComponent({
  name: "CIcon",
  props: _iconProps,
  setup(_props, { slots, attrs }) {
    const props = computed<IconProps>(() => mergeWith({}, iconProps, _props))
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
