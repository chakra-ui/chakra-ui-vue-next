import {
  Component,
  ConcreteComponent,
  EmitsOptions,
  SetupContext,
  VNode,
} from "vue"
import { StyledElementTags } from "./tags"

export type StyledOptions = {
  label?: string
  target?: string
}

export type Interpolations = Array<any>

export type StyledComponent<Props> = (
  _: unknown,
  { attrs, expose, slots }: SetupContext<EmitsOptions>
) => VNode & {
  __emotion_real: StyledComponent<Props>
  __emotion_base: any
  __emotion_styles: any
  __emotion_forwardProp: any
  withComponent: CreateStyled
}

export type StyledTagOrComponent =
  | StyledElementTags
  | Component
  | ConcreteComponent
  | string

export type StyledElementType<Props> =
  | string
  | StyledComponent<Props & { class: string }>
  | Component<Props & { class: string }>

export type PrivateStyledComponent<Props> = StyledComponent<Props> & {
  __emotion_real: StyledComponent<Props>
  __emotion_base: any
  __emotion_styles: any
  __emotion_forwardProp: any
  withComponent: CreateStyled
}

export type CreateStyledComponent = <Props>(
  ...args: Interpolations
) => StyledComponent<Props>

export type CreateStyled = {
  <Props>(tag: StyledElementType<Props>, options?: StyledOptions): (
    ...args: Interpolations
  ) => StyledComponent<Props>
  [key: string]: CreateStyledComponent
  // @ts-ignore
  bind: () => CreateStyled
} & {
  [key in StyledElementTags]: <Props>(
    ...args: any[]
  ) => PrivateStyledComponent<Props>
}
