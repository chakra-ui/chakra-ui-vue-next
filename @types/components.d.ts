/**
 * Typescript support for @chakra-ui/vue-next2.1.0-beta.3 auto-imported
 * components using `unplugin-vue-components,`
 *
 * @see: https://github.com/antfu/unplugin-vue-components/#typescript
 *
 * This is a generated file. Do not edit it's contents.
 *
 * This file was generated on 2023-02-26T13:58:05.623Z
 */

import { ChakraProps, chakra } from "@chakra-ui/vue-system"
import { VNodeChild, VNode, HTMLAttributes } from "vue"

export type JsxNode = VNodeChild | JSX.Element

declare global {
  namespace h.JSX {
    interface Element extends VNode {}
    interface ElementClass {
      $props: {}
    }
    interface ElementAttributesProperty {
      $props: {}
    }

    interface IntrinsicAttributes
      extends Omit<HTMLAttributes, "color">,
        ChakraProps {}
  }
}

type EventHandler = (...args: any[]) => void

export interface SlotDirective {
  [name: string]: () => JsxNode
}

type JsxComponentCustomProps = {
  vModel?: unknown
  vModels?: unknown[]
  vCustom?: unknown[]
  vShow?: boolean
  vHtml?: JsxNode
  vSlots?: SlotDirective
  "v-model"?: unknown
  "v-models"?: unknown[]
  "v-custom"?: unknown[]
  "v-show"?: boolean
  "v-html"?: JsxNode
  "v-slots"?: SlotDirective
} & Omit<HTMLAttributes, "innerHTML"> & {
    innerHTML?: JsxNode
  }

declare module "@vue/runtime-core" {
  /* Global component types for Volar auto-complete */
  export interface GlobalComponents {
    chakra: typeof import("@chakra-ui/vue-next")["chakra"]
    CAccordion: typeof import("@chakra-ui/vue-next")["CAccordion"]
    CAccordionButton: typeof import("@chakra-ui/vue-next")["CAccordionButton"]
    CAccordionIcon: typeof import("@chakra-ui/vue-next")["CAccordionIcon"]
    CAccordionItem: typeof import("@chakra-ui/vue-next")["CAccordionItem"]
    CAccordionPanel: typeof import("@chakra-ui/vue-next")["CAccordionPanel"]
    CAlert: typeof import("@chakra-ui/vue-next")["CAlert"]
    CAlertDescription: typeof import("@chakra-ui/vue-next")["CAlertDescription"]
    CAlertDialog: typeof import("@chakra-ui/vue-next")["CAlertDialog"]
    CAlertDialogBody: typeof import("@chakra-ui/vue-next")["CAlertDialogBody"]
    CAlertDialogCloseButton: typeof import("@chakra-ui/vue-next")["CAlertDialogCloseButton"]
    CAlertDialogContent: typeof import("@chakra-ui/vue-next")["CAlertDialogContent"]
    CAlertDialogFooter: typeof import("@chakra-ui/vue-next")["CAlertDialogFooter"]
    CAlertDialogHeader: typeof import("@chakra-ui/vue-next")["CAlertDialogHeader"]
    CAlertDialogOverlay: typeof import("@chakra-ui/vue-next")["CAlertDialogOverlay"]
    CAlertIcon: typeof import("@chakra-ui/vue-next")["CAlertIcon"]
    CAlertTitle: typeof import("@chakra-ui/vue-next")["CAlertTitle"]
    CAnimatePresence: typeof import("@chakra-ui/vue-next")["CAnimatePresence"]
    CAspectRatio: typeof import("@chakra-ui/vue-next")["CAspectRatio"]
    CAvatar: typeof import("@chakra-ui/vue-next")["CAvatar"]
    CAvatarBadge: typeof import("@chakra-ui/vue-next")["CAvatarBadge"]
    CBadge: typeof import("@chakra-ui/vue-next")["CBadge"]
    CBox: typeof import("@chakra-ui/vue-next")["CBox"]
    CBreadcrumb: typeof import("@chakra-ui/vue-next")["CBreadcrumb"]
    CBreadcrumbItem: typeof import("@chakra-ui/vue-next")["CBreadcrumbItem"]
    CBreadcrumbLink: typeof import("@chakra-ui/vue-next")["CBreadcrumbLink"]
    CBreadcrumbSeparator: typeof import("@chakra-ui/vue-next")["CBreadcrumbSeparator"]
    CButton: typeof import("@chakra-ui/vue-next")["CButton"]
    CButtonGroup: typeof import("@chakra-ui/vue-next")["CButtonGroup"]
    CCenter: typeof import("@chakra-ui/vue-next")["CCenter"]
    CCheckbox: typeof import("@chakra-ui/vue-next")["CCheckbox"]
    CCheckboxGroup: typeof import("@chakra-ui/vue-next")["CCheckboxGroup"]
    CCircle: typeof import("@chakra-ui/vue-next")["CCircle"]
    CCollapse: typeof import("@chakra-ui/vue-next")["CCollapse"]
    CContainer: typeof import("@chakra-ui/vue-next")["CContainer"]
    CDarkMode: typeof import("@chakra-ui/vue-next")["CDarkMode"]
    CDivider: typeof import("@chakra-ui/vue-next")["CDivider"]
    CDrawer: typeof import("@chakra-ui/vue-next")["CDrawer"]
    CDrawerBody: typeof import("@chakra-ui/vue-next")["CDrawerBody"]
    CDrawerCloseButton: typeof import("@chakra-ui/vue-next")["CDrawerCloseButton"]
    CDrawerContent: typeof import("@chakra-ui/vue-next")["CDrawerContent"]
    CDrawerFooter: typeof import("@chakra-ui/vue-next")["CDrawerFooter"]
    CDrawerHeader: typeof import("@chakra-ui/vue-next")["CDrawerHeader"]
    CDrawerOverlay: typeof import("@chakra-ui/vue-next")["CDrawerOverlay"]
    CFlex: typeof import("@chakra-ui/vue-next")["CFlex"]
    CFocusLock: typeof import("@chakra-ui/vue-next")["CFocusLock"]
    CFormErrorIcon: typeof import("@chakra-ui/vue-next")["CFormErrorIcon"]
    CFormErrorMessage: typeof import("@chakra-ui/vue-next")["CFormErrorMessage"]
    CFormHelperText: typeof import("@chakra-ui/vue-next")["CFormHelperText"]
    CFormLabel: typeof import("@chakra-ui/vue-next")["CFormLabel"]
    CGrid: typeof import("@chakra-ui/vue-next")["CGrid"]
    CGridItem: typeof import("@chakra-ui/vue-next")["CGridItem"]
    CHStack: typeof import("@chakra-ui/vue-next")["CHStack"]
    CHeading: typeof import("@chakra-ui/vue-next")["CHeading"]
    CIcon: typeof import("@chakra-ui/vue-next")["CIcon"]
    CIconButton: typeof import("@chakra-ui/vue-next")["CIconButton"]
    CImage: typeof import("@chakra-ui/vue-next")["CImage"]
    CImg: typeof import("@chakra-ui/vue-next")["CImg"]
    CInput: typeof import("@chakra-ui/vue-next")["CInput"]
    CInputAddon: typeof import("@chakra-ui/vue-next")["CInputAddon"]
    CInputGroup: typeof import("@chakra-ui/vue-next")["CInputGroup"]
    CInputLeftAddon: typeof import("@chakra-ui/vue-next")["CInputLeftAddon"]
    CInputLeftElement: typeof import("@chakra-ui/vue-next")["CInputLeftElement"]
    CInputRightAddon: typeof import("@chakra-ui/vue-next")["CInputRightAddon"]
    CInputRightElement: typeof import("@chakra-ui/vue-next")["CInputRightElement"]
    CKbd: typeof import("@chakra-ui/vue-next")["CKbd"]
    CLightMode: typeof import("@chakra-ui/vue-next")["CLightMode"]
    CLink: typeof import("@chakra-ui/vue-next")["CLink"]
    CLinkBox: typeof import("@chakra-ui/vue-next")["CLinkBox"]
    CLinkOverlay: typeof import("@chakra-ui/vue-next")["CLinkOverlay"]
    CList: typeof import("@chakra-ui/vue-next")["CList"]
    CListIcon: typeof import("@chakra-ui/vue-next")["CListIcon"]
    CListItem: typeof import("@chakra-ui/vue-next")["CListItem"]
    CMenu: typeof import("@chakra-ui/vue-next")["CMenu"]
    CModal: typeof import("@chakra-ui/vue-next")["CModal"]
    CModalBody: typeof import("@chakra-ui/vue-next")["CModalBody"]
    CModalCloseButton: typeof import("@chakra-ui/vue-next")["CModalCloseButton"]
    CModalContent: typeof import("@chakra-ui/vue-next")["CModalContent"]
    CModalFooter: typeof import("@chakra-ui/vue-next")["CModalFooter"]
    CModalHeader: typeof import("@chakra-ui/vue-next")["CModalHeader"]
    CModalOverlay: typeof import("@chakra-ui/vue-next")["CModalOverlay"]
    CMotion: typeof import("@chakra-ui/vue-next")["CMotion"]
    COrderedList: typeof import("@chakra-ui/vue-next")["COrderedList"]
    CPinInput: typeof import("@chakra-ui/vue-next")["CPinInput"]
    CPinInputClearButton: typeof import("@chakra-ui/vue-next")["CPinInputClearButton"]
    CPinInputField: typeof import("@chakra-ui/vue-next")["CPinInputField"]
    CPortal: typeof import("@chakra-ui/vue-next")["CPortal"]
    CPresenceGroup: typeof import("@chakra-ui/vue-next")["CPresenceGroup"]
    CRequiredIndicator: typeof import("@chakra-ui/vue-next")["CRequiredIndicator"]
    CScrollLock: typeof import("@chakra-ui/vue-next")["CScrollLock"]
    CSimpleGrid: typeof import("@chakra-ui/vue-next")["CSimpleGrid"]
    CSkipNavContent: typeof import("@chakra-ui/vue-next")["CSkipNavContent"]
    CSkipNavLink: typeof import("@chakra-ui/vue-next")["CSkipNavLink"]
    CSpacer: typeof import("@chakra-ui/vue-next")["CSpacer"]
    CSpinner: typeof import("@chakra-ui/vue-next")["CSpinner"]
    CSquare: typeof import("@chakra-ui/vue-next")["CSquare"]
    CStack: typeof import("@chakra-ui/vue-next")["CStack"]
    CStackDivider: typeof import("@chakra-ui/vue-next")["CStackDivider"]
    CStackItem: typeof import("@chakra-ui/vue-next")["CStackItem"]
    CText: typeof import("@chakra-ui/vue-next")["CText"]
    CThemeProvider: typeof import("@chakra-ui/vue-next")["CThemeProvider"]
    CToastContainer: typeof import("@chakra-ui/vue-next")["CToastContainer"]
    CUnorderedList: typeof import("@chakra-ui/vue-next")["CUnorderedList"]
    CVStack: typeof import("@chakra-ui/vue-next")["CVStack"]
    CVisuallyHidden: typeof import("@chakra-ui/vue-next")["CVisuallyHidden"]
    CVisuallyHiddenInput: typeof import("@chakra-ui/vue-next")["CVisuallyHiddenInput"]
    CWrap: typeof import("@chakra-ui/vue-next")["CWrap"]
    CWrapItem: typeof import("@chakra-ui/vue-next")["CWrapItem"]
    "chakra.a": (typeof chakra)["a"]
    "chakra.b": (typeof chakra)["b"]
    "chakra.article": (typeof chakra)["article"]
    "chakra.aside": (typeof chakra)["aside"]
    "chakra.blockquote": (typeof chakra)["blockquote"]
    "chakra.button": (typeof chakra)["button"]
    "chakra.caption": (typeof chakra)["caption"]
    "chakra.cite": (typeof chakra)["cite"]
    "chakra.circle": (typeof chakra)["circle"]
    "chakra.code": (typeof chakra)["code"]
    "chakra.dd": (typeof chakra)["dd"]
    "chakra.div": (typeof chakra)["div"]
    "chakra.dl": (typeof chakra)["dl"]
    "chakra.dt": (typeof chakra)["dt"]
    "chakra.fieldset": (typeof chakra)["fieldset"]
    "chakra.figcaption": (typeof chakra)["figcaption"]
    "chakra.figure": (typeof chakra)["figure"]
    "chakra.footer": (typeof chakra)["footer"]
    "chakra.form": (typeof chakra)["form"]
    "chakra.h1": (typeof chakra)["h1"]
    "chakra.h2": (typeof chakra)["h2"]
    "chakra.h3": (typeof chakra)["h3"]
    "chakra.h4": (typeof chakra)["h4"]
    "chakra.h5": (typeof chakra)["h5"]
    "chakra.h6": (typeof chakra)["h6"]
    "chakra.header": (typeof chakra)["header"]
    "chakra.hr": (typeof chakra)["hr"]
    "chakra.iframe": (typeof chakra)["iframe"]
    "chakra.img": (typeof chakra)["img"]
    "chakra.input": (typeof chakra)["input"]
    "chakra.kbd": (typeof chakra)["kbd"]
    "chakra.label": (typeof chakra)["label"]
    "chakra.li": (typeof chakra)["li"]
    "chakra.mark": (typeof chakra)["mark"]
    "chakra.main": (typeof chakra)["main"]
    "chakra.nav": (typeof chakra)["nav"]
    "chakra.ol": (typeof chakra)["ol"]
    "chakra.p": (typeof chakra)["p"]
    "chakra.path": (typeof chakra)["path"]
    "chakra.pre": (typeof chakra)["pre"]
    "chakra.q": (typeof chakra)["q"]
    "chakra.rect": (typeof chakra)["rect"]
    "chakra.s": (typeof chakra)["s"]
    "chakra.svg": (typeof chakra)["svg"]
    "chakra.section": (typeof chakra)["section"]
    "chakra.select": (typeof chakra)["select"]
    "chakra.strong": (typeof chakra)["strong"]
    "chakra.small": (typeof chakra)["small"]
    "chakra.span": (typeof chakra)["span"]
    "chakra.sub": (typeof chakra)["sub"]
    "chakra.sup": (typeof chakra)["sup"]
    "chakra.table": (typeof chakra)["table"]
    "chakra.tbody": (typeof chakra)["tbody"]
    "chakra.td": (typeof chakra)["td"]
    "chakra.textarea": (typeof chakra)["textarea"]
    "chakra.tfoot": (typeof chakra)["tfoot"]
    "chakra.th": (typeof chakra)["th"]
    "chakra.thead": (typeof chakra)["thead"]
    "chakra.tr": (typeof chakra)["tr"]
    "chakra.ul": (typeof chakra)["ul"]
  }

  /* Component custom props types for JSX and TSX auto complete */
  export interface ComponentCustomProps
    extends JsxComponentCustomProps,
      ChakraProps {
    vSlots?: {
      [eleName: string]: JSX.Element
    }
  }

  interface ComponentCustomProps {
    role?: string
    tabindex?: number | string
    value?: unknown
    id?: string
    viewBox?: unknown
    src?: unknown
    srcset?: unknown
    crossOrigin?: unknown
    srcSet?: unknown
    loading?: unknown
    alt?: unknown
    referrerPolicy?: unknown
    focusable?: unknown
    type?: unknown
    disabled?: unknown
    href?: unknown
    // should be removed after Vue supported component events typing
    // see: https://github.com/vuejs/vue-next/issues/1553
    //      https://github.com/vuejs/vue-next/issues/3029
    onBlur?: EventHandler
    onOpen?: EventHandler
    onEdit?: EventHandler
    onLoad?: EventHandler
    onClose?: EventHandler
    onFocus?: EventHandler
    onInput?: EventHandler
    onClick?: EventHandler
    onPress?: EventHandler
    onCancel?: EventHandler
    onChange?: EventHandler
    onDelete?: EventHandler
    onScroll?: EventHandler
    onSubmit?: EventHandler
    onSelect?: EventHandler
    onConfirm?: EventHandler
    onPreview?: EventHandler
    onKeypress?: EventHandler
    onTouchend?: EventHandler
    onTouchmove?: EventHandler
    onTouchstart?: EventHandler
    onTouchcancel?: EventHandler
    onMouseenter?: EventHandler
    onMouseleave?: EventHandler
    onMousemove?: EventHandler
    onKeydown?: EventHandler
    onKeyup?: EventHandler
    onDeselect?: EventHandler
    onClear?: EventHandler
  }
}

export {}
