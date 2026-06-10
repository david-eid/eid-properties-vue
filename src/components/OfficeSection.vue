<script setup>
defineProps({
  t: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <section id="office" class="bg-dark px-5 py-24 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 max-w-3xl">
        <p class="section-label">{{ t("office.label") }}</p>
        <h2 class="section-heading">{{ t("office.title") }}</h2>
      </div>

      <div class="overflow-hidden border border-gold/25 bg-dark-2/90 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div class="office-glow"></div>
        <div class="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div class="space-y-7 p-7 md:p-10">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-widest text-gold">{{ t("office.locationLabel") }}</p>
                <h3 class="mt-3 font-playfair text-3xl font-bold">EID Properties & Construction</h3>
                <p class="mt-3 leading-7 text-white/70" v-html="t('office.address')"></p>
              </div>
              <span class="border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
                {{ t("office.openNow") }}
              </span>
            </div>

            <p class="leading-8 text-white/70">{{ t("office.text") }}</p>

            <div class="border border-white/10 bg-dark p-6">
              <p class="text-xs font-semibold uppercase tracking-widest text-gold">{{ t("office.hoursLabel") }}</p>
              <div class="mt-5 space-y-3 text-sm text-white/70">
                <p><span class="font-semibold text-gold">{{ t("office.weekdays") }}</span> 8:00 AM - 7:00 PM</p>
                <p><span class="font-semibold text-gold">{{ t("office.sunday") }}</span> <span>{{ t("office.closed") }}</span></p>
              </div>
            </div>

            <a
              class="btn-gold inline-flex"
              href="https://www.google.com/maps/search/?api=1&query=Kaslik%2C%20Altavista%20Center%2C%20Lebanon"
              target="_blank"
              rel="noopener"
            >
              {{ t("office.mapsCta") }}
            </a>
          </div>

          <div class="min-h-[360px] border-t border-white/10 lg:border-l lg:border-t-0">
            <iframe
              title="Google Maps location for Kaslik Altavista Center Lebanon"
              src="https://www.google.com/maps?q=Kaslik%2C%20Altavista%20Center%2C%20Lebanon&output=embed"
              class="h-[360px] w-full md:h-[460px] lg:h-full"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
