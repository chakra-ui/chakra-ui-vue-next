<template>
  <c-button @click="toggle">Toggle Collapse</c-button>
  <c-collapse :is-open="open">
    <chakra.div
      :__css="{
        background: 'red',
        padding: 30,
        color: 'white',
        fontWeight: 'bold',
      }"
    >
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </chakra.div>
  </c-collapse>
  <c-text>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the
    1500s, when an unknown printer took a galley of type and scrambled it to
    make a type specimen book.
  </c-text>
</template>

<script lang="ts" setup>
import { useToggle } from "@vueuse/core"
import { CCollapse } from "../src"

const [open, toggle] = useToggle(false)
</script>
