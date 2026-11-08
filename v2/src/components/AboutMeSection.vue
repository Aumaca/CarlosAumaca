<script setup>
import { onMounted, watch } from 'vue'
import { ChevronsDown } from 'lucide-vue-next'

import portrait from '../assets/media/eu.jpg?w=640&format=webp&quality=84'
import { useTypewriter } from '@v2/composables/useTypewriter'
import SocialLinks from './SocialLinks.vue'

const props = defineProps({
  currentLanguage: String
})

const typewriter = {
  en: [
    'Hello! I am Carlos.',
    'I am a Developer...',
    'I like challenges :)',
    'I love to see work done! \\O/'
  ],
  pt: [
    'Olá! Eu sou Carlos.',
    'Sou um desenvolvedor...',
    'Eu gosto de desafios :)',
    'Eu amo ver o trabalho feito! \\O/'
  ]
}

const { text, start } = useTypewriter()

onMounted(() => start(typewriter[props.currentLanguage]))

watch(
  () => props.currentLanguage,
  (language) => start(typewriter[language], 300)
)
</script>

<template>
  <main id="about-me" class="hero">
    <div class="hero__center">
      <h1 class="hero__title gradient-text">{{ $t('welcome') }}</h1>

      <div class="hero__photo">
        <span class="hero__frame">
          <img :src="portrait" width="640" height="1074" alt="Carlos Aumaca" />
        </span>
        <span class="hero__bracket" aria-hidden="true"></span>
        <span class="hero__slash" aria-hidden="true"></span>
      </div>

      <p class="hero__typer" :aria-label="typewriter[currentLanguage].join(' ')">
        <span aria-hidden="true">{{ text }}</span
        ><span class="hero__caret" aria-hidden="true"></span>
      </p>
    </div>

    <SocialLinks class="hero__social" />

    <a class="hero__arrow" href="#projects" :aria-label="$t('scrollToProjects')">
      <ChevronsDown :size="20" aria-hidden="true" />
    </a>
  </main>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  min-height: 100svh;
  padding: 5.5rem var(--gutter) 2.5rem;
}

.hero__center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(1.25rem, 3.4vh, 2.5rem);
  text-align: center;
}

.hero__title {
  font-size: var(--fs-hero);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.035em;
  animation: rise 1.3s var(--ease) 0.2s backwards;
}

.hero__photo {
  position: relative;
  width: clamp(10rem, 28vh, 15rem);
  aspect-ratio: 4 / 5;
  --cut: 34px;
}

.hero__photo::before {
  content: '';
  position: absolute;
  inset: -28%;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(37, 91, 255, 0.38), transparent);
  filter: blur(12px);
}

/* Square corners, except the bottom right, which is cut at 45 degrees */
.hero__frame {
  position: absolute;
  inset: 0;
  padding: 2px;
  background: linear-gradient(145deg, var(--mint), var(--sky) 50%, rgba(143, 211, 244, 0.3));
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - var(--cut)),
    calc(100% - var(--cut)) 100%,
    0 100%
  );
}

.hero__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 17%;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - var(--cut) + 1px),
    calc(100% - var(--cut) + 1px) 100%,
    0 100%
  );
}

.hero__bracket {
  position: absolute;
  top: -8px;
  left: -8px;
  width: 26px;
  height: 26px;
  border-top: 2px solid var(--mint);
  border-left: 2px solid var(--mint);
}

/* Accent running parallel to the cut corner */
.hero__slash {
  position: absolute;
  right: -5px;
  bottom: 10px;
  width: 34px;
  height: 2px;
  background: var(--sky);
  box-shadow: 0 0 10px rgba(143, 211, 244, 0.7);
  transform: rotate(-45deg);
}

.hero__typer {
  min-height: 1.6em;
  font-family: var(--mono);
  font-size: var(--fs-lead);
  font-weight: 400;
  color: var(--text-2);
  animation: rise 1.3s var(--ease) 0.6s backwards;
}

.hero__caret {
  display: inline-block;
  width: 0.55em;
  height: 1.1em;
  margin-left: 0.15em;
  vertical-align: -0.2em;
  border-radius: 1px;
  background: var(--mint);
  box-shadow: 0 0 12px rgba(132, 250, 176, 0.6);
  animation: caret 1.1s ease-in-out infinite;
}

.hero__social {
  margin-top: 1.75rem;
  animation: rise 1.3s var(--ease) 0.8s backwards;
}

.hero__arrow {
  position: absolute;
  right: var(--gutter);
  bottom: 2.75rem;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  color: var(--text-2);
  box-shadow: inset 0 0 0 1px var(--line);
  transition:
    color 0.3s ease,
    box-shadow 0.3s ease;
  animation:
    rise 1.3s var(--ease) 1s backwards,
    float 3.2s ease-in-out 2.3s infinite;
}

.hero__arrow:hover {
  color: var(--mint);
  box-shadow: inset 0 0 0 1px rgba(132, 250, 176, 0.45);
}

@keyframes caret {
  0%,
  45% {
    opacity: 1;
  }
  60%,
  90% {
    opacity: 0.08;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hero-out {
  to {
    opacity: 0;
    transform: translate3d(0, -60px, 0) scale(0.97);
  }
}

@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .hero__center {
      animation: hero-out linear both;
      animation-timeline: scroll(root);
      animation-range: 0 85vh;
    }
  }
}

@media (max-width: 760px) {
  .hero {
    padding-top: 4.5rem;
    padding-bottom: 6rem;
  }

  .hero__arrow {
    display: none;
  }

  .hero__social {
    gap: 0.5rem;
  }
}
</style>
