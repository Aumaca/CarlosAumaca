<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Check, Languages } from 'lucide-vue-next'
import { LOCALES } from '@/utils/i18n'

const props = defineProps({
  currentLanguage: String,
  changeLanguage: {
    type: Function
  }
})

const root = ref(null)
const isOpen = ref(false)

const choose = (code) => {
  isOpen.value = false
  props.changeLanguage(code)
}

const closeOnOutsideClick = (event) => {
  if (!root.value?.contains(event.target)) isOpen.value = false
}

const closeOnEscape = (event) => {
  if (event.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', closeOnOutsideClick)
  document.addEventListener('keydown', closeOnEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeOnOutsideClick)
  document.removeEventListener('keydown', closeOnEscape)
})
</script>

<template>
  <div ref="root" class="lang">
    <button
      type="button"
      class="lang__trigger"
      :aria-label="$t('languageLabel')"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <Languages :size="17" aria-hidden="true" />
    </button>

    <Transition name="pop">
      <div v-if="isOpen" class="popover lang__menu" role="menu" :aria-label="$t('languageLabel')">
        <button
          v-for="locale in LOCALES"
          :key="locale.code"
          type="button"
          class="lang__option"
          role="menuitemradio"
          :lang="locale.htmlLang"
          :aria-checked="currentLanguage === locale.code"
          @click="choose(locale.code)"
        >
          <span class="fi fis lang__flag" :class="`fi-${locale.flag}`" aria-hidden="true"></span>
          {{ locale.label }}
          <Check
            v-if="currentLanguage === locale.code"
            class="lang__check"
            :size="14"
            aria-hidden="true"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lang {
  position: relative;
}

.lang__trigger {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: var(--text-2);
  transition:
    color 0.4s var(--ease),
    background-color 0.4s var(--ease);
}

.lang__trigger:hover,
.lang__trigger[aria-expanded='true'] {
  color: var(--text);
  background: rgba(255, 255, 255, 0.1);
}

.lang__menu {
  right: 0;
  min-width: 11.5rem;
}

.lang__option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.5rem 0.625rem;
  border-radius: 9px;
  font-size: var(--fs-caption);
  text-align: left;
  color: var(--text);
  white-space: nowrap;
  transition: background-color 0.3s var(--ease);
}

.lang__option:hover {
  background: rgba(255, 255, 255, 0.1);
}

.lang__option .lang__flag {
  flex: none;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 50%;
  background-size: cover;
}

.lang__check {
  margin-left: auto;
  color: var(--text-2);
}
</style>
