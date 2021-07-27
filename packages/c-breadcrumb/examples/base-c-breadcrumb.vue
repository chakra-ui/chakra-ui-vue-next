<template>
  <c-breadcrumb>
    <template v-slot:separator>
      <c-icon name="chevron-right" />
    </template>
    <c-breadcrumb-item>
      <c-breadcrumb-link as="router-link" to="/">Home</c-breadcrumb-link>
    </c-breadcrumb-item>
    <c-breadcrumb-item>
      <c-breadcrumb-link href="#">Docs</c-breadcrumb-link>
    </c-breadcrumb-item>
    <c-breadcrumb-item is-current-page>
      <c-breadcrumb-link href="#">About</c-breadcrumb-link>
    </c-breadcrumb-item>
  </c-breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
