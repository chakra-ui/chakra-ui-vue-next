<script setup lang="ts">
import { ref } from "vue"
import { chakra, CStack } from "../../vue/src"
import {
  CTabs,
  CTabList,
  CTab,
  CTabPanel,
  CTabPanels,
  CTabIndicator,
} from "../src"

const value = ref("two")
</script>

<template>
  <chakra.div data-testid="simple-tabs-example">
    <c-stack>
      <c-heading size="md">Tabs - Basic</c-heading>
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
    </c-stack>
  </chakra.div>
</template>
