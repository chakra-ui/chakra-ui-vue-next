import { filterUndefined } from "@chakra-ui/utils"
import {
  chakra,
  HTMLChakraProps,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/vue-system"
import { getValidChildren, vueThemingProps } from "@chakra-ui/vue-utils"
import {
  computed,
  h,
  Fragment,
  defineComponent,
  mergeProps,
  VNode,
  cloneVNode,
} from "vue"

export interface CInputGroupProps
  extends HTMLChakraProps<"div">,
  ThemingProps<"Input"> { }

export const CInputGroup = defineComponent({
  name: "CInputGroup",
  props: {
    ...vueThemingProps,
  },
  setup(props, { slots, attrs }) {
    const styleAttrs = computed(() => mergeProps(attrs, props))
    const styles = useMultiStyleConfig("Input", styleAttrs)
    const input = computed(() => styles.value?.field)
    const unthemedProps = computed(() => omitThemingProps(styleAttrs.value))

    StylesProvider(styles)

    return () => {
      const groupStyles = {} as CInputGroupProps
      const validChildren = getValidChildren(slots)
      validChildren.forEach((vnode) => {
        if (!styles.value) return
        // @ts-expect-error Here we internally check for the appended `id` prop to the component
        if (input.value && vnode.type.id === "CInputLeftElement") {
          // @ts-expect-error
          groupStyles.paddingStart = input.value.height || input.value.h
        }
        // @ts-expect-error
        if (input.value && vnode.type.id === "CInputRightElement") {
          // @ts-expect-error
          groupStyles.paddingEnd = input.value.height || input.value.h
        }
        // @ts-expect-error
        if (input.value && vnode.type.id === "CInputLeftAddon") {
          groupStyles.borderEndRadius = 0
        }
        // @ts-expect-error
        if (input.value && vnode.type.id === "CInputRightAddon") {
          groupStyles.borderStartRadius = 0
        }
      })

      const clones = validChildren.map((vnode: VNode) => {
        const theming = filterUndefined({
          size: vnode.props?.size || props.size,
          variant: vnode.props?.size || props.variant,
        })

        // @ts-ignore
        return vnode.type?.name !== "CInput"
          ? cloneVNode(vnode, theming)
          : cloneVNode(
            vnode,
            Object.assign(
              theming,
              groupStyles
              // vnode.props
            )
          )
      })

      return (
        <chakra.div
          __label="input__group"
          __css={{
            width: "100%",
            display: "flex",
            position: "relative",
          }}
          {...unthemedProps.value}
        >
          {() => clones}
        </chakra.div>
      )
    }
  },
})
