/**
 * TypeScript support for auto-imported components using `vite-plugin-components`:
 * see: https://github.com/antfu/vite-plugin-components#typescript
 */

declare module 'vue' {
  export interface GlobalComponents {
    CAspectRatio: typeof import('@chakra-ui/vue-next')['CAspectRatio']
    CBadge: typeof import('@chakra-ui/vue-next')['CBadge']
    CBox: typeof import('@chakra-ui/vue-next')['CBox']
    CCircle: typeof import('@chakra-ui/vue-next')['CCircle']
    CSquare: typeof import('@chakra-ui/vue-next')['CSquare']
  }
}

export {}
