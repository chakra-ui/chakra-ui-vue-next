import { defineComponent, h, PropType, computed } from 'vue'
import { chakra, HTMLChakraProps, useStyles } from "@chakra-ui/vue-system"
import { warn } from '@chakra-ui/utils'

type Placement = "left" | "right"

const placements = {
  left: {
    marginEnd: "-1px",
    borderEndRadius: 0,
    borderEndColor: "transparent",
  },
  right: {
    marginStart: "-1px",
    borderStartRadius: 0,
    borderStartColor: "transparent",
  },
}

const CStyledAddon = chakra("div", {
  baseStyle: {
    flex: "0 0 auto",
    width: "auto",
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
})

export interface CInputAddonProps extends HTMLChakraProps<'div'> {
  placement?: Placement
}

/**
 * CInputAddon
 *
 * Element to append or prepend to an input
 */
export const CInputAddon = defineComponent({
  name: 'CInputAddon',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'left'
    },
  },
  setup(props, { slots, attrs }) {
    try {
    const placementStyles = computed(() => placements[props.placement])
      const styles = useStyles()
      return () => (
        <CStyledAddon
          __css={{
          ...styles.value.addon,
          ...placementStyles.value
        }}
        {...attrs}
        >
          {slots}
        </CStyledAddon>
      )
    } catch (error: any) {
      warn({
        condition: !!error,
        message: "`CInputAddon` can only be used inside the `CInputGroup` component.",
      })
      console.error(error)
      return () => null
    }
  }
})

/**
 * CInputLeftAddon
 *
 * Element to prepend to the left of an input
 */
export const CInputLeftAddon = defineComponent({
  name: 'CInputLeftAddon',
  setup(_, { slots, attrs }) {
    return () => (
      <CInputAddon placement="left" __label="input__left-addon" {...attrs}>
        {slots}
      </CInputAddon>
    )
  }
})

CInputLeftAddon.id = "CInputLeftAddon"

/**
 * CInputRightAddon
 *
 * Element to append to the right of an input
 */
export const CInputRightAddon = defineComponent({
  name: 'CInputRightAddon',
  setup(_, { slots, attrs }) {
    return () => (
      <CInputAddon placement="right" __label="input__right-addon" {...attrs}>
        {slots}
      </CInputAddon>
    )
  }
})

CInputRightAddon.id = "CInputRightAddon"