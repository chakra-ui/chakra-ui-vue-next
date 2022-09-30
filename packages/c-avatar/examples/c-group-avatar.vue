<template>
  <c-stack>
    <chakra.p font-weight="bold">Default</chakra.p>
    <c-avatar-group>
      <c-avatar name="Sarah Drasner" />
      <c-avatar></c-avatar>
      <c-avatar name="Maya Shavin"></c-avatar>
      <c-avatar name="Evan You"></c-avatar>
    </c-avatar-group>
    <chakra.p font-weight="bold">Custom max</chakra.p>
    <c-avatar-group max="3" size="lg">
      <c-avatar
        name="Sarah Drasner"
        src="https://avatars.githubusercontent.com/u/2281088?v=4"
        alt="Sarah Drasner"
      />
      <c-avatar
        name="Evan You"
        alt="Evan You"
        src="https://www.github.com/yyx990803.png"
      ></c-avatar>
      <c-avatar
        name="Anthony Fu"
        src="https://avatars.githubusercontent.com/u/11247099?v=4"
        alt="Anthony Fu"
      ></c-avatar>
      <c-avatar
        name="Maya Shavin"
        src="https://avatars.githubusercontent.com/u/6650139?v=4"
        alt="Maya Shavin"
      ></c-avatar>
    </c-avatar-group>
    <chakra.p font-weight="bold">Smaller</chakra.p>
    <c-avatar-group size="sm">
      <c-avatar name="Sarah Drasner" />
      <c-avatar name="Anthony Fu"></c-avatar>
      <c-avatar name="Maya Shavin"></c-avatar>
      <c-avatar name="Evan You"></c-avatar>
    </c-avatar-group>
  </c-stack>
</template>
<script setup>
import { CAvatar, CAvatarGroup } from "../src"
</script>
