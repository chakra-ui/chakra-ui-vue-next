import { computed, ComputedRef, defineComponent, h, PropType } from "vue"
import { SystemProps, SystemStyleObject } from "@chakra-ui/styled-system"
import { chakra, ThemingProps, ComponentWithProps } from "@chakra-ui/vue-system"
import {
  createContext,
  getValidChildren,
  vueThemingProps,
} from "@chakra-ui/vue-utils"

export interface ButtonGroupProps extends ThemingProps {
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   */
  isAttached?: boolean
  /**
   * If `true`, all wrapped button will be disabled
   */
  isDisabled?: boolean
  /**
   * The spacing between the buttons
   * @default '0.5rem'
   * @type SystemProps["marginRight"]
   */
  spacing?: SystemProps["marginRight"]
}

const props = {
  isAttached: Boolean as PropType<ButtonGroupProps["isAttached"]>,
  isDisabled: Boolean as PropType<ButtonGroupProps["isDisabled"]>,
  spacing: {
    type: [String, Number, Array] as PropType<ButtonGroupProps["spacing"]>,
    default: 3,
  },
  ...vueThemingProps,
}

type ButtonGroupContext = ComputedRef<
  ThemingProps & {
    isDisabled?: boolean
  }
>

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupContext>(
  {
    strict: false,
    name: "ButtonGroupContext",
  }
)

const CButtonGroup: ComponentWithProps<ButtonGroupProps> = defineComponent({
  name: "CButtonGroup",
  props,
  setup(props, { attrs, slots }) {
    ButtonGroupProvider(
      // @ts-ignore
      computed(() => ({
        size: props.size,
        colorScheme: props.colorScheme,
        variant: props.variant,
        isDisabled: props.isDisabled,
      }))
    )

    const styles = computed(() => {
      let groupStyles: SystemStyleObject = {
        display: "inline-flex",
      }

      if (props.isAttached) {
        groupStyles = {
          ...groupStyles,
          "> *:first-of-type:not(:last-of-type)": { borderRightRadius: 0 },
          "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0 },
          "> *:not(:first-of-type):last-of-type": { borderLeftRadius: 0 },
        }
      } else {
        groupStyles = {
          ...groupStyles,
          "& > *:not(style) ~ *:not(style)": { marginLeft: props.spacing },
        }
      }

      return groupStyles
    })

    return () => {
      return (
        <chakra.div
          role="group"
          __label="button__group"
          __css={styles.value}
          {...attrs}
        >
          {() => getValidChildren(slots)}
        </chakra.div>
      )
    }
  },
})

export default CButtonGroup
export { useButtonGroup }
