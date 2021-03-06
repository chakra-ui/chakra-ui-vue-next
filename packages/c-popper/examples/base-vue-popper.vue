<template>
  <chakra.div h="100%" d="flex" p="12">
    <c-portal>
      <transition
        :css="false"
        @leave="(el, done) => motions.popper.leave(done)"
      >
        <chakra.span
          ref="popperElement"
          v-motion="'popper'"
          :initial="{
            opacity: 0,
            ...popper?.styles?.popper,
          }"
          :enter="{
            opacity: 1,
            ...popper?.styles?.popper,
          }"
          :leave="{
            opacity: 0,
            ...popper?.styles?.popper,
          }"
          :css="[popper?.styles?.popper]"
          v-bind="popper?.attributes?.popper"
          v-if="enabled"
          shadow="lg"
          rounded="lg"
          bg="yellow.300"
          border-width="5px"
          border-color="yellow.500"
          color="yellow.700"
          px="3"
          py="2"
          text="center"
          cursor="pointer"
        >
          Popper content :D
        </chakra.span>
      </transition>
    </c-portal>

    <c-button
      mt="3"
      ref="referenceElement"
      color-scheme="blue"
      @click="togglePopper"
    >
      {{ enabled ? 'Hide' : 'Show' }} popper
    </c-button>

    <chakra.div pos="fixed" top="8" right="8" z-index="10">
      <chakra.pre
        p="4"
        font-size="sm"
        bg="gray.100"
        font-weight="bold"
        rounded="md"
        max-h="500px"
        overflow-y="scroll"
      >
        popperStyles: {{ popper?.styles?.popper }}
      </chakra.pre>
      <chakra.pre
        mt="6"
        p="4"
        font-size="sm"
        bg="gray.100"
        font-weight="bold"
        rounded="md"
        max-h="500px"
        overflow-y="scroll"
      >
        placement: {{ popper?.state?.placement }}
      </chakra.pre>
    </chakra.div>
  </chakra.div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { usePopper } from '@chakra-ui/c-popper'
import { useMotions } from '@vueuse/motion'

const motions = useMotions()

const referenceElement = ref()
const popperElement = ref()

const popperOptions = reactive({
  enabled: false,
  placement: 'right',
})

const popper = ref()

const togglePopper = async () => {
  popperOptions.enabled = !popperOptions.enabled
}

const enabled = computed(() => popperOptions.enabled)

const _referenceElement = computed(
  () => referenceElement.value?.$el || referenceElement.value
)

const _popperElement = computed(
  () => popperElement.value?.$el || popperElement.value
)

onMounted(() => {
  watch(
    () => popperOptions.enabled,
    async (newVal) => {
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
      }
    }
  )
})
</script>
