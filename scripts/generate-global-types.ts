import { writeFileSync, appendFileSync } from 'fs'
import { resolve } from 'path'
import * as ChakraComponents from '@chakra-ui/vue-next'
import {
  name as pkgName,
  version as pkgVersion,
} from '../packages/core/package.json'
import { ESLint } from 'eslint'
import { domElements } from '@chakra-ui/vue-system'

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
  declare module 'vue' {
    export interface GlobalComponents {
        ${code}
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
  appendFileSync(projectTypesFilePath, allTypes, 'utf-8')

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
