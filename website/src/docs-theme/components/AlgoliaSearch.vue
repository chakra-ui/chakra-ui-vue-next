<script lang="tsx">
import { defineComponent } from 'vue'
import { useColorModeValue } from '@chakra-ui/c-color-mode'
export default {}

// const ACTION_KEY_DEFAULT = ['Ctrl', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']

export const SearchButton = defineComponent({
  setup() {
    return () => {
      return (
        <c-box
          as="button"
          flex="1"
          type="button"
          role="search"
          mx="6"
          lineHeight="1.2"
          w="100%"
          bg={useColorModeValue('white', 'gray.700').value}
          whiteSpace="nowrap"
          display={{ base: 'none', sm: 'flex' }}
          alignItems="center"
          color="gray.400"
          py="3"
          px="4"
          outline="0"
          _focus={{ shadow: 'outline' }}
          shadow="base"
          rounded="md"
          aria-label="Search the docs"
        >
          <c-icon name="search" />
          <c-h-stack w="full" ml="3" spacing="4px">
            <c-text textAlign="left" flex="1">
              Search the docs
            </c-text>
            <c-h-stack spacing="4px">
              <c-visually-hidden>Press </c-visually-hidden>
              <c-kbd color="gray.500" rounded="2px">
                <c-box
                  title={ACTION_KEY_APPLE[1]}
                  textDecoration="none !important"
                >
                  {ACTION_KEY_APPLE[0]}
                </c-box>
              </c-kbd>
              <c-visually-hidden> and </c-visually-hidden>
              <c-kbd color="gray.500" rounded="2px">
                K
              </c-kbd>
              <c-visually-hidden> to search</c-visually-hidden>
            </c-h-stack>
          </c-h-stack>
        </c-box>
      )
    }
  },
})
</script>
