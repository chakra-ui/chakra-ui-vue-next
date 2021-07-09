<template>
  <c-reset />
  <h1>A small state test for rehydration: {{ count }}</h1>
  <button @click="count++">Add to count</button>
  <c-h-stack as="nav">
    <router-link to="/">Go to Home</router-link>
    <router-link to="/component">Go to Component</router-link>
    <router-link to="/theme">Go to Theme</router-link>
  </c-h-stack>
  <h1>Below is the currently rendered route:</h1>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      count: 0,
    }
  },
}
</script>
