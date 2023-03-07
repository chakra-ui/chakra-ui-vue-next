<script setup lang="ts">
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
import { useDisclosure } from "../../vue-composables/src/use-disclosure"
import { CHStack } from "../../layout/src/stack"

const { isOpen, open, toggle } = useDisclosure({
  defaultIsOpen: false,
})
</script>

<template>
  <c-h-stack>
    <c-button @click="toggle"> Trigger </c-button>
    <c-popover
      :positioning="{
        placement: 'right-start',
      }"
      :is-open="isOpen"
    >
      <c-popover-trigger>
        <c-button color-scheme="pink"> Popover Target </c-button>
      </c-popover-trigger>
      <c-popover-content>
        <c-popover-arrow />
        <c-popover-header font-weight="bold">Confirmation</c-popover-header>
        <c-popover-body>
          Are you sure you want to continue with your action?
        </c-popover-body>
        <c-popover-footer>
          <c-button-group size="sm" display="flex" justify-content="flex-end">
            <c-button variant="outline">Cancel</c-button>
            <c-button color-scheme="red"> Apply </c-button>
          </c-button-group>
        </c-popover-footer>
        <c-popover-close-button />
      </c-popover-content>
    </c-popover>
  </c-h-stack>
</template>
