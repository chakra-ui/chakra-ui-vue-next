<script setup lang="ts">
import { CStack, CHeading, CText } from "@chakra-ui/vue-layout"
import { CCard, CCardHeader, CCardBody } from "../src"
</script>
<template>
  <c-stack>
    <c-card>
      <c-card-header>
        <c-heading size="md">Customer dashboard</c-heading>
      </c-card-header>
      <c-card-body>
        <c-text>
          View a summary of all your customers over the last month.
        </c-text>
      </c-card-body>
    </c-card>
  </c-stack>
</template>
