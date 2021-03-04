<template>
  <chakra.div
    h="100%"
    d="flex"
    flex-direction="column"
    align-items="center"
    justify-content="center"
    ref="node"
  >
    <chakra.pre
      ref="referenceElement"
      p="4"
      bg="gray.100"
      font-weight="bold"
      rounded="md"
      @mousedown="togglePopper"
    >
      {{ props }}
    </chakra.pre>
    <c-portal>
      <transition name="fade">
        <span
          ref="popperElement"
          :style="popper?.styles?.popper"
          v-show="popperOptions.enabled"
          v-bind="popper?.attributes?.popper"
          shadow="lg"
          rounded="md"
          bg="yellow.300"
          color="yellow.700"
          px="3"
          py="2"
          text="center"
          cursor="pointer"
        >
          Popper content :D
        </span>
      </transition>
    </c-portal>
    <chakra.pre>
      {{ popper }}
    </chakra.pre>
  </chakra.div>
</template>

<script lang="ts" setup>
import { isVNode, nextTick, onMounted, reactive, ref } from 'vue'
import { usePopper } from '@chakra-ui/c-popper'

const props = reactive({
  firstName: 'John',
  lastName: 'Switch',
})

const node = ref()
const referenceElement = ref()
const popperElement = ref()

const popperOptions = reactive({
  enabled: false,
  placement: 'left',
})

const togglePopper = () => {
  popperOptions.enabled = !popperOptions.enabled
}

const popper = ref()

onMounted(() => {
  setTimeout(() => {
    setInterval(togglePopper, 1000)
    popper.value = usePopper(
      referenceElement.value?.$el || referenceElement.value,
      popperElement.value?.$el || popperElement.value,
      // @ts-ignore
      popperOptions
    )

    console.log(popperElement.value.$el)
  }, 2000)
})
</script>
