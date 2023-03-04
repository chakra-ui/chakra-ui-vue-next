<script setup lang="ts">
import { chakra, useColorModeValue, CStack } from "../../vue/src"
import {
  CPopover,
  CPopoverTrigger,
  CPopoverContent,
  CPopoverArrow,
  CPopoverHeader,
  CPopoverBody,
  CPopoverFooter,
} from "../src"
import { CButton } from "../../c-button/src"
</script>

<template>
  <c-popover>
    <c-popover-trigger>
      <c-button> Click me </c-button>
    </c-popover-trigger>
    <c-popover-content>
      <c-popover-arrow />
      <c-popover-header>Confirmation!</c-popover-header>
      <c-popover-body>
        Are you sure you want to have that milkshake?
      </c-popover-body>
      <c-popover-footer>This is the footer</c-popover-footer>
    </c-popover-content>
  </c-popover>
</template>
