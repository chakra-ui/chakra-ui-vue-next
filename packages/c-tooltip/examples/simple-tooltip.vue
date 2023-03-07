<script setup lang="ts">
import { CTooltip, CTooltipTrigger, CTooltipContent } from "../src"
import { CTag } from "../../vue/src"
</script>

<template>
  <c-tooltip>
    <c-tooltip-trigger>
      <c-tag> Hover me </c-tag>
    </c-tooltip-trigger>
    <c-tooltip-content>Tooltip content</c-tooltip-content>
  </c-tooltip>
</template>
