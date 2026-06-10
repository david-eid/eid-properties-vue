<script setup>
import { computed, nextTick, ref } from "vue";
import PropertyCard from "./PropertyCard.vue";
import { locationGroups } from "../data/siteData";

const props = defineProps({
  properties: {
    type: Array,
    required: true,
  },
  t: {
    type: Function,
    required: true,
  },
});

const selectedRegion = ref("all");
const locationSearch = ref("");
const selectedLocation = ref("all");
const showAll = ref(false);
const rowsVisible = ref(false);
const panelRef = ref(null);

const regions = Object.keys(locationGroups);

const getLocationCount = (locationName) => {
  const location = Object.values(locationGroups)
    .flat()
    .find((item) => item.name === locationName);

  return location ? location.count : 0;
};

const filteredLocationGroups = computed(() => {
  const groups =
    selectedRegion.value === "all"
      ? Object.entries(locationGroups)
      : [[selectedRegion.value, locationGroups[selectedRegion.value] || []]];
  const searchTerm = locationSearch.value.trim().toLowerCase();

  return groups
    .map(([regionName, locations]) => [
      regionName,
      locations.filter((location) => location.name.toLowerCase().includes(searchTerm)),
    ])
    .filter(([, locations]) => locations.length);
});

const visibleProperties = computed(() =>
  props.properties.filter((property) => {
    const regionMatches = selectedRegion.value === "all" || property.region === selectedRegion.value;
    const locationMatches = selectedLocation.value === "all" || property.location === selectedLocation.value;

    return regionMatches && locationMatches;
  }),
);

const setRegion = () => {
  locationSearch.value = "";
  selectedLocation.value = "all";
};

const isHiddenByFilter = (property) => !visibleProperties.value.includes(property);

const toggleAllProperties = async () => {
  if (!showAll.value) {
    showAll.value = true;
    await nextTick();
    window.setTimeout(() => {
      rowsVisible.value = true;
    }, 20);
    window.setTimeout(() => {
      panelRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    return;
  }

  rowsVisible.value = false;
  window.setTimeout(() => {
    showAll.value = false;
  }, 300);
};

const whatsappHref = (title) =>
  `https://wa.me/96176033933?text=${encodeURIComponent(`Hello EID Properties, I am interested in ${title}`)}`;
</script>

<template>
  <section id="properties" class="bg-dark px-5 py-24 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 max-w-3xl">
        <p class="section-label">{{ t("properties.label") }}</p>
        <h2 class="section-heading">{{ t("properties.title") }}</h2>
        <p class="text-white/65">{{ t("properties.text") }}</p>
      </div>

      <div class="mb-10 border border-gold/25 bg-dark-2/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-7">
        <div class="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <label class="block">
            <span class="mb-3 block text-xs font-semibold uppercase tracking-widest text-gold">Region</span>
            <select id="region-filter" v-model="selectedRegion" class="filter-control" @change="setRegion">
              <option value="all">All Regions</option>
              <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
            </select>
          </label>

          <div class="grid gap-3 md:grid-cols-[0.85fr_1.15fr]">
            <label class="block">
              <span class="mb-3 block text-xs font-semibold uppercase tracking-widest text-gold">Search Location</span>
              <input
                id="location-search"
                v-model="locationSearch"
                class="filter-control"
                type="search"
                placeholder="Search Kaslik, Rabieh, Beirut..."
                autocomplete="off"
              />
            </label>
            <label class="block">
              <span class="mb-3 block text-xs font-semibold uppercase tracking-widest text-gold">Location</span>
              <select id="location-filter" v-model="selectedLocation" class="filter-control">
                <option value="all">All Locations</option>
                <optgroup v-for="[regionName, locations] in filteredLocationGroups" :key="regionName" :label="regionName.toUpperCase()">
                  <option v-for="location in locations" :key="location.name" :value="location.name">
                    {{ location.name }} ({{ location.count }})
                  </option>
                </optgroup>
              </select>
            </label>
          </div>
        </div>
      </div>

      <nav class="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white/55" aria-label="Property breadcrumbs">
        <a href="#home" class="transition hover:text-gold">Home</a>
        <span class="text-gold">/</span>
        <a href="#properties" class="transition hover:text-gold">Properties</a>
        <span class="text-gold">/</span>
        <span id="breadcrumb-region">{{ selectedRegion === "all" ? "All Regions" : selectedRegion }}</span>
        <span class="text-gold">/</span>
        <span id="breadcrumb-location">
          {{ selectedLocation === "all" ? "All Locations" : `${selectedLocation} (${getLocationCount(selectedLocation)})` }}
        </span>
      </nav>

      <div id="properties-grid" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PropertyCard
          v-for="property in properties"
          :key="property.title"
          :property="property"
          :whatsapp-label="t('properties.whatsapp')"
          :hidden-by-filter="isHiddenByFilter(property)"
        />
      </div>

      <div class="mt-16 flex justify-center" id="view-all-wrapper">
        <button id="view-all-btn" type="button" @click="toggleAllProperties">
          <span id="view-all-label">{{ showAll ? "Close" : "View All Properties" }}</span>
          <span id="view-all-arrow" style="margin-left: 12px; display: inline-block; transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1)">
            {{ showAll ? "↑" : "↓" }}
          </span>
        </button>
      </div>

      <div
        id="all-properties-panel"
        ref="panelRef"
        :style="{
          maxHeight: showAll ? '9999px' : '0',
          overflow: 'hidden',
          opacity: showAll ? '1' : '0',
          transition: 'max-height 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease',
          marginTop: showAll ? '64px' : '0',
        }"
      >
        <div
          v-for="(property, index) in properties"
          :key="`all-${property.title}`"
          class="all-prop-row"
          :class="{ visible: rowsVisible }"
          :data-index="index"
          :style="{ transitionDelay: rowsVisible ? `${index * 90}ms` : '0ms' }"
        >
          <img :src="property.image" :alt="property.title" />
          <div class="all-prop-details">
            <p class="all-prop-region">{{ property.eyebrow }}</p>
            <h3 class="all-prop-title">{{ property.title }}</h3>
            <div class="all-prop-meta">
              <span><b>Region</b> {{ property.region }}</span>
              <span><b>Location</b> {{ property.displayLocation }}</span>
              <span><b>Category</b> {{ property.category }}</span>
              <span><b>Status</b> {{ property.status }}</span>
            </div>
            <p class="all-prop-price">{{ property.price }}</p>
          </div>
          <a class="all-prop-whatsapp" :href="whatsappHref(property.title)" target="_blank" rel="noopener">
            Contact on WhatsApp
          </a>
        </div>
      </div>

      <p
        id="no-properties"
        class="mt-10 border border-white/10 bg-dark-2 p-6 text-center text-sm uppercase tracking-widest text-white/55"
        :class="{ hidden: visibleProperties.length > 0 }"
      >
        No properties match this location.
      </p>
    </div>
  </section>
</template>
