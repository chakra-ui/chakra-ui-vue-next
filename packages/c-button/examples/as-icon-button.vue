<template>
  <chakra.p mt="3" font-weight="bold">IconButton</chakra.p>
  <c-icon-button
    icon="star"
    aria-label="Favourite album"
    mr="3"
    size="xs"
    color-scheme="teal"
  />
  <c-icon-button
    icon="star"
    aria-label="Favourite album"
    mr="3"
    size="sm"
    color-scheme="teal"
  />
  <c-icon-button
    icon="star"
    aria-label="Favourite album"
    mr="3"
    size="md"
    color-scheme="teal"
  />
  <c-icon-button
    aria-label="Documentation Icon"
    mr="3"
    size="lg"
    color-scheme="teal"
  >
    <DocumentationIcon />
  </c-icon-button>
</template>

<script lang="ts" setup>
import { chakra } from "../../vue/src"
import { CIconButton } from "../src/icon-button"

import { createIcon } from "../../c-icon/src/"
const DocumentationIcon = createIcon({
  name: "Documentation",
  viewBox: "0 2.4 24 24",
  path: `<path fill="currentColor" d="M6 24.4q-.825 0-1.413-.587T4 22.4v-16q0-.825.588-1.412T6 4.4h12q.825 0 1.413.588T20 6.4v16q0 .825-.588 1.413T18 24.4H6Zm0-2h12v-16h-2v6.125q0 .3-.25.438t-.5-.013L13.5 11.9l-1.75 1.05q-.25.15-.5.013t-.25-.438V6.4H6v16Zm5-16h5h-5Zm-5 0h12H6Z"/>`,
})
</script>
