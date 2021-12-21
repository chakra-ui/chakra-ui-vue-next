import { computed, h, defineComponent, PropType } from 'vue';
import { chakra, HTMLChakraProps, SystemStyleObject, useStyles } from '@chakra-ui/vue-system';

export interface CInputElementProps extends HTMLChakraProps<"div"> {
  placement?: "left" | "right"
}

const CStyledElement = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    zIndex: 2,
  },
})

const CInputElement = defineComponent({
  name: "CInputElement",
  props: {
    placement: {
      type: String as PropType<CInputElementProps['placement']>,
      default: 'left'
    }
  },
  setup(props, { attrs, slots }) {
    const styles = useStyles()
    const elementStyles = computed<SystemStyleObject>(() => {
      const input: any = styles.value?.field
      const attr = props.placement === "left" ? "insetStart" : "insetEnd"

      return {
        [attr]: "0",
        width: input?.height || input.h,
        height: input?.height || input?.h,
        fontSize: input?.fontSize
      }
    })

    return () => (
      <CStyledElement __css={elementStyles.value} {...attrs}>{slots}</CStyledElement>
    )
  }
})

// This is used in `c-input-group.tsx`
CInputElement.id = "CInputElement"

export const CInputLeftElement = defineComponent({
  name: 'CInputLeftElement',
  setup(_, { attrs, slots }) {
    return () => (
      <CInputElement placement="left" __label="input__left-element" {...attrs}>
        {slots}
      </CInputElement>
    )
  }
})

// This is used in `c-input-group.tsx`
CInputLeftElement.id = "CInputLeftElement"

export const CInputRightElement = defineComponent({
  name: 'CInputRightElement',
  setup(_, { attrs, slots }) {
    return () => (
      <CInputElement placement="right" __label="input__right-element" {...attrs}>
        {slots}
      </CInputElement>
    )
  }
})

// This is used in `c-input-group.tsx`
CInputRightElement.id = "CInputRightElement"
