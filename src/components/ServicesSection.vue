<script setup>
defineProps({
  t: {
    type: Function,
    required: true,
  },
});

const services = [
  ["01", "services.salesTitle", "services.salesText"],
  ["02", "services.constructionTitle", "services.constructionText"],
  ["03", "services.investmentTitle", "services.investmentText"],
  ["04", "services.developmentTitle", "services.developmentText"],
];
</script>

<template>
  <section id="services" class="bg-dark px-5 py-24 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 max-w-3xl">
        <p class="section-label">{{ t("services.label") }}</p>
        <h2 class="section-heading">{{ t("services.title") }}</h2>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="[number, titleKey, textKey] in services" :key="number" class="border border-white/10 bg-dark-2 p-7">
          <p class="mb-5 text-3xl text-gold">{{ number }}</p>
          <h3 class="text-xl font-bold">{{ t(titleKey) }}</h3>
          <p class="mt-4 text-sm leading-7 text-white/60">{{ t(textKey) }}</p>
          <span class="ghost-number">{{ number }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
