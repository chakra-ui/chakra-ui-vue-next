<script setup lang="ts">
import { CTooltip, CTooltipTrigger, CTooltipContent } from "../src"
import { CHStack, createIcon } from "../../vue/src"

const VueIcon = createIcon({
  name: "VueIcon",
  viewBox: "0 0 24 24",
  path: `
    <path fill="currentColor" d="M2 3h3.5L12 15l6.5-12H22L12 21L2 3m4.5 0h3L12 7.58L14.5 3h3L12 13.08L6.5 3Z"/>
  `,
})

const NuxtIcon = createIcon({
  name: "NuxtIcon",
  viewBox: "0 0 24 24",
  path: `
    <path fill="currentColor" d="M13.464 19.83h8.922c.283 0 .562-.073.807-.21a1.59 1.59 0 0 0 .591-.574a1.53 1.53 0 0 0 .216-.783a1.529 1.529 0 0 0-.217-.782L17.792 7.414a1.59 1.59 0 0 0-.591-.573a1.652 1.652 0 0 0-.807-.21c-.283 0-.562.073-.807.21a1.59 1.59 0 0 0-.59.573L13.463 9.99L10.47 4.953a1.591 1.591 0 0 0-.591-.573a1.653 1.653 0 0 0-.807-.21c-.284 0-.562.073-.807.21a1.591 1.591 0 0 0-.591.573L.216 17.481a1.53 1.53 0 0 0-.217.782c0 .275.074.545.216.783a1.59 1.59 0 0 0 .59.574c.246.137.525.21.808.21h5.6c2.22 0 3.856-.946 4.982-2.79l2.733-4.593l1.464-2.457l4.395 7.382h-5.859Zm-6.341-2.46l-3.908-.002l5.858-9.842l2.923 4.921l-1.957 3.29c-.748 1.196-1.597 1.632-2.916 1.632z"/>
  `,
})

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
    <c-tooltip>
      <c-tooltip-trigger>
        <chakra-icon box-size="8" />
      </c-tooltip-trigger>
      <c-tooltip-content> Chakra UI </c-tooltip-content>
    </c-tooltip>
    <c-tooltip>
      <c-tooltip-trigger>
        <vue-icon box-size="8" />
      </c-tooltip-trigger>
      <c-tooltip-content> Vue </c-tooltip-content>
    </c-tooltip>
    <c-tooltip>
      <c-tooltip-trigger>
        <nuxt-icon box-size="8" />
      </c-tooltip-trigger>
      <c-tooltip-content> Nuxt </c-tooltip-content>
    </c-tooltip>
  </c-h-stack>
</template>
