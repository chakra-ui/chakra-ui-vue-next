<script setup lang="ts">
import {
  CTooltipRoot,
  CTooltipTrigger,
  CTooltipContent,
  CTooltipArrow,
} from "../src"
import { chakra, CHStack, createIcon } from "../../vue/src"

const ChakraIcon = createIcon({
  name: "ChakraUIIcon",
  viewBox: "0 0 24 24",
  path: `
    <path fill="currentColor" d="M12 0C5.352 0 0 5.352 0 12s5.352 12 12 12s12-5.352 12-12S18.648 0 12 0zm2.8 4.333c.13-.004.248.136.171.278l-3.044 5.58a.187.187 0 0 0 .164.276h5.26c.17 0 .252.207.128.323l-9.22 8.605c-.165.154-.41-.063-.278-.246l4.364-6.021a.187.187 0 0 0-.151-.296H6.627a.187.187 0 0 1-.131-.32l8.18-8.123a.182.182 0 0 1 .125-.056z"/>
  `,
})
</script>

<template>
  <c-h-stack spacing="8">
    <c-tooltip-root :positioning="{ placement: 'bottom-start' }">
      <c-tooltip-trigger>
        <chakra-icon box-size="8" />
      </c-tooltip-trigger>
      <c-tooltip-content>
        <c-tooltip-arrow />
        <chakra.span> Chakra UI Vue </chakra.span>
      </c-tooltip-content>
    </c-tooltip-root>
  </c-h-stack>
</template>
