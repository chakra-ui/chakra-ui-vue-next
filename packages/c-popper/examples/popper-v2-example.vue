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
import { defineComponent } from "vue"
import { usePopper } from "../src"
import { chakra, CButton } from "@chakra-ui/vue-next"
import { useToggle } from "@vueuse/core"

export default defineComponent({
  components: { CButton },
  setup() {
    const [isOpen, toggleIsOpen] = useToggle(true)

    const { reference, popper } = usePopper({
      gutter: 16,
      placement: "right-end",
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
