import { SystemStyleObject } from "@chakra-ui/styled-system"
import { warn } from "@chakra-ui/utils"
import { chakra, HTMLChakraProps } from "@chakra-ui/vue-system"
import {
  computed,
  defineComponent,
  getCurrentInstance,
  PropType,
  h,
  Fragment,
} from "vue"
import { useAvatarStyles } from "./c-avatar"

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

export interface AvatarBadgeProps extends HTMLChakraProps<"div"> {
  placement?: BadgePlacement
}

/**
 * CAvatarBadge used to show extra badge to the top-right
 * or bottom-right corner of an avatar.
 */

export const CAvatarBadge = defineComponent({
  name: "CAvatarBadge",
  props: {
    placement: {
      type: String as PropType<BadgePlacement>,
      default: "bottom-end",
    },
  },
  setup(props, { attrs, slots }) {
    const styles = useAvatarStyles()

    const instance = getCurrentInstance()

    warn.bind(instance)({
      condition: !Object.keys(placementMap).includes(props.placement),
      message: `<CAvatarBadge /> expects a placement value of ${Object.keys(
        placementMap
      ).join(", ")}. Instead got "${props.placement}"`,
    })

    const badgeStyles = computed<SystemStyleObject>(() => ({
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSize: "1em",
      ...(placementMap[props.placement] || {}),
      ...styles.value.badge,
    }))

    return () => (
      <chakra.div
        __label={"avatar__badge"}
        __css={badgeStyles.value}
        {...attrs}
      >
        {slots?.default?.()}
      </chakra.div>
    )
  },
})
