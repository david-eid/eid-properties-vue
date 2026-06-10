<script setup>
defineProps({
  t: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <section id="about" class="bg-dark-2 px-5 py-24 lg:px-8">
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
          alt="Luxury commercial architecture facade"
          class="h-[520px] w-full object-cover"
        />
      </div>
      <div class="about-text-frame">
        <div class="about-line line-visible"></div>
        <p class="section-label">{{ t("about.label") }}</p>
        <h2 class="section-heading">{{ t("about.title") }}</h2>
        <p class="leading-8 text-white/70">{{ t("about.textOne") }}</p>
        <p class="mt-5 leading-8 text-white/70">{{ t("about.textTwo") }}</p>
      </div>
    </div>
  </section>
</template>
