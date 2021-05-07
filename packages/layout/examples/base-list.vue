<template>
  <chakra.div py="4">
    <chakra.h3>Unordered</chakra.h3>
    <chakra.div py="4">
      <c-unordered-list>
        <c-list-item>Lorem ipsum dolor sit amet</c-list-item>
        <c-list-item>Consectetur adipiscing elit</c-list-item>
        <c-list-item>Integer molestie lorem at massa</c-list-item>
        <c-list-item>Facilisis in pretium nisl aliquet</c-list-item>
      </c-unordered-list>
    </chakra.div>
  </chakra.div>
  <chakra.div py="4">
    <chakra.h3>Ordered</chakra.h3>
    <chakra.div py="4">
      <c-ordered-list>
        <c-list-item>Lorem ipsum dolor sit amet</c-list-item>
        <c-list-item>Consectetur adipiscing elit</c-list-item>
        <c-list-item>Integer molestie lorem at massa</c-list-item>
        <c-list-item>Facilisis in pretium nisl aliquet</c-list-item>
      </c-ordered-list>
    </chakra.div>
  </chakra.div>
  <chakra.div py="4">
    <chakra.h3>Icon</chakra.h3>
    <chakra.div py="4">
      <c-list>
        <c-list-item>
          <c-list-icon name="check-circle" color="green.500" />

          Lorem ipsum dolor sit amet.
        </c-list-item>
        <c-list-item>
          <c-list-icon name="check-circle" color="green.500" />
          Consectetur adipiscing elit</c-list-item
        >
        <c-list-item>
          <c-list-icon name="check-circle" color="green.500" />
          Integer molestie lorem at massa</c-list-item
        >
        <c-list-item>
          <c-list-icon name="exclamation" color="green.500" />
          Facilisis in pretium nisl aliquet</c-list-item
        >
      </c-list>
    </chakra.div>
  </chakra.div>
</template>
<script setup></script>
