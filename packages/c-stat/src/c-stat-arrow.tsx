import {
  Fragment,
  PropType,
  computed,
  defineComponent,
  h,
  mergeProps,
} from "vue"
import { CIcon, IconProps } from "@chakra-ui/c-icon"
import { useStatStyles } from "./c-stat"
import { chakra } from "@chakra-ui/vue-system"

export const CStatDownArrow = (props: IconProps) => (
  <CIcon color="red.400" {...props}>
    <path
      fill="currentColor"
      d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
    />
  </CIcon>
)

export const CStatUpArrow = (props: IconProps) => {
  return (
    <CIcon color="green.400" {...props}>
      <path
        fill="currentColor"
        d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
      />
    </CIcon>
  )
}

export interface CStatArrowProps extends IconProps {
  type?: "increase" | "decrease"
}

export const CStatArrow = defineComponent({
  name: "CStatArrow",
  props: {
    type: {
      type: String as PropType<CStatArrowProps["type"]>,
    },
    "aria-label": {
      type: String as PropType<CStatArrowProps["aria-label"]>,
    },
  },
  setup(props, { attrs }) {
    const styles = useStatStyles()

    const iconProps = computed(() =>
      mergeProps({
        "aria-hidden": true,
        __css: styles.value.icon,
        ...attrs,
      })
    )

    const BaseIcon = computed(() => {
      return props.type === "increase"
        ? h(CStatUpArrow, { ...iconProps.value })
        : h(CStatDownArrow, { ...iconProps.value })
    })

    const defaultAriaLabel = computed(() => {
      return props.type === "increase" ? "increased by" : "decreased by"
    })

    return () => {
      const label = props["aria-label"] || defaultAriaLabel.value

      return (
        <Fragment>
          <chakra.span srOnly>{label}</chakra.span>
          {BaseIcon.value}
        </Fragment>
      )
    }
  },
})
