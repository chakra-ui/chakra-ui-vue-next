import { h, defineComponent, PropType, computed, Fragment } from "vue"
import {
  chakra,
  ChakraProps,
  ComponentWithProps,
  SystemStyleObject,
  ThemingProps,
  useStyles,
} from "@chakra-ui/vue-system"
import { getValidChildren, vueThemingProps } from "@chakra-ui/vue-utils"

type BadgePlacement = "top-start" | "top-end" | "bottom-start" | "bottom-end"

const placementMap: Record<BadgePlacement, SystemStyleObject> = {
  "top-start": {
    top: "0",
    insetStart: "0",
    transform: "translate(-25%, -25%)",
  },
  "top-end": {
    top: "0",
    insetEnd: "0",
    transform: "translate(25%, -25%)",
  },
  "bottom-start": {
    bottom: "0",
    insetStart: "0",
    transform: "translate(-25%, 25%)",
  },
  "bottom-end": {
    bottom: "0",
    insetEnd: "0",
    transform: "translate(25%, 25%)",
  },
}

export interface AvatarBadgeProps
  extends ChakraProps,
    ThemingProps<"CAvatarBadge"> {
  placement?: BadgePlacement
}

const CAvatarBadgeProps = {
  placement: String as PropType<BadgePlacement>,
  ...vueThemingProps,
}

export const CAvatarBadge: ComponentWithProps<typeof CAvatarBadgeProps> =
  defineComponent({
    props: {
      ...CAvatarBadgeProps,
    },
    setup(props, { slots, attrs }) {
      const styles = useStyles()
      const placementStyles = computed(
        () => placementMap[props.placement || "bottom-end"] || "bottom-end"
      )

      const badgeStyles = computed(() => ({
        ...styles.value.badge,
        ...placementStyles.value,
      }))
      return () => (
        <chakra.div
          __label="avatar-badge"
          __css={badgeStyles.value}
          {...props}
          {...attrs}
        >
          {getValidChildren(slots)}
        </chakra.div>
      )
    },
  })
