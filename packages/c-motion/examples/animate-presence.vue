<template>
  <c-stack>
    <c-button align-self="start" @click="toggleIsOpen">
      Toggle Presence
    </c-button>

    <c-h-stack>
      <!-- @ts-ignore -->
      <c-button
        v-for="(variant, i) in variants"
        :key="i"
        @click="() => setVariant(variant)"
        size="xs"
      >
        {{ variant }}
      </c-button>
    </c-h-stack>

    <c-text> Active variant: {{ activeVariant }} </c-text>
  </c-stack>
  <!-- <c-portal> -->
  <c-animate-presence
    :type="activeVariant"
    @before-enter="handleOnBeforeEnter"
    @after-enter="handleOnAfterEnter"
  >
    <chakra.div
      :bg="useColorModeValue('teal.100', 'teal.800').value"
      :color="useColorModeValue('teal.800', 'teal.100').value"
      px="4"
      py="4"
      font-weight="bold"
      rounded="md"
      shadow="lg"
      v-if="isMounted"
    >
      Fade component
    </chakra.div>
  </c-animate-presence>
  <!-- </c-portal> -->
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { computed, ref } from 'vue'
import { TransitionVariants } from '../src/motion-utils'
import type { CMotionVariant } from '../src/motion-utils'
import { CHStack } from '../../layout'
import { useColorModeValue } from '../../c-color-mode'

const activeVariant = ref<CMotionVariant>('slideLeft')

const [isMounted, toggleIsOpen] = useToggle(true)
const variants = computed(
  () => Object.keys(TransitionVariants) as CMotionVariant[]
)

const handleOnBeforeEnter = (...args: any[]) => {
  console.log('handleOnBeforeEnter', ...args)
}
const handleOnAfterEnter = (...args: any[]) => {
  console.log('handleOnAfterEnter', ...args)
}

const setVariant = (variant: CMotionVariant) => {
  activeVariant.value = variant
}
</script>
