import { CHeading } from '@chakra-ui/vue-next'
import { h } from 'vue'

const MDXComponents = {
  br: (props: any, context: any) =>
    h('i', { style: 'color:skyblue' }, context.slots),
  h1: (props: any, context: any) =>
    h(
      CHeading,
      {
        as: 'h1',
        id: 'chakra-documentation-title',
        size: '2xl',
        my: '1em',
        ...props,
      },
      context.slots
    ),
  h2: (props: any, context: any) =>
    h(
      CHeading,
      {
        as: 'h2',
        id: 'chakra-documentation-title',
        size: 'xl',
        my: '1em',
        ...props,
      },
      context.slots
    ),
}

export default MDXComponents
