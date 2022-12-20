/**
 * Typescript support for @@chakra-ui/vue-next1.0.0-alpha.13 auto-imported
 * components using `unplugin-vue-components,`
 *
 * @see: https://github.com/antfu/unplugin-vue-components/#typescript
 *
 * This is a generated file. Do not edit it's contents.
 *
 * This file was generated on 2022-12-14T07:21:51.681Z
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

declare var chakra: typeof import("@chakra-ui/vue-next")["chakra"]

declare module "@vue/runtime-core" {
  import { chakra } from "@chakra-ui/vue-next"
  export { chakra }

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
    CAlertIcon: typeof import("@chakra-ui/vue-next")["CAlertIcon"]
    CAlertTitle: typeof import("@chakra-ui/vue-next")["CAlertTitle"]
    CBreadcrumb: typeof import("@chakra-ui/vue-next")["CBreadcrumb"]
    CBreadcrumbItem: typeof import("@chakra-ui/vue-next")["CBreadcrumbItem"]
    CBreadcrumbLink: typeof import("@chakra-ui/vue-next")["CBreadcrumbLink"]
    CBreadcrumbSeparator: typeof import("@chakra-ui/vue-next")["CBreadcrumbSeparator"]
    CButton: typeof import("@chakra-ui/vue-next")["CButton"]
    CButtonGroup: typeof import("@chakra-ui/vue-next")["CButtonGroup"]
    CIconButton: typeof import("@chakra-ui/vue-next")["CIconButton"]
    CCheckbox: typeof import("@chakra-ui/vue-next")["CCheckbox"]
    CCheckboxGroup: typeof import("@chakra-ui/vue-next")["CCheckboxGroup"]
    CFocusLock: typeof import("@chakra-ui/vue-next")["CFocusLock"]
    CFormErrorIcon: typeof import("@chakra-ui/vue-next")["CFormErrorIcon"]
    CFormErrorMessage: typeof import("@chakra-ui/vue-next")["CFormErrorMessage"]
    CFormLabel: typeof import("@chakra-ui/vue-next")["CFormLabel"]
    CRequiredIndicator: typeof import("@chakra-ui/vue-next")["CRequiredIndicator"]
    CIcon: typeof import("@chakra-ui/vue-next")["CIcon"]
    CImage: typeof import("@chakra-ui/vue-next")["CImage"]
    CImg: typeof import("@chakra-ui/vue-next")["CImg"]
    CInput: typeof import("@chakra-ui/vue-next")["CInput"]
    CInputAddon: typeof import("@chakra-ui/vue-next")["CInputAddon"]
    CInputGroup: typeof import("@chakra-ui/vue-next")["CInputGroup"]
    CInputLeftAddon: typeof import("@chakra-ui/vue-next")["CInputLeftAddon"]
    CInputLeftElement: typeof import("@chakra-ui/vue-next")["CInputLeftElement"]
    CInputRightAddon: typeof import("@chakra-ui/vue-next")["CInputRightAddon"]
    CInputRightElement: typeof import("@chakra-ui/vue-next")["CInputRightElement"]
    CAspectRatio: typeof import("@chakra-ui/vue-next")["CAspectRatio"]
    CBadge: typeof import("@chakra-ui/vue-next")["CBadge"]
    CBox: typeof import("@chakra-ui/vue-next")["CBox"]
    CCenter: typeof import("@chakra-ui/vue-next")["CCenter"]
    CCircle: typeof import("@chakra-ui/vue-next")["CCircle"]
    CContainer: typeof import("@chakra-ui/vue-next")["CContainer"]
    CDivider: typeof import("@chakra-ui/vue-next")["CDivider"]
    CGrid: typeof import("@chakra-ui/vue-next")["CGrid"]
    CGridItem: typeof import("@chakra-ui/vue-next")["CGridItem"]
    CHStack: typeof import("@chakra-ui/vue-next")["CHStack"]
    CHeading: typeof import("@chakra-ui/vue-next")["CHeading"]
    CKbd: typeof import("@chakra-ui/vue-next")["CKbd"]
    CLink: typeof import("@chakra-ui/vue-next")["CLink"]
    CLinkBox: typeof import("@chakra-ui/vue-next")["CLinkBox"]
    CLinkOverlay: typeof import("@chakra-ui/vue-next")["CLinkOverlay"]
    CList: typeof import("@chakra-ui/vue-next")["CList"]
    CListIcon: typeof import("@chakra-ui/vue-next")["CListIcon"]
    CListItem: typeof import("@chakra-ui/vue-next")["CListItem"]
    COrderedList: typeof import("@chakra-ui/vue-next")["COrderedList"]
    CSimpleGrid: typeof import("@chakra-ui/vue-next")["CSimpleGrid"]
    CSpacer: typeof import("@chakra-ui/vue-next")["CSpacer"]
    CSquare: typeof import("@chakra-ui/vue-next")["CSquare"]
    CStack: typeof import("@chakra-ui/vue-next")["CStack"]
    CStackDivider: typeof import("@chakra-ui/vue-next")["CStackDivider"]
    CStackItem: typeof import("@chakra-ui/vue-next")["CStackItem"]
    CText: typeof import("@chakra-ui/vue-next")["CText"]
    CUnorderedList: typeof import("@chakra-ui/vue-next")["CUnorderedList"]
    CVStack: typeof import("@chakra-ui/vue-next")["CVStack"]
    CAlertDialog: typeof import("@chakra-ui/vue-next")["CAlertDialog"]
    CAlertDialogBody: typeof import("@chakra-ui/vue-next")["CAlertDialogBody"]
    CAlertDialogCloseButton: typeof import("@chakra-ui/vue-next")["CAlertDialogCloseButton"]
    CAlertDialogContent: typeof import("@chakra-ui/vue-next")["CAlertDialogContent"]
    CAlertDialogFooter: typeof import("@chakra-ui/vue-next")["CAlertDialogFooter"]
    CAlertDialogHeader: typeof import("@chakra-ui/vue-next")["CAlertDialogHeader"]
    CAlertDialogOverlay: typeof import("@chakra-ui/vue-next")["CAlertDialogOverlay"]
    CDrawer: typeof import("@chakra-ui/vue-next")["CDrawer"]
    CDrawerBody: typeof import("@chakra-ui/vue-next")["CDrawerBody"]
    CDrawerCloseButton: typeof import("@chakra-ui/vue-next")["CDrawerCloseButton"]
    CDrawerContent: typeof import("@chakra-ui/vue-next")["CDrawerContent"]
    CDrawerFooter: typeof import("@chakra-ui/vue-next")["CDrawerFooter"]
    CDrawerHeader: typeof import("@chakra-ui/vue-next")["CDrawerHeader"]
    CDrawerOverlay: typeof import("@chakra-ui/vue-next")["CDrawerOverlay"]
    CModal: typeof import("@chakra-ui/vue-next")["CModal"]
    CModalBody: typeof import("@chakra-ui/vue-next")["CModalBody"]
    CModalCloseButton: typeof import("@chakra-ui/vue-next")["CModalCloseButton"]
    CModalContent: typeof import("@chakra-ui/vue-next")["CModalContent"]
    CModalFooter: typeof import("@chakra-ui/vue-next")["CModalFooter"]
    CModalHeader: typeof import("@chakra-ui/vue-next")["CModalHeader"]
    CModalOverlay: typeof import("@chakra-ui/vue-next")["CModalOverlay"]
    CAnimatePresence: typeof import("@chakra-ui/vue-next")["CAnimatePresence"]
    CCollapse: typeof import("@chakra-ui/vue-next")["CCollapse"]
    CMotion: typeof import("@chakra-ui/vue-next")["CMotion"]
    CPinInput: typeof import("@chakra-ui/vue-next")["CPinInput"]
    CPinInputClearButton: typeof import("@chakra-ui/vue-next")["CPinInputClearButton"]
    CPinInputField: typeof import("@chakra-ui/vue-next")["CPinInputField"]
    CPortal: typeof import("@chakra-ui/vue-next")["CPortal"]
    CSkipNavContent: typeof import("@chakra-ui/vue-next")["CSkipNavContent"]
    CSkipNavLink: typeof import("@chakra-ui/vue-next")["CSkipNavLink"]
    CScrollLock: typeof import("@chakra-ui/vue-next")["CScrollLock"]
    CVisuallyHidden: typeof import("@chakra-ui/vue-next")["CVisuallyHidden"]
    CVisuallyHiddenInput: typeof import("@chakra-ui/vue-next")["CVisuallyHiddenInput"]
    "chakra.a": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.b": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.article": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.aside": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.blockquote": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.button": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.caption": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.cite": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.circle": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.code": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.dd": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.div": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.dl": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.dt": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.fieldset": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.figcaption": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.figure": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.footer": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.form": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.h1": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.h2": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.h3": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.h4": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.h5": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.h6": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.header": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.hr": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.iframe": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.img": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.input": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.kbd": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.label": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.li": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.mark": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.main": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.nav": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.ol": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.p": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.path": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.pre": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.q": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.rect": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.s": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.svg": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.section": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.select": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.strong": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.small": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.span": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.sub": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.sup": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.table": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.tbody": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.td": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.textarea": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.tfoot": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.th": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.thead": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.tr": typeof import("@chakra-ui/vue-next")["CBox"]
    "chakra.ul": typeof import("@chakra-ui/vue-next")["CBox"]
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
