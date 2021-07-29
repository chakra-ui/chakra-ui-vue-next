<template>
  <c-stack>
    <c-heading size="sm" color="tomato"> With default separator </c-heading>
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
    <c-heading size="sm" color="tomato"> With separator as string </c-heading>
    <c-breadcrumb separator=">">
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
    <c-heading size="sm" color="tomato">
      With separator props as functional component
    </c-heading>
    <c-breadcrumb :separator="Sun">
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
    <c-heading size="sm" color="tomato"> With separator slot </c-heading>
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
  </c-stack>
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
