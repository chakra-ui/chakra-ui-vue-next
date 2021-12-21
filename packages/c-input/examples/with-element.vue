<template>
  <chakra.div>
    <c-v-stack>
      <c-input-group
        v-for="size in ['sm', 'md', 'lg']"
        :size="size"
        :key="size"
      >
        <c-input-left-element color="gray.300"> $ </c-input-left-element>
        <c-input placeholder="Enter amount" />
        <c-input-right-element>
          <c-icon name="check" color="green.500" />
        </c-input-right-element>
      </c-input-group>
    </c-v-stack>
  </chakra.div>
</template>

<script lang="ts" setup>
import {
  chakra,
  CInputGroup,
  CInputRightAddon,
  CInputLeftElement,
  CInputRightElement,
} from "@chakra-ui/vue-next"
</script>
