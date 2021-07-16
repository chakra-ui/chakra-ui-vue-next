<script lang="tsx">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  renderSlot,
  SetupContext,
  ComputedRef,
} from 'vue'
import { useColorModeValue, BoxProps, LinkProps } from '@chakra-ui/vue-next'
import { useRoute } from 'vue-router'
import { DeepPartial } from '@chakra-ui/vue-system'

export const StyledLink = (
  props: DeepPartial<
    // eslint-disable-next-line prettier/prettier
    LinkProps & { isActive: ComputedRef<boolean>, href: String, onClick: void }
  >,
  { slots }: SetupContext
) => {
  const { isActive, ...rest } = props

  return (
    <c-box
      as="a"
      aria-current={isActive?.value ? 'page' : undefined}
      width="100%"
      px="3"
      py="1"
      rounded="md"
      ref={ref}
      fontSize="sm"
      fontWeight="500"
      color={useColorModeValue('gray.700', 'whiteAlpha.900').value}
      transition="all 0.2s"
      _activeLink={{
        bg: useColorModeValue('emerald.50', 'rgba(48, 140, 122, 0.3)').value,
        color: useColorModeValue('emerald.700', 'emerald.200').value,
        fontWeight: '600',
      }}
      {...rest}
    >
      {renderSlot(slots, 'default')}
    </c-box>
  )
}

type SidebarLinkProps = DeepPartial<
  BoxProps & {
    href: string
    icon: string
  }
>

export default defineComponent({
  props: {
    href: String as PropType<SidebarLinkProps['href']>,
    icon: String as PropType<SidebarLinkProps['icon']>,
  },
  setup(props, { slots }) {
    const { path } = useRoute()
    const isActive = computed(() => path === props.href)

    return () => {
      return (
        <c-box
          userSelect="none"
          display="flex"
          alignItems="center"
          lineHeight="1.5rem"
        >
          <router-link to={props.href} custom>
            {
              // converted router-link v-slot to jsx
              // https://router.vuejs.org/api/#v-slot-api-3-1-0
            }
            {({ href, navigate }: any) => (
              <StyledLink isActive={isActive} href={href} onClick={navigate}>
                {renderSlot(slots, 'default')}
              </StyledLink>
            )}
          </router-link>
        </c-box>
      )
    }
  },
})
</script>
