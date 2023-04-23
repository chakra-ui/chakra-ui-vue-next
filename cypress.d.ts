import { mount } from "cypress/vue"

import type { mount as cyMount } from "cypress/vue"
import type { MountingOptions, VueWrapper } from "@vue/test-utils"
import type {
  AllowedComponentProps,
  ComponentPublicInstance,
  FunctionalComponent,
  VNodeProps,
} from "vue"

type Swipe = number[] | string

type StripProps =
  | keyof VNodeProps
  | keyof AllowedComponentProps
  | "v-slots"
  | "$children"
  | `v-slot:${string}`

type Events<T> = T extends { $props: infer P extends object }
  ? {
      [K in Exclude<keyof P, StripProps> as K extends `on${infer N}`
        ? Uncapitalize<N>
        : never]: P[K] extends ((...args: any[]) => any) | undefined
        ? Parameters<NonNullable<P[K]>>[]
        : never
    }
  : never

type MountParams = Parameters<typeof mount>
type OptionsParam = MountParams[1]

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      emitted<
        T extends new (...args: any) => any,
        E extends Events<InstanceType<T>>,
        K extends keyof E
      >(
        selector: T,
        event?: K
      ): Chainable<E[K]>
    }
  }
}

declare module "cypress/vue" {
  export function mount(
    component: JSX.Element,
    options?: MountingOptions<any> | null
  ): Cypress.Chainable
}
