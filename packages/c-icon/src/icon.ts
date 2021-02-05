import { h, defineComponent, PropType, computed } from 'vue'
import {
  chakra,
  DOMElements,
  StyleAndHTMLAttibutes,
} from '@chakra-ui/vue-system'
import { InternalIcon } from './icon.internals'
import internalIcons from './icon.internals'

const fallbackIcon: InternalIcon = {
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

export const CIcon = defineComponent({
  props: {
    as: {
      type: [Object, String] as PropType<DOMElements>,
      default: 'svg',
    },
    name: {
      type: [String] as PropType<string>,
    },
    size: {
      type: [String] as PropType<string>,
      default: '1em',
    },
  },
  setup(props, { slots, attrs }) {
    const vnodeProps = computed<StyleAndHTMLAttibutes>(() => ({
      w: props.size,
      h: props.size,
      display: 'inline-block',
      lineHeight: '1em',
      flexShrink: 0,
      color: 'currentColor',
      innerHTML:
        internalIcons[props?.name as string]?.path || fallbackIcon.path,
      viewBox: fallbackIcon.viewBox,
    }))

    return () => h(chakra(props.as), { ...vnodeProps.value, ...attrs }, slots)
  },
})
