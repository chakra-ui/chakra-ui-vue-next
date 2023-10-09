<template>
  <CStack spacing="{3}">
    <CText fontSize="6xl">(6xl) In love with React & Next</CText>
    <CText fontSize="5xl">(5xl) In love with React & Next</CText>
    <CText fontSize="4xl">(4xl) In love with React & Next</CText>
    <CText fontSize="3xl">(3xl) In love with React & Next</CText>
    <CText fontSize="2xl">(2xl) In love with React & Next</CText>
    <CText fontSize="xl">(xl) In love with React & Next</CText>
    <CText fontSize="lg">(lg) In love with React & Next</CText>
    <CText fontSize="md">(md) In love with React & Next</CText>
    <CText fontSize="sm">(sm) In love with React & Next</CText>
    <CText fontSize="xs">(xs) In love with React & Next</CText>
  </CStack>
  <CDivider my="4" />
  <CText>truncated:</CText>
  <CText maxW="sm" isTruncated>
    Lorem ipsum is placeholder text commonly used in the graphic, print, and
    publishing industries for previewing layouts and visual mockups.
  </CText>
  <CDivider my="4" />
  <CText>line clamp:</CText>
  <CText :noOfLines="[1, 2, 3]" maxW="sm">
    "The quick brown fox jumps over the lazy dog" is an English-language
    pangram—a sentence that contains all of the letters of the English alphabet.
    Owing to its existence, Chakra was created.
  </CText>
  <CDivider my="4" />
  <CText>As prop:</CText>
  <CText as="h1" fontSize="xl"> As prop H1 </CText>
</template>
