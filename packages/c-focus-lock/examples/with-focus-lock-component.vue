<template>
  <chakra.div>
    <chakra.pre font-weight="bold">
      Focus trap enabled: {{ isActive }}
    </chakra.pre>
    <c-portal to="#new-target">
      <c-motion type="fade">
        <c-focus-lock
          p="4"
          border="4px dashed"
          rounded="lg"
          border-color="gray.400"
          d="inline-block"
          #default="{ enabled, deactivate }"
          pos="relative"
          v-if="isActive"
        >
          <chakra.div>
            <c-close-button
              position="absolute"
              top="10px"
              right="10px"
              @click="deactivate"
            ></c-close-button>
            <chakra.pre> Focus trap enabled: {{ enabled }} </chakra.pre>
            <chakra.p mb="2">Inside focus trap</chakra.p>
            <c-button color-scheme="teal"> Login </c-button>
            <c-button :ref="initialFocus" color-scheme="yellow" mx="2"
              >Initial focus!</c-button
            >
            <c-button left-icon="user" color-scheme="red"
              >Delete account</c-button
            >
            <chakra.pre> Focus trap enabled: {{ enabled }} </chakra.pre>
            <chakra.p mb="2">Inside focus trap</chakra.p>
            <c-button color-scheme="teal"> Login </c-button>
            <c-button color-scheme="yellow" mx="2">Initial focus!</c-button>
            <c-button left-icon="user" color-scheme="red"
              >Delete account</c-button
            >
            <chakra.pre> Focus trap enabled: {{ enabled }} </chakra.pre>
            <chakra.p mb="2">Inside focus trap</chakra.p>
            <c-button color-scheme="teal"> Login </c-button>
            <c-button color-scheme="yellow" mx="2">Initial focus!</c-button>
            <c-button left-icon="user" color-scheme="red"
              >Delete account</c-button
            >
            <chakra.pre> Focus trap enabled: {{ enabled }} </chakra.pre>
            <chakra.p mb="2">Inside focus trap</chakra.p>
            <c-button color-scheme="teal"> Login </c-button>
            <c-button color-scheme="yellow" mx="2">Initial focus!</c-button>
            <c-button left-icon="user" color-scheme="red"
              >Delete account</c-button
            >
            <chakra.pre> Focus trap enabled: {{ enabled }} </chakra.pre>
            <chakra.p mb="2">Inside focus trap</chakra.p>
            <c-button color-scheme="teal"> Login </c-button>
            <c-button color-scheme="yellow" mx="2">Initial focus!</c-button>
            <c-button left-icon="user" color-scheme="red"
              >Delete account</c-button
            >
          </chakra.div>
        </c-focus-lock>
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
      <c-button @click="isActive = true" color-scheme="blue">
        Mount focus trap
      </c-button>
      <c-button :ref="finalFocus" @click="isActive = false" ml="3">
        Final focus element
      </c-button>
    </chakra.div>
  </chakra.div>
</template>

<script lang="ts" setup>
import { chakra } from "../../vue"
import { useRef } from "@chakra-ui/vue-utils"
import { ref } from "vue"
import { CFocusLock } from "../src/c-focus-lock"

if (!document.getElementById("new-target")) {
  const target = document.createElement("div")
  target.style.display = "inline-block"
  target.style.position = "absolute"
  target.style.top = "50px"
  target.style.left = "250px"

  target.id = "new-target"
  document.body.appendChild(target)
}
const isActive = ref(false)
const [finalFocus, finalFocusRef] = useRef()
const [initialFocus, initialFocusRef] = useRef()

const handleActivate = () => {
  console.log("focuslock activated")
}

const handleDeactivate = () => {
  console.log("focuslock deactivated")
  isActive.value = false
  setTimeout(() => {})
}
</script>
