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
   * Global component types for @${pkgName}${pkgVersion}
   * This is a generated file. Do not edit it's contents.
   * 
   * This file was generated on ${new Date().toISOString()}
   */

   import { HTMLChakraProps } from '@chakra-ui/vue-system'
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
   } & Omit<HTMLAttributes, 'innerHTML'> & {
       innerHTML?: JsxNode
     }
  
  
  declare module 'vue' {
    /* Global component types for Volar auto-complete */
    export interface GlobalComponents {
        ${code}
    }

    /* Component custom props types for JSX and TSX auto complete */
    export interface ComponentCustomProps
      extends JsxComponentCustomProps,
        HTMLChakraProps<'div'> {
      onClick?: () => any
      vSlots?: {
        [eleName: string]: JSX.Element
      }
    }
  }

  `

  // Write files
  const projectTypesFilePath = resolve(__dirname, '../components.d.ts')
  const coreTypesFilePath = resolve(
    __dirname,
    '../packages/core/dist/types/index.d.ts'
  )
  writeFileSync(projectTypesFilePath, allTypes, 'utf-8')
  appendFileSync(coreTypesFilePath, allTypes, 'utf-8')

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
