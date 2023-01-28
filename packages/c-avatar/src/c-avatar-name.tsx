import {
  chakra,
  ComponentWithProps,
  DeepPartial,
  HTMLChakraProps,
} from "@chakra-ui/vue-system"
import { defineComponent, PropType, h, Fragment } from "vue"
import { AvatarOptions, useAvatarStyles } from "./c-avatar"
import { initials } from "./utils"

export interface CAvatarNameProps
  extends HTMLChakraProps<"div">,
    Pick<AvatarOptions, "name" | "initials"> {}

/**
 * The avatar name container
 */
export const CAvatarName = defineComponent({
  name: "CAvatarName",
  props: {
    name: {
      type: String as PropType<AvatarOptions["name"]>,
      default: "",
    },
    initials: {
      type: String as PropType<AvatarOptions["initials"]>,
      default: "",
    },
  },
  setup(props, { attrs }) {
    const styles = useAvatarStyles()
    return () => (
      <chakra.div
        role="img"
        aria-label={props.name!}
        {...attrs}
        __css={styles.value.label}
      >
        {initials(props.name!)}
      </chakra.div>
    )
  },
})
