/**
 * Typescript support for @@chakra-ui/vue-next1.0.0-alpha.6 auto-imported
 * components using `vite-plugin-components`
 *
 * @see: https://github.com/antfu/vite-plugin-components#typescript
 *
 * This is a generated file. Do not edit it's contents.
 *
 * This file was generated on 2021-07-29T05:01:14.847Z
 */

import { ChakraProps } from '@chakra-ui/vue-system'
import { VNodeChild, HTMLAttributes } from 'vue'

export type JsxNode = VNodeChild | JSX.Element

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
  'v-model'?: unknown
  'v-models'?: unknown[]
  'v-custom'?: unknown[]
  'v-show'?: boolean
  'v-html'?: JsxNode
  'v-slots'?: SlotDirective
} & Omit<HTMLAttributes, 'innerHTML'> & {
    innerHTML?: JsxNode
  }

declare module 'vue' {
  /* Global component types for Volar auto-complete */
  export interface GlobalComponents {
    CAlert: typeof import('@chakra-ui/vue-next')['CAlert']
    CAlertTitle: typeof import('@chakra-ui/vue-next')['CAlertTitle']
    CAlertDescription: typeof import('@chakra-ui/vue-next')['CAlertDescription']
    CAlertIcon: typeof import('@chakra-ui/vue-next')['CAlertIcon']
    CBreadcrumb: typeof import('@chakra-ui/vue-next')['CBreadcrumb']
    CBreadcrumbSeparator: typeof import('@chakra-ui/vue-next')['CBreadcrumbSeparator']
    CBreadcrumbItem: typeof import('@chakra-ui/vue-next')['CBreadcrumbItem']
    CBreadcrumbLink: typeof import('@chakra-ui/vue-next')['CBreadcrumbLink']
    CButton: typeof import('@chakra-ui/vue-next')['CButton']
    CButtonGroup: typeof import('@chakra-ui/vue-next')['CButtonGroup']
    CIconButton: typeof import('@chakra-ui/vue-next')['CIconButton']
    CFocusLock: typeof import('@chakra-ui/vue-next')['CFocusLock']
    CAspectRatio: typeof import('@chakra-ui/vue-next')['CAspectRatio']
    CBadge: typeof import('@chakra-ui/vue-next')['CBadge']
    CBox: typeof import('@chakra-ui/vue-next')['CBox']
    CSquare: typeof import('@chakra-ui/vue-next')['CSquare']
    CCircle: typeof import('@chakra-ui/vue-next')['CCircle']
    CCenter: typeof import('@chakra-ui/vue-next')['CCenter']
    CContainer: typeof import('@chakra-ui/vue-next')['CContainer']
    CDivider: typeof import('@chakra-ui/vue-next')['CDivider']
    CGrid: typeof import('@chakra-ui/vue-next')['CGrid']
    CGridItem: typeof import('@chakra-ui/vue-next')['CGridItem']
    CHeading: typeof import('@chakra-ui/vue-next')['CHeading']
    CLink: typeof import('@chakra-ui/vue-next')['CLink']
    CLinkOverlay: typeof import('@chakra-ui/vue-next')['CLinkOverlay']
    CLinkBox: typeof import('@chakra-ui/vue-next')['CLinkBox']
    CList: typeof import('@chakra-ui/vue-next')['CList']
    COrderedList: typeof import('@chakra-ui/vue-next')['COrderedList']
    CUnorderedList: typeof import('@chakra-ui/vue-next')['CUnorderedList']
    CListItem: typeof import('@chakra-ui/vue-next')['CListItem']
    CListIcon: typeof import('@chakra-ui/vue-next')['CListIcon']
    CKbd: typeof import('@chakra-ui/vue-next')['CKbd']
    CSimpleGrid: typeof import('@chakra-ui/vue-next')['CSimpleGrid']
    CSpacer: typeof import('@chakra-ui/vue-next')['CSpacer']
    CStackDivider: typeof import('@chakra-ui/vue-next')['CStackDivider']
    CStackItem: typeof import('@chakra-ui/vue-next')['CStackItem']
    CStack: typeof import('@chakra-ui/vue-next')['CStack']
    CHStack: typeof import('@chakra-ui/vue-next')['CHStack']
    CVStack: typeof import('@chakra-ui/vue-next')['CVStack']
    CText: typeof import('@chakra-ui/vue-next')['CText']
    CModal: typeof import('@chakra-ui/vue-next')['CModal']
    CModalContent: typeof import('@chakra-ui/vue-next')['CModalContent']
    CModalOverlay: typeof import('@chakra-ui/vue-next')['CModalOverlay']
    CModalHeader: typeof import('@chakra-ui/vue-next')['CModalHeader']
    CModalBody: typeof import('@chakra-ui/vue-next')['CModalBody']
    CModalFooter: typeof import('@chakra-ui/vue-next')['CModalFooter']
    CModalCloseButton: typeof import('@chakra-ui/vue-next')['CModalCloseButton']
    CDrawer: typeof import('@chakra-ui/vue-next')['CDrawer']
    CDrawerContent: typeof import('@chakra-ui/vue-next')['CDrawerContent']
    CDrawerBody: typeof import('@chakra-ui/vue-next')['CDrawerBody']
    CDrawerCloseButton: typeof import('@chakra-ui/vue-next')['CDrawerCloseButton']
    CDrawerFooter: typeof import('@chakra-ui/vue-next')['CDrawerFooter']
    CDrawerHeader: typeof import('@chakra-ui/vue-next')['CDrawerHeader']
    CDrawerOverlay: typeof import('@chakra-ui/vue-next')['CDrawerOverlay']
    CAlertDialog: typeof import('@chakra-ui/vue-next')['CAlertDialog']
    CAlertDialogContent: typeof import('@chakra-ui/vue-next')['CAlertDialogContent']
    CAlertDialogBody: typeof import('@chakra-ui/vue-next')['CAlertDialogBody']
    CAlertDialogCloseButton: typeof import('@chakra-ui/vue-next')['CAlertDialogCloseButton']
    CAlertDialogFooter: typeof import('@chakra-ui/vue-next')['CAlertDialogFooter']
    CAlertDialogHeader: typeof import('@chakra-ui/vue-next')['CAlertDialogHeader']
    CAlertDialogOverlay: typeof import('@chakra-ui/vue-next')['CAlertDialogOverlay']
    CMotion: typeof import('@chakra-ui/vue-next')['CMotion']
    CAnimatePresence: typeof import('@chakra-ui/vue-next')['CAnimatePresence']
    CPortal: typeof import('@chakra-ui/vue-next')['CPortal']
    CScrollLock: typeof import('@chakra-ui/vue-next')['CScrollLock']
    CVisuallyHidden: typeof import('@chakra-ui/vue-next')['CVisuallyHidden']
    CVisuallyHiddenInput: typeof import('@chakra-ui/vue-next')['CVisuallyHiddenInput']
    'chakra.a': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.b': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.article': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.aside': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.blockquote': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.button': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.caption': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.cite': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.circle': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.code': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.dd': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.div': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.dl': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.dt': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.fieldset': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.figcaption': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.figure': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.footer': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.form': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.h1': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.h2': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.h3': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.h4': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.h5': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.h6': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.header': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.hr': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.iframe': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.img': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.input': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.kbd': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.label': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.li': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.mark': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.main': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.nav': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.ol': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.p': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.path': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.pre': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.q': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.rect': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.s': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.svg': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.section': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.select': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.strong': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.small': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.span': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.sub': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.sup': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.table': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.tbody': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.td': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.textarea': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.tfoot': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.th': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.thead': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.tr': typeof import('@chakra-ui/vue-next')['CBox']
    'chakra.ul': typeof import('@chakra-ui/vue-next')['CBox']
  }

  /* Component custom props types for JSX and TSX auto complete */
  export interface ComponentCustomProps
    extends JsxComponentCustomProps,
      ChakraProps {
    onClick?: () => any
    vSlots?: {
      [eleName: string]: JSX.Element
    }
  }
}
