<script lang="tsx">
import { defineComponent, PropType, reactive, ref, Ref, renderSlot } from 'vue'
import { useColorModeValue, BoxProps } from '@chakra-ui/vue-next'

interface SidebarCategoryProps extends BoxProps {
  isMobile?: boolean
  title: string
  opened?: boolean
  selected?: boolean
  contentRef?: Ref<any>
}

interface SidebarState {
  toggle?: boolean
  shouldScroll?: boolean
}

export default defineComponent({
  props: {
    contentRef: Object as PropType<SidebarCategoryProps['contentRef']>,
    selected: Boolean as PropType<SidebarCategoryProps['selected']>,
    opened: Boolean as PropType<SidebarCategoryProps['opened']>,
    title: String as PropType<SidebarCategoryProps['title']>,
    isMobile: Boolean as PropType<SidebarCategoryProps['isMobile']>,
  },
  setup(props, { slots }) {
    const sidebarCategoryRef = ref(null)

    const sidebarState = reactive<SidebarState>({
      toggle: props.selected || props.opened,
    })

    return () => {
      return (
        <c-box mt="8" ref={sidebarCategoryRef}>
          <c-box
            as="p"
            width="full"
            textTransform="uppercase"
            letterSpacing="wider"
            fontSize="xs"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            userSelect="none"
            color={useColorModeValue('gray.500', 'inherit')}
          >
            {props.title}
          </c-box>
          <c-box role="group" hidden={!sidebarState.toggle} mt="4" mx="-3">
            {renderSlot(slots, 'default')}
          </c-box>
        </c-box>
      )
    }
  },
})
</script>
