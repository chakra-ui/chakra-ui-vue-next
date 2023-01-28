import {
  computed,
  ComputedRef,
  defineComponent,
  PropType,
  h,
  unref,
  withDirectives,
  watch,
  watchEffect,
  StyleValue,
} from "vue"
import {
  SlideDirection,
  TransitionVariants,
  slideTransition,
  placementToVariant,
} from "@chakra-ui/c-motion"
import { createContext } from "@chakra-ui/vue-utils"
import {
  chakra,
  HTMLChakraProps,
  SystemStyleObject,
  useStyles,
  useTheme,
} from "@chakra-ui/vue-system"

import {
  CModal,
  CModalBody,
  CModalCloseButton,
  CModalFooter,
  CModalHeader,
  CModalOverlay,
  CModalProps,
  modalProps,
  useModalContext,
} from "./c-modal"
import { MotionDirective, useMotions } from "@vueuse/motion"
import { useId } from "@chakra-ui/vue-composables"

interface DrawerOptions {
  /**
   * The placement of the drawer
   */
  placement?: SlideDirection
  /**
   * If `true` and drawer's placement is `top` or `bottom`,
   * the drawer will occupy the viewport height (100vh)
   */
  isFullHeight?: boolean
}

export interface DrawerProps extends Omit<CModalProps, "scrollBehavior"> {
  /**
   * The placement of the drawer
   */
  placement?: SlideDirection
  /**
   * If `true` and drawer's placement is `top` or `bottom`,
   * the drawer will occupy the viewport height (100vh)
   */
  isFullHeight?: boolean

  modelValue: boolean
}

type CDrawerContext = ComputedRef<DrawerOptions>

const [CDrawerContextProvider, useDrawerContext] =
  createContext<CDrawerContext>()

export const CDrawer = defineComponent({
  name: "CDrawer",
  props: {
    ...modalProps,
    placement: {
      type: String as PropType<SlideDirection>,
      default: "right",
    },
    isFullHeight: Boolean as PropType<boolean>,
  },
  emits: ["update:modelValue", "close", "escape"],
  setup(props, { slots, attrs, emit }) {
    const isOpen = computed(() => props.modelValue!)

    const handleUpdateModelValue = (val: boolean) => {
      emit("update:modelValue", val)
    }

    const context: CDrawerContext = computed(() => ({
      placement: props.placement,
      motionPreset: "scale",
    }))

    const theme = useTheme()
    const drawerStyleConfig = theme.components?.Drawer

    CDrawerContextProvider(context)

    return () => {
      const {
        modelValue,
        "onUpdate:modelValue": updateModelValue,
        ...rest
      } = props
      return (
        <CModal
          {...rest}
          {...attrs}
          modelValue={isOpen.value}
          /* eslint-disable-next-line */
          onUpdate:modelValue={handleUpdateModelValue}
          label="drawer"
          // @ts-ignore
          styleConfig={drawerStyleConfig}
        >
          {slots}
        </CModal>
      )
    }
  },
})

export interface DrawerContentProps extends HTMLChakraProps<"section"> {}

export const CDrawerContent = defineComponent({
  name: "CDrawerContent",
  inheritAttrs: false,
  emits: ["click", "mousedown", "keydown"],
  setup(_, { attrs, slots, emit }) {
    const {
      dialogContainerProps: rawDialogContainerProps,
      dialogProps: rawDialogProps,
      modelValue,
      blockScrollOnMount,
    } = unref(useModalContext())
    const transitionId = useId("drawer-transition")

    const containerProps = computed(() =>
      rawDialogContainerProps.value({ emit })
    )
    const dialogProps = computed(() => rawDialogProps.value({ emit }))
    const { placement } = unref(useDrawerContext())

    // Styles
    const styles = useStyles()
    const dialogContainerStyles = computed<SystemStyleObject>(() => ({
      display: "flex",
      width: "100vw",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      ...styles.value.dialogContainer,
    }))

    const dialogStyles = computed<SystemStyleObject>(() => ({
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      ...styles.value.dialog,
    }))

    // Scroll lock
    watchEffect((onInvalidate) => {
      if (!blockScrollOnMount!.value) return
      if (modelValue.value !== true) return

      let overflow = document.documentElement.style.overflow
      let paddingRight = document.documentElement.style.paddingRight

      let scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth

      document.documentElement.style.overflow = "hidden"
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`

      onInvalidate(() => {
        document.documentElement.style.overflow = overflow
        document.documentElement.style.paddingRight = paddingRight
      })
    })

    /** Handles exit transition */
    const leave = (done: VoidFunction) => {
      const motions = useMotions()
      const instance = motions[transitionId.value]
      instance?.leave(() => {
        done()
      })
    }

    watch(modelValue!, (newVal) => {
      if (!newVal) {
        leave(() => null)
      }
    })

    const transitionStyles = computed<object>(() => {
      const transitionStyles = slideTransition({ direction: placement })
      const result = Object.assign(
        { position: "fixed" },
        transitionStyles.position
      )
      return result
    })

    const transitionVariant = computed(() => placementToVariant(placement!))

    return () => {
      return (
        <chakra.div
          {...containerProps.value}
          __label="modal__content-container"
          __css={dialogContainerStyles.value}
        >
          {modelValue!.value &&
            withDirectives(
              <chakra.section
                {...dialogProps.value}
                style={transitionStyles.value as StyleValue}
                __css={dialogStyles.value}
                {...attrs}
              >
                {slots}
              </chakra.section>,
              [
                [
                  MotionDirective(TransitionVariants[transitionVariant.value]),
                  transitionId.value,
                ],
              ]
            )}
        </chakra.div>
      )
    }
  },
})

export const CDrawerBody = Object.assign(
  {
    name: "CDrawerBody",
  },
  CModalBody
)
CDrawerBody.name = "CAlertDialogBody"

export const CDrawerCloseButton = Object.assign(
  {
    name: "CDrawerCloseButton",
  },
  CModalCloseButton
)
CDrawerCloseButton.name = "CDrawerCloseButton"

export const CDrawerFooter = Object.assign(
  {
    name: "CDrawerFooter",
  },
  CModalFooter
)
CDrawerFooter.name = "CDrawerFooter"

export const CDrawerHeader = Object.assign(
  {
    name: "CDrawerHeaderr",
  },
  CModalHeader
)
CDrawerHeader.name = "CDrawerHeader"

export const CDrawerOverlay = Object.assign(
  {
    name: "CDrawerOverlay",
  },
  CModalOverlay
)
CDrawerOverlay.name = "CDrawerOverlay"
