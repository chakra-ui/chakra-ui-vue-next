<template>
  <chakra.div h="100%" d="flex" flex-direction="column" w="100%">
    <chakra.section>
      Open Vue Dev Tools to inspect page for portal elements.
      <chakra.span></chakra.span>
    </chakra.section>
    <chakra.main>
      <c-portal to="#new-target">
        <transition name="fade">
          <chakra.span
            bg="teal.100"
            color="teal.600"
            px="4"
            py="3"
            font-weight="bold"
            rounded="md"
            shadow="lg"
            v-if="isMounted"
          >
            Hi! I'm inside `CPortal` content 👉🏽 {{ value }}
          </chakra.span>
        </transition>
      </c-portal>
    </chakra.main>
  </chakra.div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"

const value = ref(5000)
const isMounted = ref(true)

onBeforeMount(() => {
  const target = document.createElement("div")
  target.style.display = "inline-block"
  target.style.position = "absolute"
  target.style.bottom = "50px"
  target.style.right = "50px"

  target.id = "new-target"
  document.body.appendChild(target)
})

setInterval(() => {
  isMounted.value = !isMounted.value
}, 2000)

setInterval(() => {
  if (value.value <= 0) {
    value.value = 5000
    return
  }
  value.value -= 100
}, 100)
</script>
