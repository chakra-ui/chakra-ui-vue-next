import {
  h,
  defineComponent,
  PropType,
  computed,
  inject,
  SVGAttributes,
} from 'vue'
import { chakra, ChakraProps, DOMElements } from '@chakra-ui/vue-system'

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
  viewBox: '0 0 24 24',
}

export interface IconProps
  extends Omit<SVGAttributes, keyof ChakraProps>,
    ChakraProps {
  /**
   * Icon Size
   */
  size?: string
}

export const CIcon = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'svg',
    },
    name: {
      type: [String] as PropType<IconProps['name']>,
    },
    size: {
      type: [String] as PropType<IconProps['size']>,
      default: '1em',
    },
  },
  setup(props, { slots, attrs }) {
    const icons = inject<Record<string, any>>('$chakraIcons')
    const icon = computed(() => icons?.[props?.name as string] || fallbackIcon)
    const vnodeProps = computed(() => ({
      w: props.size,
      h: props.size,
      display: 'inline-block',
      lineHeight: '1em',
      flexShrink: 0,
      color: 'currentColor',
      innerHTML: icon.value.path,
      focusable: false,
      viewBox: icon.value.viewBox || fallbackIcon.viewBox,
    }))

    return () =>
      h(
        chakra(props.as, { label: 'icon' }),
        { ...(icon.value.attrs || {}), ...vnodeProps.value, ...attrs },
        slots
      )
  },
})
