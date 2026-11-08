<script setup>
import { ChevronDown } from 'lucide-vue-next'
import CircuitPatch from './CircuitPatch.vue'
import HandwrittenHello from './HandwrittenHello.vue'

defineProps({
  currentLanguage: String
})
</script>

<template>
  <section id="top" class="hero">
    <CircuitPatch class="hero__patch" />

    <div class="hero__center">
      <HandwrittenHello :language="currentLanguage" />
      <div class="hero__copy">
        <h1 class="hero__name">Carlos Aumaca</h1>
        <p class="hero__role">{{ $t('heroRole') }}</p>
      </div>
    </div>

    <a class="hero__hint" href="#about-me" :aria-label="$t('scrollToAbout')">
      <ChevronDown :size="22" aria-hidden="true" />
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  min-height: 100svh;
  padding: var(--nav-height) var(--gutter) 0;
  overflow: hidden;
}

.hero__patch {
  top: 50%;
  left: 50%;
  width: min(1300px, 150vw);
  height: min(1000px, 130vh);
  transform: translate(-50%, -50%);
}

.hero__center {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2rem, 5vh, 3.5rem);
  text-align: center;
}

.hero__copy {
  animation: fade-up 1.4s var(--ease-out) 2.5s backwards;
}

.hero__name {
  font-size: var(--fs-title);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.022em;
}

.hero__role {
  margin-top: 0.375rem;
  color: var(--text-3);
}

.hero__hint {
  position: absolute;
  left: 50%;
  bottom: 2rem;
  margin-left: -11px;
  color: var(--text-3);
  transition: color 0.4s var(--ease);
  animation:
    hint-in 1.2s var(--ease) 3s backwards,
    hint-float 2.8s ease-in-out 4.2s infinite;
}

.hero__hint:hover {
  color: var(--text);
}

@keyframes hint-in {
  from {
    opacity: 0;
  }
}

@keyframes hint-float {
  50% {
    transform: translate3d(0, 6px, 0);
  }
}

@keyframes hero-out {
  to {
    opacity: 0;
    transform: translate3d(0, -40px, 0) scale(0.96);
  }
}

@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .hero__center {
      animation: hero-out linear both;
      animation-timeline: scroll(root);
      animation-range: 0 80vh;
    }
  }
}
</style>
