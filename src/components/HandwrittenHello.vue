<script setup>
import { computed, shallowRef, watch } from 'vue'
import { TegakiRenderer } from 'tegaki/vue'
import latinFont from 'tegaki/fonts/parisienne'

const props = defineProps({
  language: String
})

const greetings = {
  en: 'hello',
  pt: 'oi',
  es: 'hola',
  de: 'hallo',
  ja: 'こんにちは'
}

// The Japanese font is much larger, so only visitors who pick Japanese download it.
const fontFor = async (language) =>
  language === 'ja' ? (await import('tegaki/fonts/klee-one')).default : latinFont

const shown = shallowRef(null)

watch(
  () => props.language,
  async (language) => {
    const font = await fontFor(language)
    if (language === props.language) shown.value = { language, font }
  },
  { immediate: true }
)

const greeting = computed(() => greetings[shown.value?.language] ?? greetings.en)
</script>

<template>
  <div
    class="hello"
    :class="{ 'hello--ja': shown?.language === 'ja' }"
    role="img"
    :aria-label="greeting"
  >
    <TegakiRenderer
      v-if="shown"
      :key="shown.language"
      :font="shown.font"
      :text="greeting"
      :time="{ mode: 'uncontrolled', speed: 1 }"
      reducedMotion="user"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.hello {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 1.5em;
  font-size: clamp(6.5rem, 4rem + 13vw, 13rem);
  line-height: 1;
  color: var(--text);
  white-space: nowrap;
}

.hello--ja {
  font-size: clamp(3.25rem, 1.5rem + 7vw, 7rem);
}
</style>
