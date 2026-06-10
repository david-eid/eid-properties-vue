<script setup>
defineProps({
  t: {
    type: Function,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <footer class="border-t border-white/10 bg-dark px-5 py-10 lg:px-8">
    <div class="footer-line line-visible"></div>
    <div class="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="font-playfair text-2xl font-bold">
          EID <span class="text-gold">Properties</span>
        </p>
        <p class="mt-2 text-sm text-white/50">{{ t("footer.tagline") }}</p>
      </div>
      <p class="text-sm text-white/45">&copy; <span id="year">{{ year }}</span> <span>{{ t("footer.rights") }}</span></p>
    </div>
  </footer>
</template>
