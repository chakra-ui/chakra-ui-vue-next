<template>
  <chakra.div>
    <c-button :ref="reference" @click="toggleIsOpen">Testing</c-button>
    <div v-if="isOpen" :ref="popper" style="padding: 20px; background: red">
      <div
        data-popper-arrow=""
        style="--popper-arrow-size: 10px; background: yellow"
      />
      Popper
    </div>
  </chakra.div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { usePopper } from '@chakra-ui/c-popper'
import { CButton } from '@chakra-ui/c-button'
import { useToggle } from '@vueuse/core'

export default defineComponent({
  components: { CButton },
  setup() {
    const [isOpen, toggleIsOpen] = useToggle(true)

    const { reference, popper } = usePopper({
      gutter: 16,
      placement: 'right-end',
    })

    return {
      isOpen,
      toggleIsOpen,
      reference,
      popper,
    }
  },
})
</script>
