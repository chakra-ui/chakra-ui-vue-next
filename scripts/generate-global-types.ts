const { writeFileSync, appendFileSync } = require('fs')
const { resolve } = require('path')
const {
  name: pkgName,
  version: pkgVersion,
} = require('../packages/core/package.json')

const { ESLint } = require('eslint')
const { domElements } = require('@chakra-ui/vue-system')
const ChakraComponents = require('@chakra-ui/vue-next')

type ComponentsImport = typeof ChakraComponents

async function generateComponents() {
  let code = `
  `

  for (const component in ChakraComponents) {
    /**
     * Group of strict checks to make sure that
     * we only generate types for components.
     */
    if (
      component.startsWith('C') &&
      ChakraComponents[component]?.name &&
      ChakraComponents[component]?.setup &&
      typeof ChakraComponents[component]?.setup === 'function'
    ) {
      code += `${component}: typeof import('${pkgName}')['${component}']\n`
    }
  }

  for (let el = 0; el < domElements.length; el++) {
    code += `'chakra.${domElements[el]}': typeof import('${pkgName}')['CBox']\n`
  }

  const allTypes = `
  /**
   * Typescript support for @${pkgName}${pkgVersion} auto-imported
   * components using \`unplugin-vue-components,\`
   * 
   * @see: https://github.com/antfu/unplugin-vue-components/#typescript
   * 
   * This is a generated file. Do not edit it's contents.
   * 
   * This file was generated on ${new Date().toISOString()}
   */

   import { ChakraProps, chakra } from '@chakra-ui/vue-system'
   import { VNodeChild, HTMLAttributes } from 'vue'
   
   export type JsxNode = VNodeChild | JSX.Element

   type EventHandler = (...args: any[]) => void;
   
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
  
  declare module '@vue/runtime-core' {
    import { chakra } from '@chakra-ui/vue-next'
    export { chakra }

    /* Global component types for Volar auto-complete */
    export interface GlobalComponents {
      chakra: typeof import('@chakra-ui/vue-next')['chakra']
      ${code}
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

    interface ComponentCustomProps {
      role?: string;
      tabindex?: number | string;
      value?: unknown
      // should be removed after Vue supported component events typing
      // see: https://github.com/vuejs/vue-next/issues/1553
      //      https://github.com/vuejs/vue-next/issues/3029
      onBlur?: EventHandler;
      onOpen?: EventHandler;
      onEdit?: EventHandler;
      onLoad?: EventHandler;
      onClose?: EventHandler;
      onFocus?: EventHandler;
      onInput?: EventHandler;
      onClick?: EventHandler;
      onPress?: EventHandler;
      onCancel?: EventHandler;
      onChange?: EventHandler;
      onDelete?: EventHandler;
      onScroll?: EventHandler;
      onSubmit?: EventHandler;
      onSelect?: EventHandler;
      onConfirm?: EventHandler;
      onPreview?: EventHandler;
      onKeypress?: EventHandler;
      onTouchend?: EventHandler;
      onTouchmove?: EventHandler;
      onTouchstart?: EventHandler;
      onTouchcancel?: EventHandler;
      onMouseenter?: EventHandler;
      onMouseleave?: EventHandler;
      onMousemove?: EventHandler;
      onKeydown?: EventHandler;
      onKeyup?: EventHandler;
      onDeselect?: EventHandler;
      onClear?: EventHandler;
    }
  }

  export {}
  

  `

  // Write files
  const projectTypesFilePath = resolve(__dirname, '../components.d.ts')
  const coreTypesFilePath = resolve(
    __dirname,
    '../packages/core/dist/declarations/src/index.d.ts'
  )
  writeFileSync(projectTypesFilePath, allTypes, 'utf8')
  appendFileSync(coreTypesFilePath, allTypes, 'utf8')

  // Lint and Fix filea after writing types
  const eslint = new ESLint({ fix: true })
  const results = await eslint.lintFiles([
    projectTypesFilePath,
    coreTypesFilePath,
  ])
  await ESLint.outputFixes(results)
}

try {
  generateComponents()
  console.info('✅ Successfully wrote component types\n')
} catch (error) {
  console.error('Error: writing types\n', error)
}
