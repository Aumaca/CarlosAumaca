<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

import { useMarquee } from '@/composables/useMarquee'
import { projectImage, projectVideo } from '@/utils/media'
import { tech } from '@/utils/tech'
import ProjectVideo from './ProjectVideo.vue'

const MIN_LOOP_WIDTH = 1600
const COLLAPSED_HEIGHT = 104

const props = defineProps({
  index: Number,
  featured: Boolean,
  wide: Boolean,
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

const stackLine = computed(() => props.project.stack.map((slug) => tech(slug).name).join(' · '))
const paragraphs = computed(() => props.getDescription(props.project.description).split('\n'))

const images = [...new Set([...props.project.desktopImages, ...props.project.mobileImages])].map(
  projectImage
)
const video = props.project.video ? projectVideo(props.project.video) : null
const isLandscapeVideo = Boolean(video) && video.width > video.height
const isStatic = !video && images.length === 1
const isStill = Boolean(video) || isStatic
const stripHeight = props.featured ? 400 : 280

// Short galleries repeat so the endless strip never shows a gap.
const stripImages = (() => {
  if (isStill) return images
  const widthOf = (image) => (image.width / image.height) * stripHeight + 12
  const oneRound = images.reduce((sum, image) => sum + widthOf(image), 0)
  const rounds = Math.ceil(MIN_LOOP_WIDTH / oneRound)
  return Array.from({ length: rounds }, () => images).flat()
})()

const viewport = ref(null)
const track = ref(null)
const isNear = ref(false)
const marquee = useMarquee(viewport, track, { speed: 30 })

let nearObserver = null

watch(isNear, async () => {
  if (isStill) return
  await nextTick()
  marquee.start()
})

// Description: collapsed to a few lines, opens with a measured height transition.
const body = ref(null)
const bodyHeight = ref(0)
const isExpanded = ref(false)
const canExpand = computed(() => bodyHeight.value > COLLAPSED_HEIGHT + 8)

let bodyObserver = null

onMounted(() => {
  nearObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      isNear.value = true
      nearObserver.disconnect()
    },
    { rootMargin: '800px 0px' }
  )
  nearObserver.observe(viewport.value)

  bodyObserver = new ResizeObserver(([entry]) => {
    bodyHeight.value = Math.ceil(entry.contentRect.height)
  })
  bodyObserver.observe(body.value)
})

onBeforeUnmount(() => {
  nearObserver?.disconnect()
  bodyObserver?.disconnect()
})
</script>

<template>
  <article
    v-reveal
    class="card"
    :class="{ 'card--featured': featured, 'card--wide': wide }"
    :style="{ '--i': featured ? 0 : index % 2 }"
  >
    <div class="card__content">
      <h3 class="card__title">{{ project.name }}</h3>
      <p v-if="project.stack.length" class="card__stack">{{ stackLine }}</p>

      <div
        class="card__description"
        :class="{ 'is-clamped': canExpand && !isExpanded }"
        :style="{ maxHeight: `${isExpanded || !canExpand ? bodyHeight : COLLAPSED_HEIGHT}px` }"
      >
        <div ref="body" class="card__body">
          <p v-for="(paragraph, paragraphIndex) in paragraphs" :key="paragraphIndex">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="card__actions">
        <button
          v-if="canExpand"
          type="button"
          class="card__more"
          :aria-expanded="isExpanded"
          @click="isExpanded = !isExpanded"
        >
          {{ isExpanded ? $t('readLess') : $t('readMore') }}
        </button>
        <a v-if="project.url" class="text-link" :href="project.url" target="_blank" rel="noopener">
          {{ $t('visit') }}
          <ChevronRight :size="16" aria-hidden="true" />
        </a>
        <a
          v-if="project.file"
          class="text-link"
          :href="project.file"
          target="_blank"
          rel="noopener"
        >
          {{ $t('downloadApk') }}
          <ChevronRight :size="16" aria-hidden="true" />
        </a>
      </div>
    </div>

    <!-- Gallery -->
    <div
      ref="viewport"
      class="strip"
      :class="{
        'strip--static': isStatic,
        'strip--stage': video,
        'strip--landscape': isLandscapeVideo
      }"
      :style="{ height: isLandscapeVideo ? undefined : `${stripHeight}px` }"
      v-on="isStill ? {} : marquee.handlers"
    >
      <template v-if="isNear">
        <template v-if="video">
          <ProjectVideo :video="video" :title="project.name" />
          <img
            v-if="images[0]"
            class="strip__side"
            :src="images[0].src"
            :width="images[0].width"
            :height="images[0].height"
            :alt="project.name"
            decoding="async"
            draggable="false"
          />
        </template>

        <img
          v-else-if="isStatic"
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
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
}

.card--featured,
.card--wide {
  grid-column: 1 / -1;
}

.card__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: clamp(1.75rem, 3.5vw, 2.75rem) clamp(1.5rem, 3.5vw, 2.75rem) 1.75rem;
}

.card__title {
  font-size: var(--fs-title);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.025em;
}

.card__stack {
  margin-top: 0.625rem;
  font-size: var(--fs-caption);
  line-height: 1.5;
  letter-spacing: 0;
  color: var(--text-3);
}

.card__description {
  position: relative;
  margin-top: 1.125rem;
  overflow: hidden;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-2);
  transition: max-height 0.9s var(--ease-out);
}

.card__description::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 3.5rem;
  background: linear-gradient(180deg, transparent, var(--surface));
  opacity: 0;
  transition: opacity 0.5s var(--ease);
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
  gap: 0.5rem 1.5rem;
  margin-top: auto;
  padding-top: 1.25rem;
  font-size: 0.9375rem;
}

.card__more {
  color: var(--text);
  transition: opacity 0.4s var(--ease);
}

.card__more:hover {
  opacity: 0.65;
}

/* Gallery */
.strip {
  position: relative;
  flex: none;
  padding-bottom: 12px;
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  -webkit-mask: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  mask: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
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
  height: 100%;
  max-width: 90%;
  object-fit: contain;
  border-radius: 14px;
}

/* Video first, then the remaining image, held still so the video can be watched */
.strip--stage {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 clamp(1.5rem, 3.5vw, 2.75rem) clamp(1.5rem, 3vw, 2.25rem);
  cursor: default;
  -webkit-mask: none;
  mask: none;
}

.strip--stage:active {
  cursor: default;
}

.strip--stage :deep(.video) {
  height: 100%;
}

.strip--landscape :deep(.video) {
  width: min(100%, 560px);
  height: auto;
}

.strip__side {
  flex: 0 1 auto;
  width: auto;
  min-width: 0;
  height: auto;
  max-height: 100%;
  border-radius: 14px;
}

.strip__track {
  display: flex;
  width: max-content;
  height: 100%;
  will-change: transform;
}

.strip__track,
.strip__single {
  opacity: 0.88;
  transition: opacity 0.7s var(--ease);
}

.card:hover .strip__track,
.card:hover .strip__single {
  opacity: 1;
}

.strip__group {
  display: flex;
  gap: 12px;
  padding-right: 12px;
  height: 100%;
}

.strip__group img {
  width: auto;
  height: 100%;
  max-width: none;
  border-radius: 14px;
  pointer-events: none;
}
</style>
