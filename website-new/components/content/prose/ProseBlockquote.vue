<script setup>
import { CAlert } from "@chakra-ui/c-alert"
</script>

<template>
  <CAlert
    mt="4"
    role="none"
    status="warning"
    variant="left-accent"
    as="blockquote"
    rounded="4px"
    my="1.5rem"
  >
    <slot />
  </CAlert>
</template>
