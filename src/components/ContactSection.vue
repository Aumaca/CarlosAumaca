<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { Check, ChevronRight, Copy } from 'lucide-vue-next'
import SignalDivider from './SignalDivider.vue'

const EMAIL = 'carlos.aumaca@gmail.com'

const isCopied = ref(false)
let copiedTimer = 0

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(EMAIL)
  } catch {
    window.location.href = `mailto:${EMAIL}`
    return
  }
  isCopied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (isCopied.value = false), 1800)
}

onBeforeUnmount(() => clearTimeout(copiedTimer))
</script>

<template>
  <section id="contact" class="contact">
    <SignalDivider />

    <div class="wrap contact__inner">
      <h2 v-reveal class="headline">{{ $t('contactTitle') }}</h2>
      <p v-reveal class="contact__lead" style="--i: 1">{{ $t('contactLead') }}</p>

      <div v-reveal class="contact__actions" style="--i: 2">
        <a class="text-link contact__email" :href="`mailto:${EMAIL}`">
          {{ EMAIL }}
          <ChevronRight :size="22" aria-hidden="true" />
        </a>

        <button class="contact__copy" type="button" @click="copyEmail">
          <Transition name="icon" mode="out-in">
            <Check v-if="isCopied" :size="14" aria-hidden="true" />
            <Copy v-else :size="14" aria-hidden="true" />
          </Transition>
          <span aria-live="polite">{{ isCopied ? $t('copied') : $t('copyEmail') }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-top: clamp(3rem, 7vw, 6rem);
  padding-bottom: var(--section-y);
  text-align: center;
}

.contact__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: clamp(2rem, 4vw, 3rem);
}

.contact__lead {
  margin-top: 1rem;
  font-size: clamp(1.1875rem, 1rem + 0.7vw, 1.5rem);
  color: var(--text-2);
}

.contact__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-top: clamp(1.75rem, 3vw, 2.5rem);
}

.contact__email {
  font-size: clamp(1.1875rem, 1rem + 0.9vw, 1.625rem);
  font-weight: 500;
}

.contact__copy {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: var(--fs-caption);
  color: var(--text-3);
  transition: color 0.4s var(--ease);
}

.contact__copy:hover {
  color: var(--text);
}

.icon-enter-active,
.icon-leave-active {
  transition:
    opacity 0.2s var(--ease),
    transform 0.3s var(--ease-out);
}

.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
