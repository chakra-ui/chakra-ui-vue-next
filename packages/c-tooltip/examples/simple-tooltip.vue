<script setup lang="ts">
import { CTooltip, CTooltipTrigger, CTooltipContent } from "../src"
import { CButton, CSimpleGrid } from "../../vue/src"

const placements = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end",
]
</script>

<template>
  <c-simple-grid
    gap="16"
    template-columns="repeat(3, auto)"
    grid-auto-flow="row"
  >
    <c-tooltip
      v-for="placement in placements"
      :key="placement"
      :positioning="{
        placement: placement as any,
      }"
    >
      <c-tooltip-trigger>
        <c-button size="xs" variant="outline"> {{ placement }} </c-button>
      </c-tooltip-trigger>
      <c-tooltip-content>Tooltip content {{ placement }}</c-tooltip-content>
    </c-tooltip>
  </c-simple-grid>
</template>
