<template>
  <chakra.div
    py="10"
    px="8"
    overflowY="auto"
    position="fixed"
    top="3.8rem"
    bottom="0"
    right="max(0px,calc(50% - 45rem))"
    :display="{ base: 'none', xl: 'block' }"
    width="19.5rem"
  >
    <chakra.p font-weight="bold">
      {{ content.page?.title || "On this page" }}
    </chakra.p>
    <c-stack
      as="ul"
      spacing="0"
      list-style-type="none"
      mt="0"
      role="navigation"
      font-size="0.8em"
      align-items="flex-start"
    >
      <template>
        <chakra.li
          v-for="item in links"
          :key="item.id"
          :_selected="{
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }"
          list-style-type="none"
          :sx="{
            color: 'currentColor',
            position: 'relative',
            '&:after': {
              content: `''`,
              position: 'absolute',
              width: '100%',
              transform: 'scaleX(0)',
              height: '1px',
              top: '85%',
              left: 0,
              backgroundColor: 'currentColor',
              transformOrigin: 'bottom right',
              transition: 'transform .4s cubic-bezier(.86, 0, .07, 1)',
            },
            '&:hover::after': {
              transform: 'scaleX(1)',
              transformOrigin: 'bottom left',
            },
          }"
          :_hover="{
            textDecoration: 'none',
          }"
        >
          <nuxt-link :to="`#${item.id}`" custom v-slot="{ href, navigate }">
            <chakra.a
              :href="href"
              @click="navigate"
              :_hover="{
                textDecoration: 'none',
              }"
              >{{ item.text }}</chakra.a
            >
          </nuxt-link>
        </chakra.li>
        <template v-if="item.children">
          <chakra.li
            v-for="nestedItem in item.children"
            :key="nestedItem._path + nestedItem.id"
            role="link"
            :_selected="{
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }"
            list-style-type="none"
            :sx="{
              color: 'currentColor',
              position: 'relative',
              '&:after': {
                content: `''`,
                position: 'absolute',
                width: '100%',
                transform: 'scaleX(0)',
                height: '1px',
                top: '85%',
                left: 0,
                backgroundColor: 'currentColor',
                transformOrigin: 'bottom right',
                transition: 'transform .4s cubic-bezier(.86, 0, .07, 1)',
              },
              '&:hover::after': {
                transform: 'scaleX(1)',
                transformOrigin: 'bottom left',
              },
            }"
            pl="4"
          >
            <nuxt-link :to="`#${item.id}`" custom v-slot="{ href, navigate }">
              <chakra.a
                :href="href"
                @click="navigate"
                :_hover="{
                  textDecoration: 'none',
                }"
              >
                <chakra.span>—</chakra.span> {{ nestedItem.text }}
              </chakra.a>
            </nuxt-link>
          </chakra.li>
        </template>
      </template>
    </c-stack>
  </chakra.div>
</template>

<script lang="ts" setup>
import { useContent } from "#imports"
import { computed, watchEffect } from "vue"
import { CStack } from "@chakra-ui/vue-next"

const content = useContent()

const links = computed(() => content.toc.value.links)
const isCurrent = false
</script>
