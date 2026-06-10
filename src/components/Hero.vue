<script setup>
defineProps({
  t: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <section id="home" class="relative flex min-h-screen items-center overflow-hidden pt-24">
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2200&q=100"
        alt="Luxury modern villa interior with warm architectural lighting"
        class="h-full w-full object-cover opacity-45"
      />
      <div class="hero-overlay absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/25"></div>
    </div>

    <div class="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div class="max-w-3xl">
        <p class="section-label">{{ t("hero.label") }}</p>
        <h1 id="hero-title" class="font-playfair text-5xl font-bold leading-tight text-white md:text-7xl">
          <span
            v-for="(word, index) in t('hero.title').split(/\s+/)"
            :key="`${word}-${index}`"
            class="hero-word"
            :style="{ transitionDelay: `${index * 130}ms` }"
          >
            {{ word }}{{ index < t("hero.title").split(/\s+/).length - 1 ? " " : "" }}
          </span>
        </h1>
        <p class="hero-cinematic-subtext mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
          {{ t("hero.text") }}
        </p>
        <div class="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#properties" class="hero-cinematic-cta btn-gold text-center">{{ t("hero.propertiesCta") }}</a>
          <a href="#contact" class="hero-cinematic-cta btn-outline text-center">{{ t("hero.contactCta") }}</a>
        </div>
      </div>

      <div class="hidden items-end justify-end lg:flex">
        <div class="border border-gold/40 bg-dark/70 p-8 backdrop-blur-md">
          <p class="text-xs font-semibold uppercase tracking-widest text-gold">{{ t("hero.established") }}</p>
          <p class="mt-3 font-playfair text-6xl font-bold">1996</p>
          <p class="mt-4 max-w-xs text-sm leading-7 text-white/65">{{ t("hero.establishedText") }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
