<script setup lang="ts">
import { Teleport, ref } from "vue"
import {
  CPopover,
  CPopoverTrigger,
  CPopoverContent,
  CPopoverArrow,
  CPopoverHeader,
  CPopoverBody,
  CPopoverFooter,
  CPopoverCloseButton,
} from "../src"
import { CButton, CButtonGroup } from "../../c-button/src"
import { CBox, useRef } from "../../vue/src"

const [initialFocusRef, initialFocusRefEl] = useRef()
</script>

<template>
  <c-popover
    :positioning="{
      placement: 'bottom-start',
    }"
    :initial-focus-el="() => initialFocusRefEl"
  >
    <c-popover-trigger>
      <c-button> Trigger </c-button>
    </c-popover-trigger>
    <c-popover-content color="white" bg="blue.800" border-color="blue.800">
      <c-popover-arrow bg="blue.800" />
      <c-popover-header pt="4" font-weight="bold" border="0"
        >Manage Your Channels</c-popover-header
      >
      <c-popover-body>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore.
      </c-popover-body>
      <c-popover-footer
        border="0"
        display="flex"
        align-items="center"
        justify-content="space-between"
        pb="4"
      >
        <c-box fontSize="sm">Step 2 of 4</c-box>
        <c-button-group size="sm">
          <c-button colorScheme="green">Setup Email</c-button>
          <c-button colorScheme="blue" :ref="initialFocusRef"> Next </c-button>
        </c-button-group>
      </c-popover-footer>
      <c-popover-close-button />
    </c-popover-content>
  </c-popover>
</template>
