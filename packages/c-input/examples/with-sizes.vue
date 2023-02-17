<template>
  <chakra.div>
    <c-v-stack>
      <c-input
        v-for="size in ['sm', 'md', 'lg']"
        :size="size"
        :key="size"
        :placeholder="size"
      />
    </c-v-stack>
  </chakra.div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { chakra } from "../../vue"

const input = ref("")
const value = ref(true)

function handleInput(val: Event) {
  console.log("input", val)
}
</script>
