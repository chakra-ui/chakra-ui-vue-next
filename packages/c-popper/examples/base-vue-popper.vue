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
        <chakra.span
          ref="popperElement"
          v-bind="popper?.attributes?.popper"
          v-if="enabled"
        >
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
              @click="togglePopper"
              variant="outline"
              size="sm"
              justify-content="flex-start"
              border="none"
              rounded="none"
            >
              New files
            </c-button>
            <c-button
              @click="togglePopper"
              variant="outline"
              size="sm"
              justify-content="flex-start"
              border="none"
              rounded="none"
            >
              Save file
            </c-button>
            <c-button
              @click="togglePopper"
              variant="outline"
              size="sm"
              justify-content="flex-start"
              border="none"
              rounded="none"
            >
              Save file as
            </c-button>
            <c-button
              @click="togglePopper"
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
      mt="3"
      ref="referenceElement"
      id="referenceElement"
      color-scheme="blue"
      @click="togglePopper"
    >
      {{ enabled ? 'Close' : 'Menu' }}
    </c-button>

    <chakra.div pos="fixed" top="8" right="8" z-index="10">
      <chakra.pre
        p="4"
        font-size="sm"
        bg="gray.100"
        font-weight="bold"
        rounded="md"
        max-h="calc(100vh - 72px)"
        overflow-y="scroll"
      >
        popper: {{ popper }}
      </chakra.pre>
    </chakra.div>
  </chakra.div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onBeforeUpdate,
  onUpdated,
  reactive,
  ref,
  watch,
} from 'vue'
import { usePopper } from '@chakra-ui/c-popper'
import { CButton } from '@chakra-ui/c-button'
import { useMotion } from '@vueuse/motion'

const waitFor = (duration = 0) =>
  new Promise((resolve) => setTimeout(resolve, duration))

export default defineComponent({
  components: { CButton },
  setup() {
    const referenceElement = ref()
    const popperElement = ref()
    const innerPopperElement = ref()

    const popperOptions = reactive({
      enabled: false,
      placement: 'bottom-start',
    })

    const popper = ref()
    // Create local reference for Motion Instance
    // As it will be generated after Popper one
    const motionInstance = ref()
    const innerMotionInstance = ref()

    const togglePopper = async () => {
      popperOptions.enabled = !popperOptions.enabled
      if (popper.value) {
        popper.value.forceUpdate()
      }
    }

    const enabled = computed(() => popperOptions.enabled)

    const _referenceElement = computed(() => {
      console.log(
        'computed referenceElement.value.$el',
        referenceElement.value?.$el || referenceElement.value
      )
      return referenceElement.value?.$el || referenceElement.value
    })

    const _popperElement = computed(
      () => popperElement.value?.$el || popperElement.value
    )

    const _innerPopperElement = computed(
      () => innerPopperElement.value?.$el || innerPopperElement.value
    )

    // Create a computed for Variants
    // As they need to be based on Popper styling
    const _variants = computed(() => ({
      initial: {
        opacity: 0,
        ...popper?.value?.styles?.popper,
      },
      enter: {
        opacity: 1,
        ...popper?.value?.styles?.popper,
      },
      leave: {
        opacity: 0,
        ...popper?.value?.styles?.popper,
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
      () => popperOptions.enabled,
      async (newVal) => {
        await nextTick()

        if (newVal) {
          await nextTick()

          if (popper.value) {
            popper.value.forceUpdate()
          }

          popper.value = usePopper(
            _referenceElement.value,
            _popperElement.value,
            // @ts-ignore
            popperOptions
          )

          popper.value.forceUpdate()

          // Generate and assign Motion Instance
          // Once Popper has been initiated
          motionInstance.value = useMotion(_popperElement.value, _variants)
          innerMotionInstance.value = useMotion(
            _innerPopperElement.value,
            innerVariants.value
          )
        } else {
          popper.value?.destroy()
        }
      },
      {
        immediate: true,
      }
    )

    const popperReferenceState = computed(
      () => popper.value?.state?.modifiersData.hide.isReferenceHidden
    )

    // watch(popperReferenceState, async (newVal) => {
    //   if (newVal) {
    //     await nextTick()
    //     popper.value = usePopper(
    //       _referenceElement.value,
    //       _popperElement.value,
    //       // @ts-ignore
    //       popperOptions
    //     )

    //     popper.value.forceUpdate()
    //   }
    // })

    onUpdated(async () => {
      popper.value?.destroy?.()
      await nextTick()
      await nextTick()
      popper.value = usePopper(
        referenceElement.value?.$el,
        _popperElement.value,
        // @ts-ignore
        popperOptions
      )

      popper.value.forceUpdate()
    })

    return {
      referenceElement,
      popperElement,
      innerPopperElement,
      motionInstance,
      innerMotionInstance,
      popper,
      enabled,
      togglePopper,
      popperReferenceState,
    }
  },
})
</script>
