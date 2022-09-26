<template>
  <c-box position="relative">
    <c-skip-nav-link> HELLO CSkipNav </c-skip-nav-link>
    <c-skip-nav-content>
      <main>
        <c-text>
          To test the SkipNav Components:
          <c-list mb="4">
            <c-list-item>
              <c-list-icon name="chevron-right" />
              Place focus on the below input
            </c-list-item>
            <c-list-item>
              <c-list-icon name="chevron-right" />
              Press <c-kbd>Shift + Tab</c-kbd> to make the
              <c-code>SkipNavLink</c-code> appear
            </c-list-item>
            <c-list-item>
              <c-list-icon name="chevron-right" />
              Hit <c-kbd>Enter</c-kbd>.
            </c-list-item>
            <c-list-item>
              <c-list-icon name="chevron-right" />
              You should now see the focus over all the content with a blue
              outline.
            </c-list-item>
          </c-list>
        </c-text>
        <label>Example Form Search</label>
        <CInput placeholder="Search" />
      </main>
    </c-skip-nav-content>
  </c-box>
</template>
<script lang="ts" setup>
import {
  CBox,
  CCode,
  CInput,
  CKbd,
  CList,
  CListItem,
  CSkipNavContent,
  CSkipNavLink,
  CText,
} from "@chakra-ui/vue-next"
</script>
