<template>
  <c-breadcrumb>
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
import { defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import { CIcon } from '@chakra-ui/vue-next'

const Sun = () => {
  return h(CIcon, {
    name: 'sun',
  })
}
const route = useRoute()
</script>
