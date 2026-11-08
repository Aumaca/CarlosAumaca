<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ArrowUpRight, Download } from 'lucide-vue-next'

import { useMarquee } from '@v2/composables/useMarquee'
import { projectImage } from '@v2/utils/media'
import TechChip from './TechChip.vue'

const STRIP_HEIGHT = 240
const MIN_LOOP_WIDTH = 900

const props = defineProps({
  index: Number,
  project: {
    name: String,
    url: String,
    stack: Array,
    desktopImages: Array,
    mobileImages: Array,
    description: {
      en: String,
      pt: String
    }
  },
  getDescription: {
    type: Function
  }
})

const images = [...new Set([...props.project.desktopImages, ...props.project.mobileImages])].map(
  projectImage
)
const isStatic = images.length === 1

// Short galleries repeat so the endless strip never shows a gap.
const stripImages = (() => {
  if (isStatic) return images
  const widthOf = (image) => (image.width / image.height) * STRIP_HEIGHT + 10
  const oneRound = images.reduce((sum, image) => sum + widthOf(image), 0)
  const rounds = Math.ceil(MIN_LOOP_WIDTH / oneRound)
  return Array.from({ length: rounds }, () => images).flat()
})()

const viewport = ref(null)
const track = ref(null)
const isNear = ref(false)
const marquee = useMarquee(viewport, track)

let nearObserver = null

onMounted(() => {
  nearObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      isNear.value = true
      nearObserver.disconnect()
    },
    { rootMargin: '700px 0px' }
  )
  nearObserver.observe(viewport.value)
})

watch(isNear, async () => {
  if (isStatic) return
  await nextTick()
  marquee.start()
})

onBeforeUnmount(() => nearObserver?.disconnect())

// Description: collapsed to a few lines, opens with a measured height transition.
const COLLAPSED_HEIGHT = 120

const body = ref(null)
const bodyHeight = ref(0)
const isExpanded = ref(false)
const canExpand = computed(() => bodyHeight.value > COLLAPSED_HEIGHT + 8)
const paragraphs = computed(() => props.getDescription(props.project.description).split('\n'))

let bodyObserver = null

onMounted(() => {
  bodyObserver = new ResizeObserver(([entry]) => {
    bodyHeight.value = Math.ceil(entry.contentRect.height)
  })
  bodyObserver.observe(body.value)
})

onBeforeUnmount(() => bodyObserver?.disconnect())

const moveSpotlight = (event) => {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  card.style.setProperty('--my', `${event.clientY - rect.top}px`)
}
</script>

<template>
  <article v-reveal class="card" :style="{ '--i': index % 3 }" @pointermove="moveSpotlight">
    <!-- Gallery -->
    <div
      ref="viewport"
      class="strip"
      :class="{ 'strip--static': isStatic }"
      v-on="isStatic ? {} : marquee.handlers"
    >
      <template v-if="isNear">
        <img
          v-if="isStatic"
          class="strip__single"
          :src="images[0].src"
          :width="images[0].width"
          :height="images[0].height"
          :alt="project.name"
          decoding="async"
          draggable="false"
        />

        <div v-else ref="track" class="strip__track">
          <div v-for="copy in 2" :key="copy" class="strip__group" :aria-hidden="copy === 2">
            <img
              v-for="(image, imageIndex) in stripImages"
              :key="imageIndex"
              :src="image.src"
              :width="image.width"
              :height="image.height"
              :alt="copy === 1 ? `${project.name} ${imageIndex + 1}` : ''"
              decoding="async"
              draggable="false"
            />
          </div>
        </div>
      </template>
    </div>

    <div class="card__content">
      <!-- Name -->
      <h3 class="card__title">
        <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">
          {{ project.name }}
          <ArrowUpRight class="card__title-icon" :size="16" aria-hidden="true" />
        </a>
        <template v-else>{{ project.name }}</template>
      </h3>

      <!-- Tags -->
      <ul class="card__stack">
        <li v-for="slug in project.stack" :key="slug">
          <TechChip :slug="slug" />
        </li>
      </ul>

      <!-- Description -->
      <div
        class="card__description"
        :class="{ 'is-clamped': canExpand && !isExpanded }"
        :style="{
          maxHeight: `${isExpanded || !canExpand ? bodyHeight : COLLAPSED_HEIGHT}px`
        }"
      >
        <div ref="body" class="card__body">
          <p v-for="(paragraph, paragraphIndex) in paragraphs" :key="paragraphIndex">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div v-if="canExpand || project.file" class="card__actions">
        <button
          v-if="canExpand"
          type="button"
          class="card__more"
          :aria-expanded="isExpanded"
          @click="isExpanded = !isExpanded"
        >
          {{ isExpanded ? $t('readLess') : $t('readMore') }}
        </button>

        <!-- Download APK -->
        <a
          v-if="project.file"
          class="card__download"
          :href="project.file"
          target="_blank"
          rel="noopener"
        >
          <Download :size="15" aria-hidden="true" />
          {{ $t('downloadApk') }}
          <span>{{ $t('googleDrive') }}</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  --mx: 50%;
  --my: 0%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-radius: var(--radius);
  background: linear-gradient(180deg, #0e1118 0%, var(--surface) 100%);
  box-shadow: inset 0 0 0 1px var(--line);
  overflow: hidden;
}

/* Border light that follows the pointer */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  padding: 1px;
  border-radius: inherit;
  background: radial-gradient(
    380px circle at var(--mx) var(--my),
    rgba(132, 250, 176, 0.7),
    rgba(143, 211, 244, 0.25) 45%,
    transparent 70%
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box exclude,
    linear-gradient(#000 0 0);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    420px circle at var(--mx) var(--my),
    rgba(132, 250, 176, 0.05),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

@media (hover: hover) {
  .card:hover::before,
  .card:hover::after {
    opacity: 1;
  }
}

/* Gallery */
.strip {
  position: relative;
  height: 240px;
  padding-block: 10px;
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  background: rgba(0, 0, 0, 0.28);
  -webkit-mask: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
  mask: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
}

.strip:active {
  cursor: grabbing;
}

.strip--static {
  display: grid;
  place-items: center;
  cursor: default;
}

.strip__single {
  width: auto;
  height: 220px;
  max-width: 90%;
  object-fit: contain;
  border-radius: 10px;
}

.strip__track {
  display: flex;
  width: max-content;
  height: 100%;
  will-change: transform;
}

/* Bright screenshots sit back until the card is in focus */
.strip__track,
.strip__single {
  opacity: 0.84;
  transition: opacity 0.5s ease;
}

.card:hover .strip__track,
.card:hover .strip__single {
  opacity: 1;
}

.strip__group {
  display: flex;
  gap: 10px;
  padding-right: 10px;
  height: 100%;
}

.strip__group img {
  width: auto;
  height: 100%;
  max-width: none;
  border-radius: 10px;
  pointer-events: none;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* Content */
.card__content {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: 1.125rem 1.25rem 1.25rem;
}

.card__title {
  font-size: var(--fs-h3);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.015em;
}

.card__title a {
  transition: color 0.3s ease;
}

.card__title a:hover {
  color: var(--mint);
}

.card__title-icon {
  display: inline-block;
  vertical-align: -0.12em;
  color: var(--text-3);
  transition:
    transform 0.5s var(--ease),
    color 0.3s ease;
}

.card__title a:hover .card__title-icon {
  color: var(--mint);
  transform: translate3d(2px, -2px, 0);
}

.card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3125rem;
}

.card__description {
  position: relative;
  overflow: hidden;
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--text-2);
  transition: max-height 0.7s var(--ease);
}

.card__description::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 3.5rem;
  background: linear-gradient(180deg, transparent, #0c0e14);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.card__description.is-clamped::after {
  opacity: 1;
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.card__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
}

.card__more {
  font-family: var(--mono);
  font-size: var(--fs-xs);
  font-weight: 500;
  color: var(--mint);
  transition: opacity 0.3s ease;
}

.card__more:hover {
  opacity: 0.72;
}

.card__download {
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  height: 2.125rem;
  padding: 0 0.75rem;
  border-radius: 9px;
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--mint);
  background: rgba(132, 250, 176, 0.08);
  box-shadow: inset 0 0 0 1px rgba(132, 250, 176, 0.3);
  transition: background-color 0.3s ease;
}

.card__download span {
  font-weight: 400;
  color: var(--text-3);
}

.card__download:hover {
  background: rgba(132, 250, 176, 0.15);
}
</style>
