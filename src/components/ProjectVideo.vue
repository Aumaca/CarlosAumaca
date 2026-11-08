<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Maximize2 } from 'lucide-vue-next'

defineProps({
  video: Object,
  title: String
})

const element = ref(null)

let observer = null
let isWatching = false

const canAutoplay = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const playQuietly = () => {
  if (canAutoplay()) element.value.play().catch(() => {})
}

// Opens from the start, with sound and player controls.
const watch = () => {
  const video = element.value
  const enterFullscreen = video.requestFullscreen ?? video.webkitEnterFullscreen
  if (!enterFullscreen) return

  isWatching = true
  video.currentTime = 0
  video.muted = false
  video.controls = true
  enterFullscreen.call(video)
  video.play().catch(() => {})
}

const backToPreview = () => {
  const video = element.value
  if (document.fullscreenElement === video) return
  isWatching = false
  video.controls = false
  video.muted = true
  playQuietly()
}

onMounted(() => {
  const video = element.value
  video.addEventListener('fullscreenchange', backToPreview)
  video.addEventListener('webkitendfullscreen', backToPreview)

  observer = new IntersectionObserver(
    ([entry]) => {
      if (isWatching) return
      if (entry.isIntersecting) playQuietly()
      else video.pause()
    },
    { threshold: 0.25 }
  )
  observer.observe(video)
})

onBeforeUnmount(() => {
  const video = element.value
  video.removeEventListener('fullscreenchange', backToPreview)
  video.removeEventListener('webkitendfullscreen', backToPreview)
  observer?.disconnect()
})
</script>

<template>
  <div class="video" :style="{ aspectRatio: `${video.width} / ${video.height}` }">
    <video
      ref="element"
      :src="video.src"
      :poster="video.poster"
      :width="video.width"
      :height="video.height"
      muted
      loop
      playsinline
      preload="none"
      :aria-label="title"
    ></video>

    <button
      type="button"
      class="video__open"
      :aria-label="`${$t('watchVideo')}: ${title}`"
      @click="watch"
    >
      <span class="video__badge">
        <Maximize2 :size="14" aria-hidden="true" />
      </span>
    </button>
  </div>
</template>

<style scoped>
.video {
  position: relative;
  flex: none;
  border-radius: 14px;
  overflow: hidden;
  background: #000;
}

.video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video video:fullscreen {
  object-fit: contain;
}

.video__open {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0.625rem;
  cursor: pointer;
}

.video__badge {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: #fff;
  background: rgba(29, 29, 31, 0.68);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  backdrop-filter: saturate(180%) blur(12px);
  transition: transform 0.6s var(--ease-out);
}

.video__open:hover .video__badge {
  transform: scale(1.12);
}
</style>
