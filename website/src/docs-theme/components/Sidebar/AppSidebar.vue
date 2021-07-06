<script lang="tsx">
import {
  BlogIcon,
  DocsIcon,
  GuidesIcon,
  TeamIcon,
  ResourcesIcon,
} from './SidebarIcons.vue'
import {
  defineComponent,
  Fragment,
  PropType,
  renderSlot,
  SetupContext,
  Ref,
  ref,
} from 'vue'
import { useColorModeValue } from '@chakra-ui/c-color-mode'
import { useRoute } from 'vue-router'
import { RouteItem, Routes } from '@/docs-theme/utils/get-route-context'
import { convertBackticksToInlineCode } from '@/docs-theme/utils/convert-backticks-to-inline-code'
import { sortBy } from 'lodash'

type MainNavLinkProps = {
  icon?: any
  href?: string
}

const MainNavLink = (
  { href, icon }: MainNavLinkProps | any,
  { slots }: SetupContext
) => {
  const { path } = useRoute()
  const [, group] = href!.split('/')
  const active = path.includes(group)
  const linkColor = useColorModeValue('gray.900', 'whiteAlpha.900')

  return (
    <router-link to={href} passHref>
      <c-flex
        as="a"
        align="center"
        fontSize="sm"
        fontWeight="semibold"
        transitionProperty="colors"
        transitionDuration="200ms"
        color={active ? linkColor.value : 'gray.500'}
        _hover={{ color: linkColor.value }}
      >
        <c-center w="6" h="6" bg="teal.400" rounded="base" mr="3">
          {icon}
        </c-center>
        {renderSlot(slots, 'default')}
      </c-flex>
    </router-link>
  )
}

const mainNavLinks = [
  {
    icon: <DocsIcon />,
    href: '/docs/getting-started',
    label: 'Docs',
  },
  {
    icon: <GuidesIcon />,
    href: '/guides/integrations/with-cra',
    label: 'Guides',
  },
  {
    icon: <ResourcesIcon />,
    href: '/resources',
    label: 'Resources',
  },
  {
    icon: <TeamIcon />,
    href: '/team',
    label: 'Team',
  },
  {
    icon: <BlogIcon />,
    href: '/blog',
    label: 'Blog',
  },
]

const MainNavLinkGroup = (props: any) => {
  return (
    <c-list spacing="4" styleType="none" {...props}>
      {mainNavLinks.map((item) => (
        <c-list-item key={item.label}>
          <MainNavLink icon={item.icon} href={item.href}>
            {item.label}
          </MainNavLink>
        </c-list-item>
      ))}
    </c-list>
  )
}

export type SidebarContentProps = Routes & {
  pathname: string
  contentRef?: any
}

export const SidebarContent = defineComponent({
  props: {
    routes: Object as PropType<SidebarContentProps['routes']>,
    pathname: String as PropType<SidebarContentProps['pathname']>,
    contentRef: Object as PropType<Ref>,
  },
  setup(props) {
    return () => {
      return (
        <>
          {props.routes!.map((lvl1, idx) => {
            return (
              <Fragment key={idx}>
                {lvl1.heading && (
                  <c-box
                    as="h4"
                    fontSize="sm"
                    fontWeight="bold"
                    my="1.25rem"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    color={useColorModeValue('gray.700', 'inherit')}
                  >
                    {lvl1.title}
                  </c-box>
                )}
                {lvl1.routes!.map((lvl2, index) => {
                  if (!lvl2.routes) {
                    return (
                      <sidebar-link
                        ml="-3"
                        mt="2"
                        key={lvl2.path}
                        href={lvl2.path}
                      >
                        {lvl2.title}
                      </sidebar-link>
                    )
                  }

                  const selected = props.pathname!.startsWith(lvl2.path!)
                  const opened = selected || lvl2.open

                  const sortedRoutes = !!lvl2.sort
                    ? sortBy(lvl2.routes, (i) => i.title)
                    : lvl2.routes

                  return (
                    <sidebar-category
                      contentRef={props.contentRef}
                      key={lvl2.path! + index}
                      title={lvl2.title}
                      selected={selected}
                      opened={opened}
                    >
                      <c-stack as="ul">
                        {sortedRoutes.map((lvl3) => (
                          <sidebar-link
                            as="li"
                            key={lvl3.path}
                            href={lvl3.path}
                          >
                            <span>
                              {convertBackticksToInlineCode(lvl3.title)}
                            </span>
                            {lvl3.new && (
                              <c-badge
                                ml="2"
                                lineHeight="tall"
                                fontSize="10px"
                                variant="solid"
                                colorScheme="purple"
                              >
                                New
                              </c-badge>
                            )}
                          </sidebar-link>
                        ))}
                      </c-stack>
                    </sidebar-category>
                  )
                })}
              </Fragment>
            )
          })}
        </>
      )
    }
  },
})

//Sidebar
export default defineComponent({
  props: {
    routes: Object as PropType<RouteItem[]>,
  },
  setup(props) {
    const { path } = useRoute()
    const contentRef = ref()
    const headerHeight = '4.5rem' // we pull down the sidebar as header height (72px)
    return () => {
      return (
        <c-box
          ref={contentRef}
          as="nav"
          aria-label="Main Navigation"
          pos="sticky"
          sx={{
            overscrollBehavior: 'contain',
          }}
          top={headerHeight}
          w="280px"
          h="calc(100vh - 5rem)"
          pr="8"
          pb="16"
          pl="6"
          pt="8"
          overflowY="auto"
          class="sidebar-content"
          flexShrink={0}
          display={{ base: 'none', md: 'block' }}
        >
          <MainNavLinkGroup mb="10" />
          <SidebarContent
            routes={props.routes}
            pathname={path}
            contentRef={contentRef}
          />
        </c-box>
      )
    }
  },
})
</script>
