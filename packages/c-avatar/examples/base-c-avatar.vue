<template>
  <c-stack>
    <chakra.p font-weight="bold">Default</chakra.p>
    <c-h-stack align="center">
      <c-avatar size="sm" />
      <c-avatar size="md"></c-avatar>
      <c-avatar size="lg"></c-avatar>
      <c-avatar size="xl"></c-avatar>
    </c-h-stack>

    <chakra.p font-weight="bold">With custom background colors</chakra.p>
    <c-h-stack align="center">
      <c-avatar size="sm" bg="yellow.500" />
      <c-avatar size="md" bg="blue.500"></c-avatar>
      <c-avatar size="lg" bg="red.500"></c-avatar>
      <c-avatar size="xl" bg="purple.500"></c-avatar>
    </c-h-stack>
    <chakra.p font-weight="bold">With custom icons</chakra.p>
    <c-h-stack align="center">
      <c-avatar size="sm">
        <template v-slot:icon>
          <c-icon name="chevron-right" />
        </template>
        <!-- <c-icon v-slot:separator slot="icon" color="white" name="close" /> -->
      </c-avatar>
      <c-avatar size="md">
        <template v-slot:icon>
          <c-icon color="white" name="star" />
        </template>
      </c-avatar>
      <c-avatar size="lg">
        <template v-slot:icon>
          <c-icon color="white" name="check" />
        </template>
      </c-avatar>
      <c-avatar size="xl" icon="user"> </c-avatar>
    </c-h-stack>

    <chakra.p font-weight="bold">With initials</chakra.p>
    <c-h-stack align="center">
      <c-avatar size="sm" name="Sarah Drasner" />
      <c-avatar size="md" name="Anthony Fu"></c-avatar>
      <c-avatar size="lg" name="Maya Shavin"></c-avatar>
      <c-avatar size="xl" name="Evan You"></c-avatar>
    </c-h-stack>
    <chakra.p font-weight="bold">With pictures</chakra.p>
    <c-h-stack align="center">
      <c-avatar
        name="Sarah Drasner"
        src="https://avatars.githubusercontent.com/u/2281088?v=4"
        alt="Sarah Drasner"
        size="sm"
      ></c-avatar>
      <c-avatar
        src="https://avatars.githubusercontent.com/u/11247099?v=4"
        alt="Anthony Fu"
        size="md"
      ></c-avatar>
      <c-avatar
        name="Maya Shavin"
        src="https://avatars.githubusercontent.com/u/6650139?v=4"
        alt="Maya Shavin"
        size="lg"
      >
      </c-avatar>
      <c-avatar
        src="https://www.github.com/yyx990803.png"
        size="xl"
        name="Evan You"
      >
      </c-avatar>
    </c-h-stack>
  </c-stack>
</template>
<script setup lang="ts">
import { CAvatar } from "../src"
</script>
