<template>
  <chakra.div h="100%" d="flex" p="12">
    <c-portal>
      <transition
        :css="false"
        @leave="
          (el, done) => {
            motionInstance.leave(done)
            innerMotionInstance.leave?.(done)
          }
        "
      >
        <chakra.span :ref="popper" v-if="isOpen">
          <chakra.div
            ref="innerPopperElement"
            d="inline-flex"
            flex-direction="column"
            w="150px"
            shadow="lg"
            rounded="lg"
            transform-origin="top left"
            bg="gray.50"
            border-width="1px"
            border-color="gray.300"
            color="gray.600"
            cursor="pointer"
            overflow="hidden"
          >
            <c-button
              @click="toggleIsOpen"
              variant="outline"
              size="sm"
              justify-content="flex-start"
              border="none"
              rounded="none"
            >
              New file
            </c-button>
            <c-button
              @click="toggleIsOpen"
              variant="outline"
              size="sm"
              justify-content="flex-start"
              border="none"
              rounded="none"
            >
              Save files
            </c-button>
            <c-button
              @click="toggleIsOpen"
              variant="outline"
              size="sm"
              justify-content="flex-start"
              border="none"
              rounded="none"
            >
              Save file as
            </c-button>
            <c-button
              @click="toggleIsOpen"
              variant="outline"
              size="sm"
              justify-content="flex-start"
              border="none"
              rounded="none"
            >
              Export file
            </c-button>
          </chakra.div>
        </chakra.span>
      </transition>
    </c-portal>

    <c-button
      right-icon="chevron-down"
      mt="3"
      :ref="reference"
      id="referenceElement"
      color-scheme="blue"
      @click="toggleIsOpen"
    >
      {{ isOpen ? 'Close' : 'Open' }}
    </c-button>
  </chakra.div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { usePopper } from '@chakra-ui/c-popper'
import { CButton } from '@chakra-ui/c-button'
import { useToggle } from '@vueuse/core'
import { useMotion } from '@vueuse/motion'
import { variants, innerVariants } from './motion.utils'

export default defineComponent({
  components: { CButton },
  setup() {
    const [isOpen, toggleIsOpen] = useToggle(true)
    const motionInstance = ref()
    const innerMotionInstance = ref()
    const innerPopperElement = ref()
    const { reference, popper, popperEl } = usePopper({
      gutter: 16,
      placement: 'right-end',
    })

    const _innerPopperElement = computed(
      () => innerPopperElement.value?.$el || innerPopperElement.value
    )

    watch(
      isOpen,
      async (newVal) => {
        await nextTick()
        if (newVal) {
          motionInstance.value = useMotion(popperEl, variants)
          innerMotionInstance.value = useMotion(
            _innerPopperElement.value,
            innerVariants
          )
        }
      },
      {
        immediate: true,
      }
    )

    return {
      isOpen,
      toggleIsOpen,
      reference,
      popper,
      innerPopperElement,
      motionInstance,
      innerMotionInstance,
    }
  },
})
</script>
