<template>
  <c-checkbox size="lg" v-model="isChecked"> Simple checkbox </c-checkbox>
</template>

<script lang="ts" setup>
import { CCheckbox } from "@chakra-ui/vue-next"
import { useToggle } from "@vueuse/core"

const [isChecked, toggleChecked] = useToggle(false)

setInterval(toggleChecked, 3000)
</script>
