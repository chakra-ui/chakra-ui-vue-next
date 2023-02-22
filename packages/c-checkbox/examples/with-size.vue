<template>
  <c-stack :spacing="[1, 5]" :direction="['column', 'row']">
    <c-checkbox size="sm" default-checked color-scheme="red">
      Small checkbox
    </c-checkbox>
    <c-checkbox size="md" default-checked color-scheme="green">
      Medium checkbox (default)
    </c-checkbox>
    <c-checkbox size="lg" default-checked color-scheme="pink">
      Large checkbox
    </c-checkbox>
  </c-stack>
</template>

<script lang="ts" setup>
import { CCheckbox } from "../src"
</script>
