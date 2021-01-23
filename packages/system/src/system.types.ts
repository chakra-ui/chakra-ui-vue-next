import { Component, Fragment, Suspense, Teleport } from 'vue'

export type Tag =
  | string
  | typeof Fragment
  | typeof Teleport
  | typeof Suspense
  | Component

export type As<Props = any> = Tag
