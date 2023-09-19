<script setup>
  import {RouterView} from 'vue-router'
  import { useDark, useToggle } from "@vueuse/core";
  const isDark = useDark({
    selector: "body", 
    attribute: "theme", 
    valueDark: "custom-dark", 
    valueLight: "custom-light",
  });
  const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="container">
    <button @click="toggleDark()"
      class="bg-transparent border-0">
      <span v-if="isDark">🌞</span>
      <span v-else>🌝</span>
    </button>
    <RouterView />
  </div>
</template>