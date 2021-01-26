import { Component, Fragment, Suspense, Teleport } from 'vue'

import {
  ChakraColors,
  ChakraComponentName,
  ComponentThemeConfig,
} from '@chakra-ui/vue-theme'

export type Tag =
  | string
  | typeof Fragment
  | typeof Teleport
  | typeof Suspense
  | Component

export interface ThemingProps {
  variant?: string
  size?: string
  colorScheme?: string
  orientation?: 'vertical' | 'horizontal'
  styleConfig?: ComponentThemeConfig
}

export type ColorScheme = keyof ChakraColors
export type ThemeComponents = ChakraComponentName
