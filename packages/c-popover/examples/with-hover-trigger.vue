<script setup lang="ts">
import {
  CPopover,
  CPopoverTrigger,
  CPopoverContent,
  CPopoverArrow,
  CPopoverHeader,
  CPopoverBody,
} from "../src"
import { CButton } from "../../c-button/src"
</script>

<template>
  <c-popover trigger="hover">
    <c-popover-trigger>
      <c-button> Hover over me </c-button>
    </c-popover-trigger>
    <c-popover-content>
      <c-popover-arrow />
      <c-popover-header>Hover Popover</c-popover-header>
      <c-popover-body>This is a popover</c-popover-body>
    </c-popover-content>
  </c-popover>
</template>
