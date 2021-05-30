<script lang="tsx">
import { defineComponent, ref, renderSlot, SetupContext, watch } from 'vue'
import { useColorModeValue } from '@chakra-ui/vue-next'
import { useRoute } from 'vue-router'
import { useLockScroll } from 'vue-composable'
import { SidebarContent } from '../components/Sidebar/AppSidebar.vue'
import { getRoutes } from '../layout/LayoutMdx.vue'

export const MobileNavButton = (props: any, { slots }: SetupContext) => (
  <c-icon-button
    display={{ base: 'flex', md: 'none' }}
    aria-label="Open menu"
    fontSize="20px"
    color={useColorModeValue('gray.800', 'inherit').value}
    variant="ghost"
    icon="menu"
  >
    {renderSlot(slots, 'default')}
  </c-icon-button>
)

const NavLink = ({ href }: { href?: string }, { slots }: SetupContext) => {
  const { path } = useRoute()
  const [, group] = href!.split('/')
  const isActive = path.includes(group)

  return (
    <router-link to={href} custom>
      {({ href, navigate }: any) => (
        <c-center
          flex="1"
          minH="40px"
          as="a"
          href={href}
          onClick={navigate}
          rounded="md"
          transition="0.2s all"
          fontWeight={isActive ? 'semibold' : 'medium'}
          bg={isActive ? 'teal.400' : undefined}
          borderWidth={isActive ? undefined : '1px'}
          color={isActive ? 'white' : undefined}
          _hover={{
            bg: isActive
              ? 'teal.500'
              : useColorModeValue('gray.100', 'whiteAlpha.100').value,
          }}
        >
          {renderSlot(slots, 'default')}
        </c-center>
      )}
    </router-link>
  )
}

const ScrollView = (props: any, { slots }: SetupContext) => {
  return (
    <c-box flex="1" id="routes" overflow="auto" px="6" pb="6">
      {renderSlot(slots, 'default')}
    </c-box>
  )
}

export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const closeBtnRef = ref()
    const { lock, unlock } = useLockScroll('body', { auto: false })
    watch(
      () => props.isOpen,
      () => {
        if (props.isOpen) {
          lock()
        } else {
          unlock()
        }
      },
      {
        immediate: true,
      }
    )
    const handleClose = () => {
      emit('close')
    }

    const { path } = useRoute()
    const routes = getRoutes(path)

    return () => {
      return (
        <>
          {props.isOpen && (
            <c-flex
              direction="column"
              w="100%"
              bg={useColorModeValue('white', 'gray.800').value}
              h="100vh"
              overflow="auto"
              pos="absolute"
              top="0"
              left="0"
              zIndex="20"
              pb="8"
            >
              <c-box>
                <c-flex justify="space-between" px="6" pt="5" pb="4">
                  <logo sx={{ rect: { fill: 'teal.300' } }} />
                  <c-h-stack spacing="5">
                    <sponsor-button display="flex" />
                    <c-close-button ref={closeBtnRef} onClick={handleClose} />
                  </c-h-stack>
                </c-flex>
                <c-box px="6" pb="6" pt="2" shadow="md">
                  <c-h-stack>
                    <NavLink href="/docs/getting-started">Docs</NavLink>
                    <NavLink href="/guides/integrations/with-cra">
                      Guides
                    </NavLink>
                    <NavLink href="/team">Team</NavLink>
                  </c-h-stack>
                </c-box>
              </c-box>

              <ScrollView>
                <SidebarContent
                  pathname={path}
                  routes={routes}
                ></SidebarContent>
              </ScrollView>
            </c-flex>
          )}
        </>
      )
    }
  },
})
</script>
<style>
/* needed for useScrollLock */
.no-scroll {
  overflow: hidden !important;
}
</style>
