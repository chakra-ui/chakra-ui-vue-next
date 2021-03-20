<template>
  <chakra.div h="100%" d="flex" p="12">
    <c-portal>
      <transition
        :css="false"
        @leave="
          (el, done) => {
            motionInstance.leave(done)
            innerMotionInstance.leave?.(() => null)
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
              New files
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
              Export files
            </c-button>
          </chakra.div>
        </chakra.span>
      </transition>
    </c-portal>

    <c-button
      left-icon="star"
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

    const _variants = computed(() => ({
      initial: {
        opacity: 0,
      },
      enter: {
        opacity: 1,
      },
      leave: {
        opacity: 0,
      },
    }))

    const innerVariants = computed(() => ({
      initial: {
        scale: 0.9,
        opacity: 0,
      },
      enter: {
        scale: 1,
        opacity: 1,
        transition: {
          scale: {
            type: 'spring',
            damping: 5,
            stiffness: 550,
          },
        },
      },
      leave: {
        scale: 0.9,
        opacity: 0,
      },
    }))

    watch(
      isOpen,
      async (newVal) => {
        await nextTick()
        if (newVal) {
          // Generate and assign Motion Instance
          // Once Popper has been initiated
          motionInstance.value = useMotion(popperEl, _variants)
          innerMotionInstance.value = useMotion(
            _innerPopperElement.value,
            innerVariants.value
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
