<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import AboutSection from "./components/AboutSection.vue";
import ContactSection from "./components/ContactSection.vue";
import Footer from "./components/Footer.vue";
import Hero from "./components/Hero.vue";
import Navbar from "./components/Navbar.vue";
import OfficeSection from "./components/OfficeSection.vue";
import PropertiesSection from "./components/PropertiesSection.vue";
import PropertyCard from "./components/PropertyCard.vue";
import ServicesSection from "./components/ServicesSection.vue";
import { properties, translations } from "./data/siteData";

const language = ref(localStorage.getItem("eidLanguage") || "en");
const theme = ref(localStorage.getItem("eidTheme") || "dark");
const isMobileOpen = ref(false);
const isScrolled = ref(false);
const statsStarted = ref(false);
const statValues = ref(["1996", "7+", "1000+", "30+"]);
const chatOpen = ref(false);
const chatInput = ref("");
const chatMessages = ref([{ type: "bot", content: "Hi. How can I help you today?" }]);
const chatMessagesRef = ref(null);
const year = new Date().getFullYear();

const t = (key) => translations[language.value]?.[key] || translations.en[key] || key;

const stats = computed(() => [
  { value: statValues.value[0], label: "Since" },
  { value: statValues.value[1], label: "Projects" },
  { value: statValues.value[2], label: "Clients" },
  { value: statValues.value[3], label: "Years" },
]);

const applyTheme = () => {
  const isLight = theme.value === "light";
  document.body.classList.toggle("light-mode", isLight);
  localStorage.setItem("eidTheme", isLight ? "light" : "dark");
};

const applyLanguage = () => {
  document.documentElement.lang = language.value;
  document.documentElement.dir = language.value === "ar" ? "rtl" : "ltr";
  localStorage.setItem("eidLanguage", language.value);
};

const syncNavbarState = () => {
  isScrolled.value = window.scrollY > 16;
};

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};

const toggleLanguage = () => {
  language.value = language.value === "en" ? "ar" : "en";
  nextTick(runHeroIntro);
};

const runHeroIntro = () => {
  const heroElements = document.querySelectorAll("#home .hero-word, #home .hero-cinematic-subtext, #home .hero-cinematic-cta");
  heroElements.forEach((element) => element.classList.remove("hero-cinematic-visible"));
  window.setTimeout(() => {
    document.querySelectorAll("#home .hero-word").forEach((span) => span.classList.add("hero-cinematic-visible"));
    const words = document.querySelectorAll("#home .hero-word").length;
    window.setTimeout(() => document.querySelector("#home .hero-cinematic-subtext")?.classList.add("hero-cinematic-visible"), words * 130 + 300);
    document.querySelectorAll("#home .hero-cinematic-cta").forEach((button, index) => {
      window.setTimeout(() => button.classList.add("hero-cinematic-visible"), words * 130 + 500 + index * 200);
    });
  }, 20);
};

const createIntro = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    runHeroIntro();
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "intro-overlay";
  overlay.innerHTML = '<div id="intro-top"></div><div id="intro-bottom"></div><div id="intro-text">EID Properties</div>';
  document.body.appendChild(overlay);

  window.setTimeout(() => overlay.classList.add("text-in"), 300);
  window.setTimeout(() => overlay.classList.add("text-out"), 1400);
  window.setTimeout(() => overlay.classList.add("intro-split"), 1800);
  window.setTimeout(() => {
    overlay.remove();
    runHeroIntro();
  }, 2500);
};

const createCursor = () => {
  if (window.matchMedia("(max-width: 768px)").matches) {
    return;
  }

  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.id = "cursor-dot";
  ring.id = "cursor-ring";
  document.body.append(dot, ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const move = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
    document.body.classList.add("cursor-active");
  };

  const mouseover = (event) => {
    if (event.target.closest("a, button, .btn-gold, .whatsapp-btn")) {
      document.body.classList.add("cursor-hover");
    }
  };

  const mouseout = (event) => {
    if (event.target.closest("a, button, .btn-gold, .whatsapp-btn")) {
      document.body.classList.remove("cursor-hover");
    }
  };

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.08;
    ringY += (mouseY - ringY) * 0.08;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    window.requestAnimationFrame(animateRing);
  };

  window.addEventListener("mousemove", move);
  document.addEventListener("mouseover", mouseover);
  document.addEventListener("mouseout", mouseout);
  animateRing();
};

const createScrollBar = () => {
  const scrollBar = document.createElement("div");
  scrollBar.id = "scroll-bar";
  document.body.appendChild(scrollBar);

  const updateScrollBar = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    scrollBar.style.width = `${progress}%`;
  };

  updateScrollBar();
  window.addEventListener("scroll", updateScrollBar, { passive: true });
  window.addEventListener("resize", updateScrollBar);
};

const createGrain = () => {
  const grain = document.createElement("div");
  grain.id = "grain";
  document.body.appendChild(grain);

  const setGrain = () => {
    const frequency = (0.62 + Math.random() * 0.06).toFixed(3);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#noise)"/></svg>`;
    grain.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  };

  setGrain();
  window.setInterval(setGrain, 120);
};

const initScrollReveals = () => {
  const revealElements = document.querySelectorAll(
    [
      "section:not(#home) .section-label",
      "section:not(#home) .section-heading",
      "section:not(#home) .section-heading + p",
      "#properties .mb-10",
      "#properties nav",
      ".property-card",
      "#about img",
      "#about .leading-8",
      "#services .grid > div",
      "#office .overflow-hidden",
      "#contact .leading-8",
      "#contact .mt-8",
      "#contact-form",
      "footer",
    ].join(","),
  );

  revealElements.forEach((element, index) => {
    element.classList.add("reveal-luxury");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
};

const initCinematicCards = () => {
  const cards = document.querySelectorAll("article.property-card");

  cards.forEach((card, index) => {
    card.classList.add("cinematic-card");
    card.style.transitionDelay = `${index * 110}ms`;
  });

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("card-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("card-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
  );

  cards.forEach((card) => observer.observe(card));
};

const startStats = () => {
  if (statsStarted.value) {
    return;
  }

  statsStarted.value = true;
  const targets = [
    { from: 1990, to: 1996, suffix: "" },
    { from: 0, to: 7, suffix: "+" },
    { from: 0, to: 1000, suffix: "+" },
    { from: 0, to: 30, suffix: "+" },
  ];
  const startedAt = performance.now();
  const easeOut = (progress) => 1 - Math.pow(1 - progress, 3);

  const step = (now) => {
    const progress = Math.min((now - startedAt) / 2000, 1);
    const eased = easeOut(progress);
    statValues.value = targets.map((config) => `${Math.round(config.from + (config.to - config.from) * eased)}${config.suffix}`);

    if (progress < 1) {
      window.requestAnimationFrame(step);
      return;
    }

    document.querySelectorAll(".stats-line").forEach((line, index) => {
      window.setTimeout(() => line.classList.add("line-visible"), index * 120);
    });
  };

  window.requestAnimationFrame(step);
};

const initStatsObserver = () => {
  const statsSection = document.getElementById("stats");

  if (!statsSection || !("IntersectionObserver" in window)) {
    startStats();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        startStats();
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(statsSection);
};

const getChatResponse = (message) => {
  const lower = message.toLowerCase();

  if (["hello", "hi", "hey", "good morning", "good evening"].some((term) => lower.includes(term))) {
    return "Welcome to EID Properties & Construction. How can I assist you today?";
  }
  if (["properties", "available", "listings", "what do you have"].some((term) => lower.includes(term))) {
    return "We currently have the following properties available:<br><br><b>Marina Waterfront Residence</b> - Dbayeh, Metn - $1,600,000<br><b>Kaslik Altavista Residence</b> - Kaslik - $250,000<br><b>Adma Hillside Villa</b> - Adma, Keserwan - $900,000<br><b>Kfarhbab Grand Residence</b> - Kfarhbab - $750,000<br><b>Ghosta Contemporary Villa</b> - Ghosta, Keserwan - Contact for Price<br><b>Kleiat Stone Villa</b> - Kleiat, Keserwan - Contact for Price";
  }
  if (lower.includes("villa")) {
    return "We have several villas available:<br><br><b>Adma Hillside Villa</b> - $900,000<br><b>Ghosta Contemporary Villa</b> - Contact for Price<br><b>Kleiat Stone Villa</b> - Contact for Price<br><br>Would you like more details on any of these?";
  }
  if (lower.includes("apartment") || lower.includes("flat")) {
    return "We have the <b>Kaslik Altavista Residence</b> apartment available for $250,000 in Kaslik. Would you like more information?";
  }
  if (["price", "cost", "how much", "budget"].some((term) => lower.includes(term))) {
    return "Our property prices range from $250,000 to $1,600,000 depending on location and type.<br><br>Kaslik Residence - $250,000<br>Kfarhbab Grand Residence - $750,000<br>Adma Hillside Villa - $900,000<br>Marina Waterfront - $1,600,000<br>Ghosta & Kleiat Villas - Contact for Price";
  }
  if (["location", "where", "area", "region", "keserwan", "jounieh", "metn", "adma", "kaslik", "ghosta", "kleiat", "kfarhbab"].some((term) => lower.includes(term))) {
    return "Our properties are located across premium Lebanese regions:<br><br>Adma - Keserwan<br>Kaslik - Jounieh District<br>Kfarhbab - Jounieh District<br>Ghosta - Keserwan<br>Kleiat - Keserwan<br>Waterfront City, Dbayeh - Metn";
  }
  if (["contact", "reach", "call", "phone", "number"].some((term) => lower.includes(term))) {
    return "You can reach us at:<br><br><b>+961 76 033 933</b><br><b>davideid2004@icloud.com</b><br>Kaslik, Altavista Center, Lebanon";
  }
  if (lower.includes("email") || lower.includes("mail")) {
    return "You can email us at <b>davideid2004@icloud.com</b> and we will get back to you as soon as possible.";
  }
  if (["office", "visit", "address"].some((term) => lower.includes(term))) {
    return "Our office is located at:<br><br><b>Kaslik, Altavista Center, Lebanon</b><br><br>Monday - Saturday: 8:00 AM - 7:00 PM<br>Sunday: Closed<br><br>We welcome private consultations.";
  }
  if (["hours", "open", "working hours", "time", "when"].some((term) => lower.includes(term))) {
    return "We are open:<br><br><b>Monday - Saturday:</b> 8:00 AM - 7:00 PM<br><b>Sunday:</b> Closed";
  }
  if (["about", "who are you", "company", "eid"].some((term) => lower.includes(term))) {
    return "<b>EID Properties & Construction</b> has been a trusted name in Lebanese real estate since <b>1996</b>. With 30+ years of experience, we specialize in luxury property sales, premium construction, investment advisory, and real estate development.";
  }
  if (["service", "what do you do", "offer"].some((term) => lower.includes(term))) {
    return "We offer:<br><br><b>Luxury Property Sales</b> - Curated residential and investment listings<br><b>Premium Construction</b> - Quality project execution<br><b>Investment Advisory</b> - Market guidance for buyers and investors<br><b>Real Estate Development</b> - Planning and delivery of refined residences";
  }
  if (["buy", "purchase", "interested"].some((term) => lower.includes(term))) {
    return "We would love to help you find your perfect property. Please contact us at:<br><br><b>+961 76 033 933</b><br><b>davideid2004@icloud.com</b><br><br>You can also fill out the contact form on our website.";
  }
  if (["invest", "investment", "return"].some((term) => lower.includes(term))) {
    return "Lebanon's Keserwan and Jounieh regions offer strong real estate investment potential. EID Properties provides expert investment advisory to help you make the right decision. Contact us at <b>+961 76 033 933</b> for a private consultation.";
  }
  if (["construction", "build", "building", "project"].some((term) => lower.includes(term))) {
    return "EID Properties & Construction offers premium construction services focused on quality, timelines, and enduring finishes. Contact us at <b>+961 76 033 933</b> to discuss your construction project.";
  }
  if (lower.includes("whatsapp") || lower.includes("whats app") || lower.includes("message")) {
    return "You can contact us on WhatsApp at <b>+961 76 033 933</b>. We respond quickly to inquiries.";
  }
  if (["consultation", "meeting", "appointment"].some((term) => lower.includes(term))) {
    return "We offer private consultations at our office in Kaslik, Altavista Center.<br><br>Call us: <b>+961 76 033 933</b><br>Email: <b>davideid2004@icloud.com</b><br>Monday - Saturday: 8:00 AM - 7:00 PM";
  }
  if (["since", "experience", "years", "1996", "how long"].some((term) => lower.includes(term))) {
    return "EID Properties & Construction has been operating since <b>1996</b>, with over <b>30 years</b> of trusted real estate expertise in Lebanon.";
  }
  if (["clients", "customers", "how many"].some((term) => lower.includes(term))) {
    return "We have proudly served over <b>1,000 clients</b> across Lebanon since our founding in 1996.";
  }
  if (["thank", "thanks", "thank you"].some((term) => lower.includes(term))) {
    return "You are most welcome. We are here anytime you need help with properties or services.";
  }
  if (["bye", "goodbye", "see you"].some((term) => lower.includes(term))) {
    return "Thank you for contacting EID Properties & Construction. We look forward to assisting you.";
  }

  return "I can help you with:<br><br>Available Properties<br>Locations & Regions<br>Prices & Budget<br>Our Services<br>Contact Information<br>Office Hours<br>Consultations<br>Construction Projects<br>Investment Advisory<br><br>Please ask me anything about EID Properties & Construction.";
};

const escapeHtml = (value) => value.replace(/[<>&]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[char]);

const sendChatMessage = (text) => {
  const value = text.trim();
  if (!value) {
    return;
  }

  chatMessages.value.push({ type: "user", content: escapeHtml(value) });
  chatInput.value = "";
  window.setTimeout(() => {
    chatMessages.value.push({ type: "bot", content: getChatResponse(value) });
    nextTick(() => {
      if (chatMessagesRef.value) {
        chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
      }
    });
  }, 250);
};

watch(theme, applyTheme);
watch(language, applyLanguage);

onMounted(async () => {
  applyTheme();
  applyLanguage();
  syncNavbarState();
  window.requestAnimationFrame(() => document.body.classList.add("page-loaded"));
  window.addEventListener("scroll", syncNavbarState, { passive: true });

  await nextTick();
  createCursor();
  createIntro();
  createScrollBar();
  createGrain();
  initScrollReveals();
  initCinematicCards();
  initStatsObserver();
});

onUnmounted(() => {
  window.removeEventListener("scroll", syncNavbarState);
});
</script>

<template>
  <Navbar
    :is-scrolled="isScrolled"
    :is-mobile-open="isMobileOpen"
    :language="language"
    :theme="theme"
    :t="t"
    @toggle-mobile="isMobileOpen = !isMobileOpen"
    @close-mobile="isMobileOpen = false"
    @toggle-language="toggleLanguage"
    @toggle-theme="toggleTheme"
  />

  <main>
    <Hero :t="t" />

    <section id="stats" class="border-y border-white/10 bg-dark-2 py-10">
      <div class="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 text-center md:grid-cols-4 lg:px-8">
        <div v-for="(stat, index) in stats" :key="stat.label" class="p-4" style="position: relative">
          <p class="font-playfair text-4xl font-bold text-gold">{{ stat.value }}</p>
          <p class="mt-2 text-xs uppercase tracking-widest text-white/60">{{ stat.label }}</p>
          <div v-if="index < stats.length - 1" class="stats-line"></div>
        </div>
      </div>
    </section>

    <PropertiesSection :properties="properties" :t="t" />
    <AboutSection :t="t" />
    <ServicesSection :t="t" />
    <OfficeSection :t="t" />
    <ContactSection :t="t" />
  </main>

  <Footer :t="t" :year="year" />

  <div id="chatbot-container" class="fixed bottom-24 right-6 z-50">
    <button
      id="chat-toggle"
      class="w-16 h-16 rounded-full bg-[#8B6B47] text-white shadow-xl hover:bg-[#6F5337] transition"
      type="button"
      @click="chatOpen = !chatOpen"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 17 0Z" />
        <path d="M8 10h8" />
        <path d="M8 14h5" />
      </svg>
      <span class="sr-only">Open chat</span>
    </button>
  </div>

  <div
    id="chat-window"
    class="fixed bottom-44 right-6 w-96 h-[550px] bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden z-50"
    :class="{ hidden: !chatOpen, 'chat-open': chatOpen }"
  >
    <div class="bg-[var(--accent)] text-white p-5">
      <h3 class="font-semibold">EID Assistant</h3>
      <p class="text-sm opacity-80">Ask us anything about properties</p>
    </div>

    <div id="chat-messages" ref="chatMessagesRef" class="h-[420px] overflow-y-auto p-4 space-y-4">
      <div
        v-for="(message, index) in chatMessages"
        :key="index"
        class="chat-bubble"
        :class="message.type === 'user' ? 'chat-user' : 'chat-bot'"
        v-html="message.content"
      ></div>

      <div class="flex flex-wrap gap-2 mt-3">
        <button v-for="suggestion in ['View Listings', 'Price Range', 'Locations', 'Contact Team']" :key="suggestion" class="chat-suggestion px-3 py-2 rounded-lg bg-[var(--bg-muted)]" type="button" @click="sendChatMessage(suggestion)">
          {{ suggestion }}
        </button>
      </div>
    </div>

    <div class="p-4 border-t border-[var(--border)]">
      <input
        id="chat-input"
        v-model="chatInput"
        type="text"
        placeholder="Type your message..."
        class="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]"
        @keydown.enter.prevent="sendChatMessage(chatInput)"
      />
    </div>
  </div>
</template>
