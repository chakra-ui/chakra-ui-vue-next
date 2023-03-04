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
  >
    <c-popover-trigger>
      <c-button> Portal Popover </c-button>
    </c-popover-trigger>
    <Teleport to="body">
      <c-popover-content>
        <c-popover-arrow />
        <c-popover-header>Look! I'm portalled</c-popover-header>
        <c-popover-body>
          Inspect me in the DOM and you'll see that I'm portalled to the end of
          the body
        </c-popover-body>
        <c-popover-footer>
          <c-button size="sm">Okay</c-button>
        </c-popover-footer>
        <c-popover-close-button />
      </c-popover-content>
    </Teleport>
  </c-popover>
</template>
