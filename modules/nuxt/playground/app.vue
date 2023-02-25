<template>
  <chakra.div
    :bg="
      useColorModeValue(
        `${selectedColor.color}.50`,
        `${selectedColor.color}.900`
      ).value
    "
    min-h="100vh"
    transition="background-color 0.2s ease-in-out"
    layer-style="home.container"
  >
    <c-stack spacing="8" align-items="flex-start">
      <c-stack
        :color="
          useColorModeValue(
            `${selectedColor.color}.900`,
            `${selectedColor.color}.50`
          ).value
        "
      >
        <c-heading text-style="home.subheading"> Welcome to </c-heading>
        <c-heading as="h1" text-style="home.heading">
          Chakra UI Nuxt
        </c-heading>
        <chakra.h4
          font-weight="bold"
          font-size="3xl"
          display="flex"
          align-items="center"
        >
          <chakra.span
            >Build Beautiful Accessible Components - Powered by</chakra.span
          >
          &nbsp;
          <chakra.a
            text-decoration="underline"
            text-decoration-style="dashed"
            cursor="pointer"
            href="https://nuxt.com"
            target="_blank"
            display="inline-flex"
            justify-content="flex-start"
            align-items="center"
          >
            <NuxtLogo h="1em" d="inline-flex" />
            <ExternalLinkIcon />
          </chakra.a>
        </chakra.h4>
      </c-stack>
      <c-h-stack
        :bg="useColorModeValue('blackAlpha.50', 'whiteAlpha.50').value"
        padding="3"
        rounded="full"
      >
        <c-circle
          box-size="8"
          v-for="(color, i) in colors"
          :key="color"
          :bg="`${color}.400`"
          cursor="pointer"
          :_hover="{
            bg: `${color}.500`,
            transform: 'scale(1.1)',
            transition: 'all 0.2s',
          }"
          @mouseenter="selectedColor.color = color"
        />
      </c-h-stack>
      <c-badge
        rounded="full"
        :color-scheme="selectedColor.color"
        text-transform="unset"
        px="2"
        py="1"
        font-size="md"
      >
        Chakra UI Vue is currently still in early beta. Explore the
        documentation and join our Discord!
      </c-badge>
      <c-button-group size="lg" spacing="5" :color-scheme="selectedColor.color">
        <c-button :right-icon="ExternalLinkIcon"> Get Started </c-button>
        <c-button :right-icon="DocumentationIcon" variant="outline">
          Documentation
        </c-button>
      </c-button-group>
      <c-button-group :color-scheme="selectedColor.color" variant="outline">
        <c-icon-button
          aria-label="Toggle color mode"
          :icon="useColorModeValue('moon', 'sun').value"
          @click="changeColorMode"
          rounded="none"
        />
        <c-icon-button
          as="a"
          href="https://nuxt.com"
          target="_blank"
          aria-label="Join Discord"
          rounded="none"
        >
          <DiscordIcon />
        </c-icon-button>
      </c-button-group>
    </c-stack>
  </chakra.div>
</template>

<script setup lang="ts">
import {
  chakra,
  useColorMode,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/vue-next"
import { useStorage } from "@vueuse/core"
import DocumentationIcon from "./components/icons/documentation-icon"
import ExternalLinkIcon from "./components/icons/external-link"
import DiscordIcon from "./components/icons/discord-icon"
import NuxtLogo from "./components/icons/nuxt-logo"

const { toggleColorMode } = useColorMode()

const themeConfig = {
  color: "whatsapp",
}
const selectedColor = useStorage("theme.color", themeConfig)

const theme = useTheme()

const colors = computed(
  () =>
    new Set(
      Object.keys(theme.colors)
        .filter((color) => typeof theme.colors[color] === "object")
        .filter((color) => !["blackAlpha", "whiteAlpha"].includes(color))
    )
)

function changeColorMode() {
  toggleColorMode()
}
</script>
