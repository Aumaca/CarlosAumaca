<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { Check, Copy } from 'lucide-vue-next'

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
    <div class="wrap contact__inner">
      <h2 v-reveal class="contact__title gradient-text">{{ $t('contact') }}</h2>
      <p v-reveal class="contact__lead" style="--i: 1">{{ $t('contactLead') }}</p>

      <div v-reveal style="--i: 2">
        <a class="contact__email" :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
      </div>

      <div v-reveal style="--i: 3">
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
  position: relative;
  padding-top: 1.75rem;
  padding-bottom: var(--section-y);
  text-align: center;
}

.contact::before {
  content: '';
  position: absolute;
  inset: -40% 0 0;
  background: radial-gradient(50% 42% at 50% 44%, rgba(37, 91, 255, 0.16), transparent 100%);
  pointer-events: none;
}

.contact__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact__title {
  font-size: var(--fs-h2);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.contact__lead {
  margin-top: 0.75rem;
  font-size: var(--fs-lead);
  color: var(--text-2);
}

.contact__email {
  position: relative;
  display: inline-block;
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
  font-size: clamp(1.375rem, 0.85rem + 2.6vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.25;
  color: var(--text);
  transition: color 0.35s ease;
}

.contact__email::before,
.contact__email::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.125em;
  height: 1px;
}

.contact__email::before {
  background: var(--line-strong);
}

.contact__email::after {
  background: var(--grad);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.8s var(--ease);
}

.contact__email:hover {
  color: var(--mint);
}

.contact__email:hover::after {
  transform: none;
}

.contact__copy {
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  height: 2.25rem;
  margin-top: clamp(1.5rem, 3vw, 2rem);
  padding: 0 0.875rem;
  border-radius: 10px;
  font-family: var(--mono);
  font-size: var(--fs-xs);
  font-weight: 500;
  color: var(--text-2);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 0 0 1px var(--line);
  transition:
    color 0.3s ease,
    box-shadow 0.3s ease;
}

.contact__copy:hover {
  color: var(--mint);
  box-shadow: inset 0 0 0 1px rgba(132, 250, 176, 0.4);
}

.icon-enter-active,
.icon-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.2s var(--ease);
}

.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
