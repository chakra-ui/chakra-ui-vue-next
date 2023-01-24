<template>
  <c-avatar size="xl" alt="Evan you" loading="lazy">
    <template v-slot:icon>
      <c-icon color="white" name="discord" />
    </template>
  </c-avatar>
</template>
<script setup lang="ts">
import { CAvatar } from "../../src"
</script>
