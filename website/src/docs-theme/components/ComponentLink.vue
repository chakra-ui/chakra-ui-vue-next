<script lang="tsx">
import { LinkProps } from '@chakra-ui/vue-layout'
import { defineComponent, PropType } from 'vue'
import { useColorModeValue } from '@chakra-ui/c-color-mode'

type ComponentLinkProps = LinkProps & {
  icon: string
  url: string
  iconSize?: string
  iconColor?: string
}

export default defineComponent({
  props: {
    icon: String as PropType<ComponentLinkProps['icon']>,
    url: String as PropType<ComponentLinkProps['url']>,
    iconSize: String as PropType<ComponentLinkProps['iconSize']>,
    iconColor: String as PropType<ComponentLinkProps['iconColor']>,
  },
  setup(props, { slots }) {
    return () => {
      return (
        <c-link
          href={props.url}
          isExternal
          px="12px"
          display="flex"
          alignItems="center"
          minH="32px"
          borderWidth="1px"
          borderRadius="md"
          color={useColorModeValue('gray.600', 'whiteAlpha.700')}
          _hover={{
            color: useColorModeValue('gray.700', 'whiteAlpha.900'),
            boxShadow: 'sm',
            transform: 'translateY(-1px)',
          }}
        >
          <c-h-stack>
            <c-icon
              fontSize={props.iconSize}
              name={props.icon}
              color={props.iconColor}
            />
            <c-text fontSize="sm" lineHeight="short">
              {slots}
            </c-text>
          </c-h-stack>
        </c-link>
      )
    }
  },
})
</script>
