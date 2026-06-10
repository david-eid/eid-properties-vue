<script setup>
defineProps({
  language: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["toggle-language", "toggle-theme"]);
</script>

<template>
  <button id="theme-toggle" class="nav-toggle-btn" type="button" @click="emit('toggle-theme')">
    Dark / Light
  </button>
  <button id="language-toggle" class="nav-toggle-btn" type="button" @click="emit('toggle-language')">
    AR / EN
  </button>
</template>
