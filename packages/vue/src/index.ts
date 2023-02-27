import { chakra } from "@chakra-ui/vue-system"
import type { ThemeOverride } from "@chakra-ui/theme-utils"
import { ChakraPluginOptions } from "./helpers/plugin.types"
import { localStorageManager } from "@chakra-ui/c-color-mode"

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

export { createChakra } from "./create-chakra"

export type { ChakraPluginOptions }
export interface ThemeProviderProps extends ThemeOverride {}
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

export { LiveRegion, type LiveRegionOptions } from "@chakra-ui/c-live-region"

// M
export {
  CHide,
  CShow,
  CVisibility,
  useQuery,
  useBreakpointValue,
  useBreakpoint,
  getClosestValue,
  type CHideProps,
  type CShowProps,
  type CVisbilityProps,
  type UseQueryProps,
  type UseBreakpointOptions,
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

export { CTable, TableStylesProvider, useTableStyles } from "@chakra-ui/c-table"
export { CTableContainer } from "@chakra-ui/c-table"
export { CTableCaption } from "@chakra-ui/c-table"
export { CTbody } from "@chakra-ui/c-table"
export { CTd } from "@chakra-ui/c-table"
export { CTfoot } from "@chakra-ui/c-table"
export { CTh } from "@chakra-ui/c-table"
export { CThead } from "@chakra-ui/c-table"
export { CTr } from "@chakra-ui/c-table"

export type { CTableProps } from "@chakra-ui/c-table"
export type { CTableContainerProps } from "@chakra-ui/c-table"
export type { CTableCaptionProps } from "@chakra-ui/c-table"
export type { CTableBodyProps } from "@chakra-ui/c-table"
export type { CTableCellProps } from "@chakra-ui/c-table"
export type { CTableFooterProps } from "@chakra-ui/c-table"
export type { CTableColumnHeaderProps } from "@chakra-ui/c-table"
export type { CTHeadProps } from "@chakra-ui/c-table"
export type { CTableRowProps } from "@chakra-ui/c-table"

export { CTextarea } from "@chakra-ui/c-textarea"
export type {
  CTextareaNativeProps,
  CTextareaProps,
} from "@chakra-ui/c-textarea"

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
  withSingleton,
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

export {
  defineStyleConfig,
  defineStyle,
  createMultiStyleConfigHelpers,
  toCSSVar,
  getCSSVar,
  resolveStyleConfig,
  omitThemingProps,
  isStyleProp,
} from "@chakra-ui/styled-system"

export type {
  SystemCSSProperties,
  WithCSSVar,
  ThemingProps,
  ThemeTypings,
  ResponsiveValue,
  CSSWithMultiValues,
  StyleObjectOrFn,
  StyleConfig,
  ResponsiveArray,
  ResponsiveObject,
  RecursivePseudo,
  RecursiveCSSObject,
  StyleFunctionProps,
  MultiStyleConfig,
  PartsStyleObject,
  PartsStyleFunction,
  PartsStyleInterpolation,
  ThemeThunk,
  SystemStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/styled-system"

/**
 *
 * Directives exports
 * ==================
 *
 * Dear contributors,
 *
 * Please keep these exports in Alphabetical order :)
 */
