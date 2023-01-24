<template>
  <c-avatar
    src="https://www.github.com/yyx990803.png"
    size="xl"
    alt="Evan you"
    loading="lazy"
    :icon="GitHubIcon"
  >
    <c-icon color="white" name="add" w="0.3em" />
  </c-avatar>
</template>
<script setup>
import { CAvatar } from "../../src"
import { createIconComponent } from "@chakra-ui/c-icon"

const GitHubIcon = createIconComponent("github")
</script>
