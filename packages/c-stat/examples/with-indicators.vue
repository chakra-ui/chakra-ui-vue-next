<script setup lang="ts">
import {
  CStat,
  CStatArrow,
  CStatLabel,
  CStatGroup,
  CStatNumber,
  CStatHelpText,
} from "../src"
</script>

<template>
  <c-stat-group>
    <c-stat>
      <c-stat-label>Sent</c-stat-label>
      <c-stat-number>345,670</c-stat-number>
      <c-stat-help-text>
        <c-stat-arrow type="increase" />
        23.36%
      </c-stat-help-text>
    </c-stat>

    <c-stat>
      <c-stat-label>Clicked</c-stat-label>
      <c-stat-number>45</c-stat-number>
      <c-stat-help-text>
        <c-stat-arrow type="decrease" />
        9.05%
      </c-stat-help-text>
    </c-stat>
  </c-stat-group>
</template>
