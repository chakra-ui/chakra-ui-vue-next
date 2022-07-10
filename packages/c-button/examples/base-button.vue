<template>
  <div>
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
