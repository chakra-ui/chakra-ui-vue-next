<script setup lang="ts">
import { chakra, useColorModeValue } from "../../vue/src"
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
  <c-popover
    trigger="hover"
    :positioning="{
      placement: 'right',
    }"
  >
    <c-popover-trigger>
      <c-button> Over over me </c-button>
    </c-popover-trigger>
    <c-popover-content
      px="3"
      py="2"
      :bg="useColorModeValue('gray.100', 'gray.800').value"
    >
      <c-popover-arrow />
      <c-popover-header>Hover Popover</c-popover-header>
      <c-popover-body>
        <chakra.div> This is a popover </chakra.div>
      </c-popover-body>
    </c-popover-content>
  </c-popover>
</template>
