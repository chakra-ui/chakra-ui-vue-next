<template>
  <chakra.div py="4">
    <chakra.div py="4">
      <c-link-box as="article">
        <c-heading as="h2" font-size="20">
          <!-- prettier-ignore -->
          <c-link-overlay is-external href="https://vue.chakra-ui.com">Some blog post</c-link-overlay>
        </c-heading>
        <p>
          As a side note, using quotation marks around an attribute value is
          required only if this value is not a valid identifier.
        </p>
        <c-link is-external href="https://google.com">Some inner link</c-link>
      </c-link-box>
    </chakra.div>
  </chakra.div>
</template>
<script setup></script>
