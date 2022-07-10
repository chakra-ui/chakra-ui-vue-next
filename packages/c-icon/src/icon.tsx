import {
  h,
  defineComponent,
  computed,
  inject,
  SVGAttributes,
  PropType,
} from "vue"
import {
  chakra,
  ChakraProps,
  ComponentWithProps,
  DeepPartial,
  DOMElements,
} from "@chakra-ui/vue-system"
import { SNAO } from "@chakra-ui/vue-utils"
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

export const CIcon: ComponentWithProps<DeepPartial<IconProps>> =
  defineComponent({
    props: {
      as: SNAO as PropType<IconProps["as"]>,
      size: SNAO as PropType<IconProps["size"]>,
      name: String as PropType<IconProps["name"]>,
    },
    setup(_props, { slots, attrs }) {
      const props = computed<IconProps>(() => mergeWith({}, iconProps, _props))
      const icons = inject<Record<string, any>>("$chakraIcons")
      const icon = computed(
        () => icons?.[props.value?.name as string] || fallbackIcon
      )
      const vnodeProps = computed(() => ({
        w: props.value.size,
        h: props.value.size,
        display: "inline-block",
        lineHeight: "1em",
        flexShrink: 0,
        color: "currentColor",
        innerHTML: icon.value.path,
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
