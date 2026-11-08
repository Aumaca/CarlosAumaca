<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronRight } from 'lucide-vue-next'

import portrait from '../assets/media/eu.jpg?w=800&format=webp&quality=86'
import { socials } from '@/utils/socials'

const props = defineProps({
  currentLanguage: String
})

const { t } = useI18n()
// Japanese is written without spaces, so it lights up character by character.
const isSpaced = computed(() => props.currentLanguage !== 'ja')
const words = computed(() =>
  isSpaced.value ? t('aboutStatement').split(' ') : [...t('aboutStatement')]
)

const statement = ref(null)
const DIM = 0.16
const SOFTNESS = 3

let wordElements = []
let frame = 0
let visibility = null

const clamp = (value) => Math.min(1, Math.max(0, value))

// Words light up one after another as the sentence moves up the screen.
const paint = () => {
  frame = 0
  const top = statement.value.getBoundingClientRect().top
  const height = window.innerHeight
  const start = height * 0.82
  const end = height * 0.3
  const progress = clamp((start - top) / (start - end))
  const head = progress * (wordElements.length + SOFTNESS)

  wordElements.forEach((word, index) => {
    word.style.opacity = DIM + (1 - DIM) * clamp((head - index) / SOFTNESS)
  })
}

const queuePaint = () => {
  if (!frame) frame = requestAnimationFrame(paint)
}

const collectWords = () => {
  wordElements = [...statement.value.querySelectorAll('.about__word')]
  paint()
}

watch(
  () => props.currentLanguage,
  () => nextTick(collectWords)
)

onMounted(() => {
  collectWords()

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    wordElements.forEach((word) => (word.style.opacity = 1))
    return
  }

  visibility = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) window.addEventListener('scroll', queuePaint, { passive: true })
    else window.removeEventListener('scroll', queuePaint)
    queuePaint()
  })
  visibility.observe(statement.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', queuePaint)
  visibility?.disconnect()
})
</script>

<template>
  <section id="about-me" class="section">
    <div class="wrap about">
      <div v-reveal class="about__photo">
        <img :src="portrait" width="800" height="1343" alt="Carlos Aumaca" />
      </div>

      <div class="about__copy">
        <p ref="statement" class="about__statement">
          <span v-for="(word, index) in words" :key="`${currentLanguage}-${index}`">
            <span class="about__word">{{ word }}</span
            >{{ isSpaced ? ' ' : '' }}
          </span>
        </p>

        <ul v-reveal class="about__links">
          <li v-for="social in socials" :key="social.name">
            <a class="text-link" :href="social.url" target="_blank" rel="noopener">
              {{ social.name }}
              <ChevronRight :size="16" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  align-items: center;
  gap: clamp(2.5rem, 7vw, 6rem);
}

.about__photo {
  aspect-ratio: 4 / 5;
  border-radius: var(--radius);
  overflow: hidden;
}

.about__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 17%;
  transform: scale(1.08);
  transition: transform 2.2s var(--ease-out);
}

.about__photo.is-visible img {
  transform: none;
}

.about__statement {
  font-size: var(--fs-statement);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.03em;
}

.about__word {
  opacity: 0.16;
  transition: opacity 0.35s linear;
}

.about__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-top: clamp(2rem, 4vw, 3rem);
}

@media (max-width: 820px) {
  .about {
    grid-template-columns: minmax(0, 1fr);
  }

  .about__photo {
    width: min(100%, 420px);
    margin-inline: auto;
  }
}
</style>
