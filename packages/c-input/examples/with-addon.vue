<template>
  <chakra.div>
    <c-v-stack>
      <c-input-group
        v-for="size in ['sm', 'md', 'lg']"
        :size="size"
        :key="size"
      >
        <c-input-left-addon> https:// </c-input-left-addon>
        <c-input placeholder="website.com" />
        <c-input-right-addon> .com </c-input-right-addon>
      </c-input-group>
    </c-v-stack>
  </chakra.div>
</template>

<script lang="ts" setup>
import {
  chakra,
  CInputGroup,
  CInputRightAddon,
  CInputLeftAddon,
} from "@chakra-ui/vue-next"
</script>
