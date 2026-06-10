<script setup>
import LanguageSwitcher from "./LanguageSwitcher.vue";

defineProps({
  isScrolled: {
    type: Boolean,
    required: true,
  },
  isMobileOpen: {
    type: Boolean,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  t: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["toggle-mobile", "close-mobile", "toggle-language", "toggle-theme"]);
</script>

<template>
  <header
    id="site-header"
    class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-dark/80 backdrop-blur-xl"
    :class="{ 'nav-scrolled': isScrolled }"
  >
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Main navigation">
      <a href="#home" class="font-playfair text-2xl font-bold tracking-wide text-white">
        EID <span class="text-gold">Properties</span>
        <span class="text-white/50">& Construction</span>
      </a>

      <div class="flex items-center gap-3">
        <div class="hidden items-center gap-8 text-xs font-semibold uppercase tracking-widest text-white/70 lg:flex">
          <a class="transition hover:text-gold" href="#properties">{{ t("nav.properties") }}</a>
          <a class="transition hover:text-gold" href="#about">{{ t("nav.about") }}</a>
          <a class="transition hover:text-gold" href="#services">{{ t("nav.services") }}</a>
          <a class="transition hover:text-gold" href="#contact">{{ t("nav.contact") }}</a>
        </div>
        <LanguageSwitcher
          :language="language"
          :theme="theme"
          @toggle-language="emit('toggle-language')"
          @toggle-theme="emit('toggle-theme')"
        />
        <button
          id="menu-toggle"
          class="flex h-11 w-11 items-center justify-center border border-white/15 text-gold transition hover:border-gold lg:hidden"
          type="button"
          aria-label="Open navigation menu"
          :aria-expanded="String(isMobileOpen)"
          aria-controls="mobile-menu"
          @click="emit('toggle-mobile')"
        >
          <span class="relative h-4 w-5">
            <span class="menu-line absolute left-0 top-0 h-0.5 w-5 bg-current transition"></span>
            <span class="menu-line absolute left-0 top-1.5 h-0.5 w-5 bg-current transition"></span>
            <span class="menu-line absolute left-0 top-3 h-0.5 w-5 bg-current transition"></span>
          </span>
        </button>
      </div>
    </nav>

    <div
      id="mobile-menu"
      class="border-t border-white/10 bg-dark-2 px-5 py-5 lg:hidden"
      :class="{ hidden: !isMobileOpen }"
    >
      <div class="flex flex-col gap-4 text-sm font-semibold uppercase tracking-widest text-white/75">
        <a class="mobile-link transition hover:text-gold" href="#properties" @click="emit('close-mobile')">{{ t("nav.properties") }}</a>
        <a class="mobile-link transition hover:text-gold" href="#about" @click="emit('close-mobile')">{{ t("nav.about") }}</a>
        <a class="mobile-link transition hover:text-gold" href="#services" @click="emit('close-mobile')">{{ t("nav.services") }}</a>
        <a class="mobile-link transition hover:text-gold" href="#contact" @click="emit('close-mobile')">{{ t("nav.contact") }}</a>
      </div>
    </div>
  </header>
</template>
