<template>
  <chakra.div h="100%" d="flex" mr="2">
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
            align-items="center"
            min-w="100px"
            shadow="lg"
            rounded="lg"
            transform-origin="top left"
            bg="gray.50"
            border-width="1px"
            border-color="gray.300"
            color="gray.600"
            cursor="pointer"
            overflow="hidden"
            p="2"
          >
            <slot></slot>
          </chakra.div>
        </chakra.span>
      </transition>
    </c-portal>

    <CIconButton
      :ref="reference"
      id="referenceElement"
      @mouseover="toggleIsOpen"
      @mouseleave="toggleIsOpen"
      variant="ghost"
      variant-color="gray"
      :aria-label="ariaLabel"
      target="_blank"
      rel="noopener noreferrer"
      :href="link"
      :icon="icon"
    />
  </chakra.div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { usePopper } from '@chakra-ui/c-popper'
import { CIconButton, CPortal } from '@chakra-ui/vue-next'
import { useToggle } from '@vueuse/core'
import { useMotion } from '@vueuse/motion'

export default defineComponent({
  name: 'NavbarPopper',
  components: { CIconButton, CPortal },
  props: {
    icon: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    ariaLabel: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const [isOpen, toggleIsOpen] = useToggle(false)
    const motionInstance = ref()
    const innerMotionInstance = ref()
    const innerPopperElement = ref()
    const { reference, popper, popperEl } = usePopper({
      gutter: 16,
      placement: 'bottom-end',
    })

    const _innerPopperElement = computed(
      () => innerPopperElement.value?.$el || innerPopperElement.value
    )

    const variants = {
      initial: {
        opacity: 0,
      },
      enter: {
        opacity: 1,
      },
      leave: {
        opacity: 0,
      },
    }

    const innerVariants = {
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
    }

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
      ...props,
    }
  },
})
</script>
