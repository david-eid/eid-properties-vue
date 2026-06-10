<script setup>
import { ref } from "vue";

const props = defineProps({
  t: {
    type: Function,
    required: true,
  },
});

const formStatus = ref("");
const focusedField = ref("");

const submitForm = (event) => {
  event.target.reset();
  formStatus.value = props.t("form.status");
};
</script>

<template>
  <section id="contact" class="bg-dark-2 px-5 py-24 lg:px-8">
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p class="section-label">{{ t("contact.label") }}</p>
        <h2 class="section-heading">{{ t("contact.title") }}</h2>
        <p class="leading-8 text-white/70">{{ t("contact.text") }}</p>
        <div class="mt-8 space-y-4 text-sm text-white/65">
          <p><span class="font-semibold text-gold">Email:</span> davideid2004@icloud.com</p>
          <p><span class="font-semibold text-gold">Phone:</span> +961 76 033 933</p>
          <p><span class="font-semibold text-gold">Office:</span> Kaslik , Altavista Center</p>
        </div>
      </div>

      <form id="contact-form" class="grid gap-5 border border-white/10 bg-dark p-6 md:p-8" @submit.prevent="submitForm">
        <div class="grid gap-5 md:grid-cols-2">
          <label class="block">
            <span class="mb-2 block text-xs uppercase tracking-widest text-white/55" :class="{ 'label-active': focusedField === 'name' }">{{ t("form.name") }}</span>
            <input required type="text" name="name" class="w-full border border-white/10 bg-dark-2 px-4 py-3 text-white outline-none transition focus:border-gold" @focus="focusedField = 'name'" @blur="focusedField = ''" />
          </label>
          <label class="block">
            <span class="mb-2 block text-xs uppercase tracking-widest text-white/55" :class="{ 'label-active': focusedField === 'email' }">{{ t("form.email") }}</span>
            <input required type="email" name="email" class="w-full border border-white/10 bg-dark-2 px-4 py-3 text-white outline-none transition focus:border-gold" @focus="focusedField = 'email'" @blur="focusedField = ''" />
          </label>
        </div>
        <label class="block">
          <span class="mb-2 block text-xs uppercase tracking-widest text-white/55" :class="{ 'label-active': focusedField === 'interest' }">{{ t("form.interest") }}</span>
          <select name="interest" class="w-full border border-white/10 bg-dark-2 px-4 py-3 text-white outline-none transition focus:border-gold" @focus="focusedField = 'interest'" @blur="focusedField = ''">
            <option>{{ t("form.buying") }}</option>
            <option>{{ t("form.selling") }}</option>
            <option>{{ t("form.construction") }}</option>
            <option>{{ t("form.investment") }}</option>
          </select>
        </label>
        <label class="block">
          <span class="mb-2 block text-xs uppercase tracking-widest text-white/55" :class="{ 'label-active': focusedField === 'message' }">{{ t("form.message") }}</span>
          <textarea required name="message" rows="5" class="w-full resize-none border border-white/10 bg-dark-2 px-4 py-3 text-white outline-none transition focus:border-gold" @focus="focusedField = 'message'" @blur="focusedField = ''"></textarea>
        </label>
        <button type="submit" class="btn-gold justify-self-start">{{ t("form.submit") }}</button>
        <p id="form-status" class="text-sm text-gold" :class="{ hidden: !formStatus }" role="status">{{ formStatus }}</p>
      </form>
    </div>
  </section>
</template>
