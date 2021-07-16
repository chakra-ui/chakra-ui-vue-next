<script lang="tsx">
import { defineComponent, renderSlot, SetupContext } from 'vue'

type PaginationLinkProps = {
  href?: string
  label?: string
} & {
  [key: string]: any
}

const PaginationLink = (
  { href, label, ...rest }: PaginationLinkProps,
  { slots }: SetupContext
) => (
  <router-link to={href} custom>
    {
      // converted router-link v-slot to jsx
      // https://router.vuejs.org/api/#v-slot-api-3-1-0
    }
    {({ href, navigate }: any) => (
      <c-link
        href={href}
        onClick={navigate}
        _hover={{
          textDecor: 'none',
        }}
        flex="1"
        borderRadius="md"
        {...rest}
      >
        <c-text fontSize="sm" px="2">
          {label}
        </c-text>
        <c-text mt="1" fontSize="lg" fontWeight="bold" color="emerald.400">
          {renderSlot(slots, 'default')}
        </c-text>
      </c-link>
    )}
  </router-link>
)

export default defineComponent({
  props: {
    previous: Object,
    next: Object,
  },
  setup(props) {
    return () => {
      return (
        <c-simple-grid
          as="nav"
          aria-label="Pagination"
          spacing="40px"
          my="64px"
          columns={2}
        >
          {props.previous ? (
            <PaginationLink
              textAlign="left"
              label="Previous"
              href={props.previous.path}
              rel="prev"
            >
              <c-icon
                name="chevron-left"
                mr="1"
                fontSize="1.2em"
                lineHeight="1em"
                d="inline-block"
                verticalAlign="middle"
              ></c-icon>
              {props.previous.title}
            </PaginationLink>
          ) : (
            <div />
          )}
          {props.next ? (
            <PaginationLink
              textAlign="right"
              label="Next"
              href={props.next.path}
              rel="next"
            >
              {props.next.title}
              <c-icon
                name="chevron-right"
                ml="1"
                fontSize="1.2em"
                lineHeight="1em"
                d="inline-block"
                verticalAlign="middle"
              ></c-icon>
            </PaginationLink>
          ) : (
            <div />
          )}
        </c-simple-grid>
      )
    }
  },
})
</script>
