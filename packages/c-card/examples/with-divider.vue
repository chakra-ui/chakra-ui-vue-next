<script setup lang="ts">
import {
  CStack,
  CHeading,
  CText,
  CDivider,
  CBox,
  CStackDivider,
} from "@chakra-ui/vue-layout"
import { CCard, CCardHeader, CCardBody } from "../src"
</script>
<template>
  <c-stack>
    <c-card>
      <c-card-header>
        <c-heading size="md">Client Report</c-heading>
      </c-card-header>
      <c-card-body>
        <c-stack :divider="CStackDivider" :spacing="2">
          <c-box>
            <c-heading size="xs" text-transform="uppercase">
              Summary
            </c-heading>
            <c-text :pt="2" font-size="sm">
              View a summary of all your clients over the last month
            </c-text>
          </c-box>
          <c-box>
            <c-heading size="xs" text-transform="uppercase">
              Overview
            </c-heading>
            <c-text :pt="2" font-size="sm">
              Check out the overview of your clients
            </c-text>
          </c-box>
          <c-box>
            <c-heading size="xs" text-transform="uppercase">
              Analysis
            </c-heading>
            <c-text :pt="2" font-size="sm">
              See a detailed analysis of all your business clients.
            </c-text>
          </c-box>
        </c-stack>
      </c-card-body>
    </c-card>
  </c-stack>
</template>
