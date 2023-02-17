<template>
  <c-container>
    <c-heading>Chakra UI Vue Next</c-heading>
    <c-grid template-columns="1fr 1fr" gap="5">
      <!-- <c-grid-item>
        <c-stack>
          <c-h-stack>
            <chakra.p>Toggle Color Mode</chakra.p>
            <c-icon-button
              :aria-label="
                colorMode === 'light'
                  ? 'Switch to dark mode'
                  : 'Switch to light mode'
              "
              :icon="colorMode === 'light' ? 'moon' : 'sun'"
              @click="toggleColorMode"
              color-scheme="red"
            />
          </c-h-stack>
          <chakra.h3>Buttons</chakra.h3>
          <c-stack align="flex-start">
            <c-button color-scheme="purple" size="lg">Large Button</c-button>
            <c-button color-scheme="purple" size="md">Medium Button</c-button>
            <c-button color-scheme="purple" size="sm">Small Button</c-button>
            <c-button color-scheme="purple" size="xs"
              >Extra Small Button</c-button
            >
          </c-stack>
        </c-stack>
      </c-grid-item> -->
      <c-grid-item>
        <c-heading>Toast</c-heading>
        <c-button @click="handleClick">Hello Chakra UI</c-button>
      </c-grid-item>
    </c-grid>
  </c-container>
</template>

<script setup lang="ts">
import {
  chakra,
  CButton,
  CContainer,
  CGrid,
  CStack,
  CHStack,
  CGridItem,
  CHeading,
  useToast,
  useColorMode,
  CIconButton,
} from "@chakra-ui/vue-next"
const toast = useToast()

const { colorMode, toggleColorMode } = useColorMode()

function handleClick() {
  toast.value.create({
    title: "Hello world!",
  })
}
</script>
