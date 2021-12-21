<template>
  <c-v-stack align="start" spacing="4">
    <c-box>
      <c-box>Center</c-box>
      <c-center w="40px" h="40px" bg="tomato" color="white">
        <c-icon name="phone"></c-icon>
      </c-center>
    </c-box>
    <c-box>
      <c-box>Square</c-box>
      <c-square size="40px" bg="purple.700" color="white">
        <c-icon name="phone"></c-icon>
      </c-square>
    </c-box>
    <c-box>
      <c-box>Circle</c-box>
      <c-circle :center-content="true" size="40px" bg="teal.700" color="white">
        <c-icon name="phone"></c-icon>
      </c-circle>
    </c-box>
    <c-box>
      <c-link to="/"> Test router link </c-link>
    </c-box>
    <c-box>
      <c-kbd color-scheme="cyan"> Test keyboard shortcut </c-kbd>
    </c-box>
  </c-v-stack>
</template>

<script setup lang="ts">
import {
  CHStack,
  CVStack,
  CCenter,
  CBox,
  CSquare,
  CCircle,
  CLink,
  CKbd,
} from '../src'
</script>
