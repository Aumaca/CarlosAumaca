<script setup>
import { Globe } from 'lucide-vue-next'

defineProps({
  currentLanguage: String,
  changeLanguage: {
    type: Function
  }
})

const options = [
  { value: 'en', label: 'EN' },
  { value: 'pt', label: 'PT' }
]
</script>

<template>
  <div class="lang" role="radiogroup" :aria-label="$t('languageLabel')">
    <Globe class="lang__globe" :size="14" aria-hidden="true" />
    <div class="lang__track">
      <span class="lang__thumb" :class="{ 'lang__thumb--end': currentLanguage === 'pt' }"></span>
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        role="radio"
        class="lang__option"
        :class="{ 'is-active': currentLanguage === option.value }"
        :aria-checked="currentLanguage === option.value"
        @click="changeLanguage(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.lang {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.lang__globe {
  color: var(--text-3);
}

.lang__track {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 2px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 0 1px var(--line);
}

.lang__thumb {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 2px;
  width: calc(50% - 2px);
  border-radius: 999px;
  background: var(--grad);
  box-shadow: 0 0 14px rgba(132, 250, 176, 0.35);
  transition: transform 0.5s var(--ease);
}

.lang__thumb--end {
  transform: translateX(100%);
}

.lang__option {
  position: relative;
  min-width: 2.15rem;
  height: 1.625rem;
  font-family: var(--mono);
  font-size: var(--fs-2xs);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--text-2);
  transition: color 0.3s ease;
}

.lang__option:hover {
  color: var(--text);
}

.lang__option.is-active {
  color: #06140c;
}
</style>
