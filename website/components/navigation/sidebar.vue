<template>
  <c-stack as="ul" spacing="0" list-style-type="none" font-size="sm">
    <chakra.li
      v-for="item in navigation"
      :key="`path:${item._path}`"
      list-style-type="none"
    >
      <doc-link :nav-item-path="item._path">
        {{ item.title }}
      </doc-link>
      <c-stack
        v-if="item.children?.length"
        as="ul"
        spacing="0"
        list-style-type="none"
      >
        <doc-link
          v-for="nestedItem in item.children.filter(
            (_) => _._path.split('/').length > 2
          )"
          :key="`path:${nestedItem._path}`"
          :nav-item-path="nestedItem._path"
          pl="4"
        >
          {{ nestedItem.title }}
        </doc-link>
      </c-stack>
    </chakra.li>
  </c-stack>
</template>

<script lang="ts" setup>
import DocLink from "~/components/navigation/doc-link.vue"
import { watchEffect } from "vue"
import { CStack } from "@chakra-ui/vue-next"

/**
 * Documentation Fetching
 */
const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
)

watchEffect(() => console.log("navigation", navigation.value))
</script>
