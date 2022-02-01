<template>
  <!-- 
    I noticed that when using the focus lock in a template with a component at the root,
    the application breaks, which i
   -->
  <chakra.div>
    <c-portal to="#new-target">
      <c-motion type="fade">
        <chakra.div
          ref="_target"
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
          <c-button color-scheme="yellow" mx="2">Initial focus!</c-button>
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
      Focus lock enabled: {{ isLocked }}
    </chakra.pre>
  </chakra.div>
</template>

<script setup lang="ts">
import { chakra } from "@chakra-ui/vue-next"
import { ref, watch, watchEffect } from "vue"
import { useFocusTrap } from "../src/use-focus-trap"
import { unrefElement } from "@chakra-ui/vue-utils"

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

const _target = ref()
const containers = ref<Set<HTMLElement>>(new Set())

watchEffect(
  (onInvalidate) => {
    let el: HTMLElement
    if (_target.value) {
      el = unrefElement(_target)
      containers.value.add(el)
    }

    console.log("Adding containers", containers.value)

    onInvalidate(() => {
      containers.value.delete(el)
    })
  },
  { flush: "post" }
)
useFocusTrap(containers, ref(true))

const activate = async () => {
  isLocked.value = true
}

const deactivate = () => {
  isLocked.value = false
}
</script>
