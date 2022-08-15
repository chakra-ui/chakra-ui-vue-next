import {
  defineComponent,
  PropType,
  computed,
  h,
  Fragment,
  SetupContext,
} from "vue"
import {
  chakra,
  useStyleConfig,
  ThemingProps,
  SystemStyleObject,
  HTMLChakraProps,
  ComponentWithProps,
  DeepPartial,
} from "@chakra-ui/vue-system"
import { dataAttr, filterUndefined, mergeWith } from "@chakra-ui/utils"
import { useButtonGroup } from "./button-group"
import { CIcon, IconProps } from "@chakra-ui/c-icon"
import { CSpinner } from "@chakra-ui/c-spinner"
import { ButtonProps, defaultButtonProps } from "./button.utils"
import { SystemProps } from "@chakra-ui/styled-system"
import { SNAO, vueThemingProps, getValidChildren } from "@chakra-ui/vue-utils"

export interface CButtonSpinnerProps extends HTMLChakraProps<"div"> {
  label?: string
  spacing?: SystemProps["marginRight"]
  placement?: "start" | "end"
}
const CButtonSpinner: ComponentWithProps<DeepPartial<CButtonSpinnerProps>> =
  defineComponent({
    name: "CButtonSpinner",
    props: {
      label: Boolean as PropType<boolean>,
      spacing: [Number, String, Array] as PropType<
        number | string | string[] | number[]
      >,
      placement: String as PropType<"start" | "end">,
    },
    setup(props, { attrs }) {
      const marginProp = computed(() =>
        props.placement === "start" ? "marginEnd" : "marginStart"
      )
      const spinnerStyles = computed(() => ({
        display: "flex",
        alignItems: "center",
        position: props.label ? "relative" : "absolute",
        [marginProp.value]: props.label ? props.spacing || "0.5rem" : "0",
      }))

      return () => (
        // @ts-ignore
        <chakra.div
          __label="button__spinner"
          {...spinnerStyles.value}
          {...attrs}
        >
          <CSpinner width="1em" height="1em" />
        </chakra.div>
      )
    },
  })

interface CButtonContentProps {
  leftIcon?: string
  rightIcon?: string
  iconSpacing?: CButtonSpinnerProps["spacing"]
}
const CButtonContent = defineComponent({
  name: "CButtonContent",
  props: {
    leftIcon: String as PropType<CButtonContentProps["leftIcon"]>,
    rightIcon: String as PropType<CButtonContentProps["rightIcon"]>,
    iconSpacing: String as PropType<CButtonContentProps["iconSpacing"]>,
  },
  setup(props, { slots }) {
    return () => (
      <>
        {props.leftIcon && (
          <CButtonIcon icon={props.leftIcon} marginEnd={props.iconSpacing} />
        )}
        {slots?.default?.()}
        {props.rightIcon && (
          <CButtonIcon icon={props.rightIcon} marginStart={props.iconSpacing} />
        )}
      </>
    )
  },
})

/**
 * CButtonIcon
 *
 * Button icon component
 */
const CButtonIcon: ComponentWithProps<DeepPartial<IconProps>> = defineComponent(
  {
    name: "CButtonIcon",
    props: {
      icon: String as PropType<string>,
    },
    setup(props, { attrs }) {
      return () => <CIcon __label="button__icon" name={props.icon} {...attrs} />
    },
  }
)

export interface CButtonProps extends HTMLChakraProps<"button"> {}

/**
 * CButton
 *
 * The Button component is used to trigger an action or event,
 * such as submitting a form, opening a dialog, canceling
 * an action, or performing a delete operation.
 */
export const CButton: ComponentWithProps<DeepPartial<CButtonProps>> =
  defineComponent({
    name: "CButton",
    props: {
      isLoading: {
        type: Boolean as PropType<ButtonProps["isLoading"]>,
      },
      isDisabled: {
        type: Boolean as PropType<ButtonProps["isDisabled"]>,
      },
      isActive: {
        type: Boolean as PropType<ButtonProps["isActive"]>,
      },
      loadingText: {
        type: String as PropType<ButtonProps["loadingText"]>,
      },
      isFullWidth: {
        type: Boolean as PropType<ButtonProps["isFullWidth"]>,
      },
      type: {
        type: String as PropType<ButtonProps["type"]>,
      },
      leftIcon: {
        type: String as PropType<ButtonProps["leftIcon"]>,
      },
      rightIcon: {
        type: String as PropType<ButtonProps["rightIcon"]>,
      },
      iconSpacing: {
        type: SNAO as PropType<ButtonProps["iconSpacing"]>,
      },
      spinnerPlacement: {
        type: String as PropType<"start" | "end">,
        default: "start",
      },
      ...vueThemingProps,
    },
    setup(_props, { attrs, slots }) {
      const props = computed(() =>
        mergeWith({}, defaultButtonProps, _props, attrs)
      )
      const themingProps = computed<ThemingProps>(() =>
        filterUndefined({
          colorScheme: props.value.colorScheme,
          variant: props.value.variant,
          size: props.value.size,
          styleConfig: props.value.styleConfig,
        })
      )

      const group = useButtonGroup()
      const styles = useStyleConfig(
        "Button",
        computed(() => ({ ...group?.value, ...themingProps.value }))
      )

      const _focus = computed<SystemStyleObject>(() =>
        mergeWith({}, styles.value?.["_focus"] ?? {}, {
          zIndex: 1,
        })
      )

      const buttonStyles = computed<SystemStyleObject>(() => ({
        display: "inline-flex",
        appearance: "none",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 250ms",
        userSelect: "none",
        position: "relative",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        outline: "none",
        width: props.value.isFullWidth ? "100%" : "auto",
        ...styles.value,
        ...(!!group?.value && { _focus: _focus.value }),
      }))

      return () => {
        return (
          <chakra.button
            as={props.value.as}
            label="button"
            {...((props.value.isDisabled || props.value.isLoading) && {
              disabled: props.value.isDisabled || props.value.isLoading,
            })}
            type={props.value.as === "button" ? undefined : props.value.type}
            data-active={dataAttr(props.value.isActive)}
            data-loading={dataAttr(props.value.isLoading)}
            __css={buttonStyles.value}
            {...attrs}
          >
            {() => (
              <>
                {props.value.isLoading &&
                  props.value.spinnerPlacement === "start" && (
                    <CButtonSpinner
                      placement="start"
                      spacing={props.value.iconSpacing}
                      __label="button-spinner__start"
                      label={props.value.loadingText}
                      __css={{
                        fontSize: "1em",
                        lineHeight: "normal",
                      }}
                    />
                  )}

                {props.value.isLoading ? (
                  props.value.loadingText || (
                    <chakra.span opacity={0}>
                      <CButtonContent
                        leftIcon={props.value.leftIcon}
                        rightIcon={props.value.rightIcon}
                        iconSpacing={props.value.iconSpacing}
                      >
                        {slots?.default?.()}
                      </CButtonContent>
                    </chakra.span>
                  )
                ) : (
                  <CButtonContent
                    leftIcon={props.value.leftIcon}
                    rightIcon={props.value.rightIcon}
                    iconSpacing={props.value.iconSpacing}
                  >
                    {() => getValidChildren(slots)}
                  </CButtonContent>
                )}
                {props.value.isLoading &&
                  props.value.spinnerPlacement === "end" && (
                    <CButtonSpinner
                      placement="end"
                      spacing={props.value.iconSpacing}
                      __label="button-spinner__end"
                      label={props.value.loadingText}
                      __css={{
                        fontSize: "1em",
                        lineHeight: "normal",
                      }}
                    />
                  )}
              </>
            )}
          </chakra.button>
        )
      }
    },
  })

export default CButton
