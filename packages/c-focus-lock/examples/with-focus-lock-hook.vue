<template>
  <!-- 
    I noticed that when using the focus lock in a template with a component at the root,
    the application breaks, which i
   -->
  <chakra.div>
    <c-portal to="#new-target">
      <c-motion type="fade">
        <chakra.div
          :ref="lock"
          p="4"
          border="4px dashed"
          rounded="lg"
          border-color="gray.400"
          d="inline-block"
          position="relative"
          v-if="isLocked"
        >
          <c-close-button
            position="absolute"
            top="10px"
            right="10px"
            @click="deactivate"
          ></c-close-button>
          <chakra.p mb="2">Inside focus trap</chakra.p>
          <c-button color-scheme="teal"> Login </c-button>
          <c-button color-scheme="yellow" :ref="initialFocus" mx="2"
            >Initial focus!</c-button
          >
          <c-button left-icon="user" color-scheme="red"
            >Delete account</c-button
          >
        </chakra.div>
      </c-motion>
    </c-portal>
    <chakra.div
      p="4"
      border="4px dashed"
      rounded="lg"
      border-color="gray.400"
      mt="4"
      d="inline-block"
      position="absolute"
      bottom="100px"
      right="100px"
    >
      <chakra.p mb="2">Outside focus trap</chakra.p>
      <c-button @click="deactivate"> Deactivate </c-button>
      <c-button @click="activate" ml="3" color-scheme="blue">Enable</c-button>
    </chakra.div>
    <chakra.pre font-weight="bold">
      Focus lock enabled: {{ hasFocus }}
    </chakra.pre>
  </chakra.div>
</template>

<script setup lang="ts">
import { chakra } from "@chakra-ui/vue-next"
import { useFocusLock } from "../src/use-focus-lock"
import { ref } from "vue"

const isLocked = ref(false)

if (!document.getElementById("new-target")) {
  const target = document.createElement("div")
  target.style.display = "inline-block"
  target.style.position = "absolute"
  target.style.top = "50px"
  target.style.left = "250px"

  target.id = "new-target"
  document.body.appendChild(target)
}

const {
  hasFocus,
  lock,
  activate: lockactivate,
  deactivate: lockdeactivate,
  initialFocus,
} = useFocusLock({
  escapeDeactivates: false,
  delayInitialFocus: true,
  immediate: true,
})

const activate = async () => {
  isLocked.value = true
  // setTimeout(lockactivate)
  setTimeout(lockactivate)
}

const deactivate = () => {
  lockdeactivate()
  isLocked.value = false
}
</script>
