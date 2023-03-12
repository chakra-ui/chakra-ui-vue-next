<script setup lang="ts">
import { Teleport } from "vue"
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
import { CButton } from "../../c-button/src"
</script>

<template>
  <c-popover
    :positioning="{
      placement: 'bottom-start',
    }"
    modal
  >
    <c-popover-trigger>
      <c-button> Trigger </c-button>
    </c-popover-trigger>
    <Teleport to="body">
      <c-popover-content>
        <c-popover-arrow />
        <c-popover-header>Focus Trapped!</c-popover-header>
        <c-popover-body>
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </c-popover-body>
        <c-popover-footer>
          <c-button size="sm">Okay</c-button>
        </c-popover-footer>
        <c-popover-close-button />
      </c-popover-content>
    </Teleport>
  </c-popover>
</template>
