<script setup>
defineProps({
  property: {
    type: Object,
    required: true,
  },
  whatsappLabel: {
    type: String,
    required: true,
  },
  hiddenByFilter: {
    type: Boolean,
    default: false,
  },
});

const whatsappHref = (title) =>
  `https://wa.me/96176033933?text=${encodeURIComponent(`Hello EID Properties, I am interested in ${title}`)}`;
</script>

<template>
  <article
    class="property-card group overflow-hidden bg-dark-2"
    :class="[
      property.featured
        ? 'featured-property-card border border-gold shadow-2xl shadow-black/30'
        : 'border border-white/10',
      hiddenByFilter ? 'is-filter-hidden hidden' : '',
    ]"
    :data-region="property.region"
    :data-location="property.location"
  >
    <div class="relative overflow-hidden">
      <img :src="property.image" :alt="property.alt" class="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
      <div v-if="property.featured" class="absolute left-5 top-5 flex flex-wrap gap-3">
        <span class="border border-gold bg-dark/85 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gold backdrop-blur-md">
          {{ property.tags[0] }}
        </span>
        <span class="bg-gold px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-dark">
          {{ property.tags[1] }}
        </span>
      </div>
    </div>
    <div class="p-6">
      <p class="text-xs uppercase tracking-widest text-gold">{{ property.eyebrow }}</p>
      <h3 class="mt-3 text-2xl font-bold">{{ property.title }}</h3>
      <div class="mt-5 grid grid-cols-2 gap-3 text-xs uppercase tracking-widest text-white/55">
        <p><span class="block text-gold">Region</span> {{ property.region }}</p>
        <p><span class="block text-gold">Location</span> {{ property.displayLocation }}</p>
        <p><span class="block text-gold">{{ property.categoryLabel }}</span> {{ property.category }}</p>
        <p><span class="block text-gold">Status</span> {{ property.status }}</p>
      </div>
      <p class="mt-5 text-gold font-semibold">
        <span class="text-xs uppercase tracking-widest text-white/55">Price</span><br />{{ property.price }}
      </p>
      <a class="whatsapp-btn mt-5 inline-flex" :href="whatsappHref(property.title)" target="_blank" rel="noopener">
        {{ whatsappLabel }}
      </a>
    </div>
    <div class="card-overlay"></div>
  </article>
</template>
