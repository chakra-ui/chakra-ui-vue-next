export {}
declare global {
  namespace JSX {
    export interface IntrinsicAttributes {
      as?: string
      label?: string
      poop?: 'name' | 'hard' | 'soft'
    }
  }
}
