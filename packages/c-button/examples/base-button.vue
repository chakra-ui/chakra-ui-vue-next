<template>
  <div>
    <c-button
      border="1px solid rgba(47, 43, 67, 0.1)"
      border-radius="12px"
      mr="3"
      variant="outline"
      box-shadow="0px 1px 3px rgba(47, 43, 67, 0.1), inset 0px -1px 0px rgba(47, 43, 67, 0.1)"
      bg="transparent"
    >
      Button
    </c-button>
    <c-button mr="3" @click="handleClick" color-scheme="blue">
      Base button
    </c-button>
    <c-button mr="3" color-scheme="green"> Base button</c-button>
    <c-button mr="3" color-scheme="orange"> Base button</c-button>
    <c-button mr="3" color-scheme="pink"> Base button</c-button>
  </div>
</template>

<script lang="ts" setup>
function handleClick(e: Event) {
  console.log("click", e)
}
</script>
