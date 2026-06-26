<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { getBanners } from "@/services/osimartApi";

const props = defineProps({
  t: {
    type: Function,
    required: true,
  },
});

const banners = ref([]);
const activeBannerIndex = ref(0);
const loadingBanner = ref(true);
const bannerError = ref(null);
let sliderTimer = null;
let refreshTimer = null;

const fallbackImage =
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2200&q=100";
const OSIMART_ORIGIN = "https://api.osimart.com";

const hasDynamicBanners = computed(() => banners.value.length > 0);
const activeBanner = computed(() => {
  return banners.value && banners.value.length > 0 ? banners.value[activeBannerIndex.value] || banners.value[0] : null;
});
const heroTitle = computed(() => activeBanner.value?.title || "EID Properties & Construction");
const heroWords = computed(() => heroTitle.value.split(/\s+/).filter(Boolean));
const heroSubtitle = computed(() => activeBanner.value?.subtitle || "Where Trust Meets Value");
const heroButtonTitle = computed(() => activeBanner.value?.button_title || "Explore Signature Properties");
const heroButtonLink = computed(() => activeBanner.value?.link || "#properties");
const bannerImage = computed(() => {
  const banner = activeBanner.value;
  const image = banner?.image;
  const media = banner?.media;
  const file = banner?.file;
  const imageUrl = banner?.image_url;
  const galleryFile = banner?.gallery?.[0]?.file;
  const galleryUrl = banner?.gallery?.[0]?.url;

  return (
    getMediaSource(image) ||
    getMediaSource(media) ||
    getMediaSource(file) ||
    getMediaSource(imageUrl) ||
    getMediaSource(galleryFile) ||
    getMediaSource(galleryUrl) ||
    null
  );
});
const heroImage = computed(() => resolveMediaUrl(bannerImage.value) || fallbackImage);

function getMediaSource(media) {
  if (typeof media === "string") {
    return media;
  }

  if (media && typeof media === "object") {
    return media.file || media.url || media.path || media.image || media.image_url || null;
  }

  return null;
}

function resolveMediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${OSIMART_ORIGIN}${cleanPath}`;
}

function revealHero() {
  nextTick(() => {
    const heroElements = document.querySelectorAll(
      "#home .hero-word, #home .hero-cinematic-subtext, #home .hero-cinematic-cta",
    );
    heroElements.forEach((element) => element.classList.remove("hero-cinematic-visible"));

    window.setTimeout(() => {
      document.querySelectorAll("#home .hero-word").forEach((span) => span.classList.add("hero-cinematic-visible"));
      const words = document.querySelectorAll("#home .hero-word").length;
      window.setTimeout(
        () => document.querySelector("#home .hero-cinematic-subtext")?.classList.add("hero-cinematic-visible"),
        words * 130 + 300,
      );
      document.querySelectorAll("#home .hero-cinematic-cta").forEach((button, index) => {
        window.setTimeout(() => button.classList.add("hero-cinematic-visible"), words * 130 + 500 + index * 200);
      });
    }, 120);
  });
}

function startSlider() {
  window.clearInterval(sliderTimer);

  if (banners.value.length <= 1) {
    return;
  }

  sliderTimer = window.setInterval(() => {
    activeBannerIndex.value = (activeBannerIndex.value + 1) % banners.value.length;
  }, 6500);
}

async function loadBanners({ reveal = false } = {}) {
  try {
    const result = await getBanners();
    banners.value = Array.isArray(result) ? result : [];
    console.log("OSIMART banners:", banners.value);
    console.log("OSIMART banners loaded:", banners.value);
    console.log("Active banner:", activeBanner.value);
    console.log("Banner image URL:", heroImage.value);
    activeBannerIndex.value = Math.min(activeBannerIndex.value, Math.max(banners.value.length - 1, 0));
    startSlider();
    bannerError.value = null;
  } catch (apiError) {
    bannerError.value = apiError;
    console.error("Banner API error:", apiError);

    if (!banners.value.length) {
      banners.value = [];
    }
  } finally {
    if (reveal) {
      revealHero();
    }
  }
}

onMounted(async () => {
  await loadBanners({ reveal: true });
  loadingBanner.value = false;
  refreshTimer = window.setInterval(() => loadBanners(), 30000);
});

watch(activeBannerIndex, revealHero);
watch(heroTitle, revealHero);

onBeforeUnmount(() => {
  window.clearInterval(sliderTimer);
  window.clearInterval(refreshTimer);
});
</script>

<template>
  <section
    id="home"
    class="relative flex min-h-screen items-center overflow-hidden pt-24"
    :aria-busy="loadingBanner"
    :data-osimart-status="bannerError ? 'fallback' : hasDynamicBanners ? 'loaded' : 'loading'"
  >
    <div class="absolute inset-0">
      <img
        :src="heroImage"
        alt="EID Properties & Construction"
        class="h-full w-full object-cover opacity-45"
      />
      <div class="hero-overlay absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/25"></div>
    </div>

    <div class="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div class="max-w-3xl">
        <p class="section-label">{{ t("hero.label") }}</p>
        <h1 id="hero-title" class="font-playfair text-5xl font-bold leading-tight text-white md:text-7xl">
          <span
            v-for="(word, index) in heroWords"
            :key="`${word}-${index}`"
            class="hero-word"
            :style="{ transitionDelay: `${index * 130}ms` }"
          >
            {{ word }}{{ index < heroWords.length - 1 ? " " : "" }}
          </span>
        </h1>
        <p class="hero-cinematic-subtext mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
          {{ heroSubtitle }}
        </p>
        <div class="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            :href="heroButtonLink"
            :target="activeBanner?.link ? '_blank' : undefined"
            :rel="activeBanner?.link ? 'noopener noreferrer' : undefined"
            class="hero-cinematic-cta btn-gold text-center"
          >
            {{ heroButtonTitle }}
          </a>
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
