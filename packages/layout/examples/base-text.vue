<template>
  <c-stack spacing="{3}">
    <c-text fontSize="6xl">(6xl) In love with React & Next</c-text>
    <c-text fontSize="5xl">(5xl) In love with React & Next</c-text>
    <c-text fontSize="4xl">(4xl) In love with React & Next</c-text>
    <c-text fontSize="3xl">(3xl) In love with React & Next</c-text>
    <c-text fontSize="2xl">(2xl) In love with React & Next</c-text>
    <c-text fontSize="xl">(xl) In love with React & Next</c-text>
    <c-text fontSize="lg">(lg) In love with React & Next</c-text>
    <c-text fontSize="md">(md) In love with React & Next</c-text>
    <c-text fontSize="sm">(sm) In love with React & Next</c-text>
    <c-text fontSize="xs">(xs) In love with React & Next</c-text>
  </c-stack>
  <c-divider my="4" />
  <c-text>truncated:</c-text>
  <c-text maxW="sm" isTruncated>
    Lorem ipsum is placeholder text commonly used in the graphic, print, and
    publishing industries for previewing layouts and visual mockups.
  </c-text>
  <c-divider my="4" />
  <c-text>line clamp:</c-text>
  <c-text :noOfLines="[1, 2, 3]" maxW="sm">
    "The quick brown fox jumps over the lazy dog" is an English-language
    pangram—a sentence that contains all of the letters of the English alphabet.
    Owing to its existence, Chakra was created.
  </c-text>
</template>
