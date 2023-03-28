<template>
  <chakra.div data-testid="simple-tabs-example">
    <c-tabs v-model="value">
      <c-tab-list>
        <c-tab value="one"> Item One </c-tab>
        <c-tab value="two"> Item Two </c-tab>
        <c-tab value="three"> Item Three </c-tab>
        <c-tab-indicator />
      </c-tab-list>

      <c-tab-panels>
        <c-tab-panel value="one"> Value Item 1 </c-tab-panel>
        <c-tab-panel value="two"> Value Item 2 </c-tab-panel>
        <c-tab-panel value="three"> Value Item 3 </c-tab-panel>
      </c-tab-panels>
    </c-tabs>
  </chakra.div>
</template>

<script lang="ts" setup>
import { chakra } from "@chakra-ui/vue-next"
const value = ref("two")
</script>
