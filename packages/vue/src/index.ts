import { computed, createVNode, Plugin, ref, render, UnwrapRef } from "vue"
import { theme as defaultTheme, baseTheme, Theme } from "@chakra-ui/theme"
import { ColorModeRef, setupColorModeContext } from "@chakra-ui/c-color-mode"
import { toCSSVar, WithCSSVar } from "@chakra-ui/styled-system"
import {
  chakra,
  createCache,
  chakraEmotionCache,
  injectGlobal,
} from "@chakra-ui/vue-system"
import {
  EmotionThemeContextSymbol,
  EmotionCacheInjectionSymbol,
} from "@chakra-ui/vue-styled"
import type { EmotionCache } from "@emotion/cache"
import internalIcons from "./icon.internals"
import type { ThemeOverride } from "@chakra-ui/theme-utils"
import { MergedIcons, parseIcons } from "./parse-icons"
import { injectResetStyles, injectThemeGlobalStyles } from "./helpers/css-reset"
import { mode } from "@chakra-ui/theme-tools"
import { ChakraPluginOptions } from "./helpers/plugin.types"
import { canUseDOM, Dict } from "@chakra-ui/utils"
import { localStorageManager } from "@chakra-ui/c-color-mode"
import {
  ToastContainerId,
  CToastContainer,
  ToastContextSymbol,
  toastContext,
} from "@chakra-ui/c-toast"

/**
 * 1. Support passing cache options from plugin
 * 2. Provide emotion theme directly from plugin
 * 3.
 */

const defaultPluginOptions: ChakraPluginOptions = {
  cssReset: true,
  isBaseTheme: false,
  colorModeManager: localStorageManager,
}

/**
 * Helper function to extend Chakra plugin with options
 * It just returns its arguments with typescript types added
 */
export function extendChakra(options = defaultPluginOptions) {
  return options
}

const ChakraUIVuePlugin: Plugin = {
  install(app, options: ChakraPluginOptions = defaultPluginOptions) {
    // 1. Get theme value
    // 2. Parse theme tokens to CSS variables
    // 3. Inject all CSS variables as theme object
    const theme =
      options.extendTheme! ||
      ((options.isBaseTheme ? baseTheme : defaultTheme) as any as
        | Theme
        | (Omit<Theme, "components"> & { components: Dict }))
    const computedTheme = computed<WithCSSVar<ThemeOverride>>(() =>
      toCSSVar(theme)
    )

    const colorModeManager = options.colorModeManager || localStorageManager
    // Inject Chakra CSS variables
    injectGlobal({
      ":root": computedTheme.value.__cssVars,
    })

    // Initialize color mode
    const colorMode: UnwrapRef<ColorModeRef> =
      theme.config?.initialColorMode || "light"

    const colorModeRef = ref(colorMode) as ColorModeRef

    setupColorModeContext(app, {
      _colorMode: colorModeRef,
      colorModeManager,
      useSystemColorMode: theme.config?.useSystemColorMode || false,
      initialColorMode: colorMode,
      disableTransitionOnChange:
        theme.config?.disableTransitionOnChange || false,
    })

    if (options.cssReset) {
      injectResetStyles()
    }

    let libraryIcons = options.icons?.library || {}
    let extendedIcons = options.icons?.extend || {}

    // Bind theme to application global properties and provide to application
    app.config.globalProperties.$chakraTheme = computedTheme.value
    app.config.globalProperties.$chakraTheme = computedTheme.value
    app.provide(EmotionThemeContextSymbol, computedTheme.value)
    app.provide("$chakraTheme", computedTheme.value as ThemeOverride)

    let emotionCache: EmotionCache
    // Provide emotion cache
    if (options.emotionCacheOptions) {
      emotionCache = createCache(options.emotionCacheOptions)
      app.provide(EmotionCacheInjectionSymbol, emotionCache)
    }

    emotionCache ||= chakraEmotionCache

    // Inject `styles.global` in document
    injectThemeGlobalStyles(computedTheme.value, emotionCache, colorModeRef)

    libraryIcons = parseIcons(libraryIcons)

    // Merge internal icons and library icons
    const mergedIcons: MergedIcons = {
      ...internalIcons,
      ...libraryIcons,
      ...extendedIcons,
    }

    app.provide("$chakraIcons", mergedIcons)

    // Set color mode property
    app.config.globalProperties.$mode = mode

    app.provide(ToastContextSymbol, toastContext)

    // Setup toast container component
    if (canUseDOM()) {
      const toastContainer =
        document.getElementById(ToastContainerId) ||
        document.createElement("div")
      toastContainer.id = ToastContainerId
      toastContainer.setAttribute("data-chakra-toast-container", "")

      if (!document.body.contains(toastContainer)) {
        document.body.insertAdjacentElement("afterend", toastContainer)
      }

      const vnode = createVNode(CToastContainer)
      vnode.appContext = app._context
      render(vnode, toastContainer)
    }
  },
}

export type { ChakraPluginOptions }
export interface ThemeProviderProps extends ThemeOverride {}
export default ChakraUIVuePlugin
export { extendTheme, extendBaseTheme } from "@chakra-ui/theme-utils"
export * from "@chakra-ui/vue-system"

// Export chakra factory function
export { chakra as chakra }

import * as ChakraComponents from "./components"
export { ChakraComponents }

/**
 *
 * Component exports
 * ==================
 *
 * Dear contributors,
 *
 * Please keep these exports in Alphabetical order :)
 */

// A
export {
  type ExpandedValues,
  type CAccordionProps,
  type CAccordionContext,
  type CAccordionItemProps,
  type CAccordionItemContext,
  type CAccordionButtonProps,
  type CAccordionPanelProps,
  type CAccordionIconProps,
  CAccordion,
  CAccordionItem,
  CAccordionButton,
  CAccordionPanel,
  CAccordionIcon,
} from "@chakra-ui/c-accordion"
export {
  CAlert,
  CAlertTitle,
  CAlertDescription,
  CAlertIcon,
} from "@chakra-ui/c-alert"
export {
  type AvatarOptions,
  type CAvatarContext,
  type CAvatarProps,
  type AvatarBadgeProps,
  AvatarStylesProvider,
  useAvatarStyles,
  AvatarContextProvider,
  useAvatarContext,
  CAvatar,
  CAvatarBadge,
  CAvatarGroup,
  avatarGroupProps,
} from "@chakra-ui/c-avatar"

// B
export {
  type BreadcrumbOptions,
  type BreadcrumbProps,
  type BreadcrumbSeparatorProps,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  CBreadcrumb,
  CBreadcrumbSeparator,
  CBreadcrumbItem,
  CBreadcrumbLink,
} from "@chakra-ui/c-breadcrumb"
export {
  type CButtonSpinnerProps,
  type CButtonProps,
  type ButtonGroupProps,
  type CIconButtonProps,
  CButton,
  CButtonGroup,
  useButtonGroup,
  CIconButton,
} from "@chakra-ui/c-button"

// C
export {
  type CCheckboxControlProps,
  type CCheckboxProps,
  type CCheckboxGroupProps,
  type CheckboxGroupContext,
  CCheckbox,
  CCheckboxGroup,
  useCheckboxGroupContext,
} from "@chakra-ui/c-checkbox"
export {
  type ColorModeOptions,
  type ColorModeContext,
  type InternalColorModeContext,
  type IColorModeContext,
  type ColorModeScriptProps,
  AppColorModeContextSymbol,
  setupColorModeContext,
  useColorMode,
  useColorModeValue,
  CDarkMode,
  CLightMode,
  ColorModeConstants,
  getScriptSrc,
  mountColorModeScript,
  STORAGE_KEY,
  type StorageManager,
  createLocalStorageManager,
  localStorageManager,
  createCookieStorageManager,
  cookieStorageManager,
  cookieStorageManagerSSR,
} from "@chakra-ui/c-color-mode"
export { type CloseButtonProps, CCloseButton } from "@chakra-ui/c-close-button"
export { CCode } from "@chakra-ui/c-code"

// F
export {
  CFocusLock,
  type FocusLockProps,
  useFocusTrap,
  useReturnFocusSelector,
} from "@chakra-ui/c-focus-lock"
export {
  CFormControl,
  type CFormControlProps,
  type CFormControlProviderContext,
  CFormErrorIcon,
  CFormErrorMessage,
  type CFormErrorMessageProps,
  CFormHelperText,
  CFormLabel,
  type CHelpTextProps,
  CRequiredIndicator,
  type CRequiredIndicatorProps,
  type FormControlContext,
  type FormControlOptions,
  FormControlProvider,
  type FormLabelProps,
  type UseFormControlProps,
  formControlProps,
  useFormControl,
  useFormControlContext,
  useFormControlProps,
  useFormControlProvider,
} from "@chakra-ui/c-form-control"

// I
export {
  CIcon,
  type CreateIconOptions,
  type IconProps,
  _iconProps,
  createIcon,
  createIconComponent,
} from "@chakra-ui/c-icon"
export {
  CImage,
  type CImageProps,
  CImg,
  type CImgProps,
  type FallbackStrategy,
  type UseImageProps,
  shouldShowFallbackImage,
  useImage,
} from "@chakra-ui/c-image"
export {
  CInput,
  CInputAddon,
  type CInputAddonProps,
  type CInputElementProps,
  CInputGroup,
  type CInputGroupProps,
  CInputLeftAddon,
  CInputLeftElement,
  type CInputProps,
  CInputRightAddon,
  CInputRightElement,
} from "@chakra-ui/c-input"

// L
export {
  type AspectRatioProps,
  type BadgeProps,
  type BoxProps,
  CAspectRatio,
  CBadge,
  CBox,
  CCenter,
  type CCenterProps,
  CCircle,
  CContainer,
  CDivider,
  CFlex,
  CGrid,
  CGridItem,
  type CGridItemProps,
  type CGridProps,
  CHStack,
  CHeading,
  CKbd,
  CLink,
  CLinkBox,
  CLinkOverlay,
  CList,
  CListIcon,
  CListItem,
  type CListProps,
  COrderedList,
  CSimpleGrid,
  CSpacer,
  CSquare,
  CStack,
  CStackDivider,
  CStackItem,
  CText,
  CUnorderedList,
  CVStack,
  CWrap,
  CWrapItem,
  type ContainerProps,
  type DividerProps,
  type FlexProps,
  type GridOptions,
  type HeadingProps,
  type KbdProps,
  type LinkBoxProps,
  type LinkOverlayProps,
  type LinkProps,
  type SimpleSystemProps,
  type SpacerProps,
  type SquareProps,
  type StackDividerProps,
  type StackProps,
  type TextProps,
  type WrapItemProps,
  type WrapProps,
  wrapProps,
} from "@chakra-ui/vue-layout"

// M
export {
  CHide,
  CShow,
  CVisibility,
  useQuery,
  type CHideProps,
  type CShowProps,
  type CVisbilityProps,
  type UseQueryProps,
} from "@chakra-ui/c-media-query"
export {
  CMenu,
  CMenuDivider,
  CMenuGroup,
  CMenuItem,
  CMenuList,
  CMenuTrigger,
  CSubMenu,
  CSubMenuItem,
  CSubMenuList,
  CSubMenuTrigger,
  MenuProvider,
  useMenu,
} from "@chakra-ui/c-menu"
export {
  CAlertDialog,
  CAlertDialogBody,
  CAlertDialogCloseButton,
  CAlertDialogContent,
  CAlertDialogFooter,
  CAlertDialogHeader,
  CAlertDialogOverlay,
  CDrawer,
  CDrawerBody,
  CDrawerCloseButton,
  CDrawerContent,
  CDrawerFooter,
  CDrawerHeader,
  CDrawerOverlay,
  CModal,
  CModalBody,
  CModalCloseButton,
  CModalContent,
  CModalFooter,
  CModalHeader,
  CModalOverlay,
  ModalContextProvider,
  modalProps,
  useModalContext,
  type CAlertDialogProps,
  type CModalContentProps,
  type CModalProps,
  type DrawerContentProps,
  type DrawerProps,
  type ModalOptions,
} from "@chakra-ui/c-modal"
export {
  CAnimatePresence,
  CCollapse,
  CMotion,
  TransitionDefaults,
  TransitionEasings,
  TransitionVariants,
  placementToVariant,
  slideTransition,
  variants,
  type CMotionVariant,
  type CollapseOptions,
  type SlideDirection,
} from "@chakra-ui/c-motion"

// P
export {
  CPinInput,
  CPinInputClearButton,
  CPinInputField,
  CPinInputProps,
  PinInputProvider,
  usePinInput,
} from "@chakra-ui/c-pin-input"
export {
  popperCSSVars,
  usePopper,
  type Placement,
  type UsePopperOptions,
  type UsePopperReturn,
} from "@chakra-ui/c-popper"
export { CPortal, type CPortalProps } from "@chakra-ui/c-portal"

// R
export { CReset, cssResetStyles } from "@chakra-ui/c-reset"

// S
export {
  CSkipNavContent,
  CSkipNavLink,
  type CSkipNavContentProps,
  type CSkipNavLinkProps,
} from "@chakra-ui/c-skip-nav"
export { CSpinner, type CSpinnerProps } from "@chakra-ui/c-spinner"
export {
  BodyScrollLockDirective,
  CScrollLock,
  useBodyScrollLock,
} from "@chakra-ui/c-scroll-lock"

// T
export {
  CThemeProvider,
  type CThemeProviderProps,
} from "@chakra-ui/c-theme-provider"
export {
  CTag,
  CTagCloseButton,
  CTagCloseIcon,
  CTagLabel,
  CTagLeftIcon,
  CTagRightIcon,
  type CTagCloseButtonProps,
  type CTagLabelProps,
  type CTagProps,
} from "@chakra-ui/c-tag"
export {
  CPresenceGroup,
  CToast,
  CToastContainer,
  ToastContainerId,
  ToastContextSymbol,
  __toast__,
  createStandAloneToast,
  getToastsByPlacement,
  globalToastMachine,
  placements,
  toastContext,
  toastStore,
  useMachine,
  useService,
  useToast,
  type CToastProps,
  type IToastContext,
  type ToastPlacement,
} from "@chakra-ui/c-toast"

// V
export {
  CVisuallyHidden,
  CVisuallyHiddenInput,
  visuallyHiddenStyle,
} from "@chakra-ui/c-visually-hidden"

// OTHERS
export {
  hideOthers,
  useInertOthers,
  type Undo,
} from "@chakra-ui/vue-accessibilty"
export {
  StackMessage,
  useClipboard,
  useCounter,
  useDisclosure,
  useElementStack,
  useEventListener,
  useId,
  useIds,
  useMediaQuery,
  useStackContext,
  useStackProvider,
  useSupported,
  useWindowEvent,
  type DocumentEventName,
  type GeneralEventListener,
  type UseCounterProps,
  type UseDisclosureProps,
  type WindowEventName,
} from "@chakra-ui/vue-composables"
export {
  SAO,
  SNA,
  SNAO,
  getSelector,
  tryOnScopeDispose,
  extractStyleAttrs,
  camelCase,
  canUseDOM,
  contains,
  createContext,
  getValidChildren,
  isObjectComponent,
  debounce,
  defaultDocument,
  defaultLocation,
  defaultNavigator,
  defaultWindow,
  useDebouncedRef,
  focusElement,
  focusIn,
  genId,
  match,
  mergeWith,
  tryOnMounted,
  tryOnBeforeMount,
  tryOnBeforeUnmount,
  tryOnUnmounted,
  useThemingProps,
  vueThemingProps,
  orient,
  resolveRef,
  unrefElement,
  useRef,
  type AnyFn,
  type Arrayable,
  type BaseThemedComponentProps,
  type ConfigurableDocument,
  type ConfigurableDocumentOrShadowRoot,
  type ConfigurableLocation,
  type ConfigurableNavigator,
  type ConfigurableWindow,
  type CouldBeObjectComponent,
  type CreateContextOptions,
  type DebouncedRef,
  type DeepMaybeRef,
  type Fn,
  type Focus,
  type FocusResult,
  type Keys,
  type MaybeBaseRef,
  type MaybeComputedRef,
  type MaybeElementRef,
  type MaybeReadonlyRef,
  type MaybeRef,
  type MergedVNodeProps,
  type RemovableRef,
  type StyleAndHTMLAttibutes,
  type TemplateRef,
  type VueComponentInstance,
  type RemoveableRef,
} from "@chakra-ui/vue-utils"

/**
 *
 * Directives exports
 * ==================
 *
 * Dear contributors,
 *
 * Please keep these exports in Alphabetical order :)
 */
