<template>
  <c-stack>
    <chakra.div>
      <c-tag mr="3" size="sm" color-scheme="purple">
        <c-tag-label>Sample Tag</c-tag-label>
        <c-tag-right-icon name="add" />
      </c-tag>
      <c-tag mr="3" size="md" color-scheme="purple">
        <c-tag-label>Sample Tag</c-tag-label>
        <c-tag-right-icon name="add" />
      </c-tag>
      <c-tag mr="3" size="lg" color-scheme="purple">
        <c-tag-label>Sample Tag</c-tag-label>
        <c-tag-right-icon name="add" />
      </c-tag>
    </chakra.div>

    <chakra.div>
      <c-tag mr="3" size="sm" color-scheme="red">
        <c-tag-left-icon name="check" />
        <c-tag-label>Sample Tag</c-tag-label>
      </c-tag>
      <c-tag mr="3" size="md" color-scheme="red">
        <c-tag-left-icon name="check" />
        <c-tag-label>Sample Tag</c-tag-label>
      </c-tag>
      <c-tag mr="3" size="lg" color-scheme="red">
        <c-tag-left-icon name="check" />
        <c-tag-label>Sample Tag</c-tag-label>
      </c-tag>
    </chakra.div>
  </c-stack>
</template>
<script setup>
import { CTag, CTagLabel, CTagLeftIcon, CTagRightIcon } from "../src"
</script>
