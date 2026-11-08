<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { History } from 'lucide-vue-next'
import LanguageSwitch from './LanguageSwitch.vue'

const props = defineProps({
  currentLanguage: String,
  changeLanguage: {
    type: Function
  }
})

const links = [
  { id: 'about-me', label: 'aboutMe' },
  { id: 'projects', label: 'projects' },
  { id: 'knowledge', label: 'knowledge' }
]

const oldVersionUrl = `${import.meta.env.BASE_URL}v1/`

const isHidden = ref(false)
const isScrolled = ref(false)
const activeSection = ref('about-me')
const indicator = reactive({ x: 0, width: 0, visible: false })
const linkElements = {}

let lastScrollY = 0
let scrollFrame = 0
let sectionObserver = null

const placeIndicator = () => {
  const element = linkElements[activeSection.value]
  indicator.visible = Boolean(element)
  if (!element) return
  indicator.x = element.offsetLeft
  indicator.width = element.offsetWidth
}

const readScroll = () => {
  scrollFrame = 0
  const scrollY = window.scrollY
  const delta = scrollY - lastScrollY

  isScrolled.value = scrollY > 24
  if (scrollY < 120 || delta < -6) isHidden.value = false
  else if (delta > 6) isHidden.value = true

  if (Math.abs(delta) > 6) lastScrollY = scrollY
}

const handleScroll = () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(readScroll)
}

watch([activeSection, () => props.currentLanguage], () => nextTick(placeIndicator))

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', placeIndicator)
  document.fonts?.ready.then(placeIndicator)
  placeIndicator()

  // A section is active while it crosses the middle of the screen.
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      })
    },
    { rootMargin: '-50% 0px -50% 0px' }
  )

  document
    .querySelectorAll('#about-me, #projects, #knowledge, #contact')
    .forEach((section) => sectionObserver.observe(section))
})

onBeforeUnmount(() => {
  cancelAnimationFrame(scrollFrame)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', placeIndicator)
  sectionObserver?.disconnect()
})
</script>

<template>
  <header class="nav" :class="{ 'is-hidden': isHidden, 'is-scrolled': isScrolled }">
    <div class="nav__shell">
      <nav class="nav__links" :aria-label="$t('sectionsLabel')">
        <span
          class="nav__indicator"
          :style="{
            transform: `translateX(${indicator.x}px)`,
            width: `${indicator.width}px`,
            opacity: indicator.visible ? 1 : 0
          }"
        ></span>
        <a
          v-for="link in links"
          :key="link.id"
          :ref="(element) => (linkElements[link.id] = element)"
          :href="`#${link.id}`"
          class="nav__link"
          :class="{ 'is-active': activeSection === link.id }"
          :aria-current="activeSection === link.id ? 'true' : undefined"
        >
          {{ $t(link.label) }}
        </a>
      </nav>

      <span class="nav__divider" aria-hidden="true"></span>

      <div class="nav__tools">
        <LanguageSwitch :currentLanguage="currentLanguage" :changeLanguage="changeLanguage" />
        <a class="nav__old" :href="oldVersionUrl">
          <History :size="14" aria-hidden="true" />
          {{ $t('oldVersion') }}
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  z-index: 30;
  pointer-events: none;
}

.nav__shell {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: fit-content;
  margin-inline: auto;
  padding: 0.3125rem 0.4375rem 0.3125rem 0.3125rem;
  border-radius: 999px;
  background: rgba(12, 14, 20, 0.45);
  box-shadow:
    inset 0 0 0 1px var(--line),
    0 12px 40px -18px rgba(0, 0, 0, 0.9);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  backdrop-filter: blur(14px) saturate(140%);
  transition:
    transform 0.7s var(--ease),
    opacity 0.45s ease,
    background-color 0.5s ease;
  animation: nav-in 1.1s var(--ease) 0.15s backwards;
}

.is-scrolled .nav__shell {
  background: rgba(12, 14, 20, 0.78);
}

.is-hidden .nav__shell {
  transform: translate3d(0, calc(-100% - 1.5rem), 0);
  opacity: 0;
}

.nav__links {
  position: relative;
  display: flex;
}

.nav__indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 -1px 0 rgba(132, 250, 176, 0.55);
  transition:
    transform 0.6s var(--ease),
    width 0.6s var(--ease),
    opacity 0.3s ease;
}

.nav__link {
  position: relative;
  padding: 0.4375rem 0.875rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.3;
  white-space: nowrap;
  color: var(--text-2);
  transition: color 0.3s ease;
}

.nav__link:hover,
.nav__link.is-active {
  color: var(--text);
}

.nav__divider {
  width: 1px;
  height: 1.125rem;
  background: var(--line-strong);
}

.nav__tools {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav__old {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 1.875rem;
  padding: 0 0.75rem;
  border-radius: 999px;
  font-family: var(--mono);
  font-size: var(--fs-2xs);
  font-weight: 500;
  white-space: nowrap;
  color: var(--text-2);
  box-shadow: inset 0 0 0 1px var(--line);
  transition:
    color 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}

.nav__old:hover {
  color: var(--mint);
  background: rgba(132, 250, 176, 0.06);
  box-shadow: inset 0 0 0 1px rgba(132, 250, 176, 0.4);
}

@keyframes nav-in {
  from {
    transform: translate3d(0, -130%, 0);
    opacity: 0;
  }
}

/* Phones and small tablets: tools on top, section links in a bottom dock */
@media (max-width: 760px) {
  .nav {
    top: 0.75rem;
  }

  .nav__shell {
    width: auto;
    padding: 0;
    background: none;
    box-shadow: none;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    transition: none;
    animation: none;
  }

  .is-scrolled .nav__shell {
    background: none;
  }

  .is-hidden .nav__shell {
    transform: none;
    opacity: 1;
  }

  .nav__divider {
    display: none;
  }

  .nav__tools {
    pointer-events: auto;
    width: 100%;
    justify-content: space-between;
    padding: 0 0.75rem;
    transition:
      transform 0.7s var(--ease),
      opacity 0.45s ease;
    animation: nav-in 1.1s var(--ease) 0.15s backwards;
  }

  .is-hidden .nav__tools {
    transform: translate3d(0, -150%, 0);
    opacity: 0;
  }

  .nav__tools :deep(.lang),
  .nav__old {
    border-radius: 999px;
    background: rgba(12, 14, 20, 0.72);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
  }

  .nav__tools :deep(.lang) {
    padding: 0.1875rem 0.1875rem 0.1875rem 0.5rem;
    box-shadow: inset 0 0 0 1px var(--line);
  }

  .nav__old {
    height: 2.125rem;
  }

  .nav__links {
    position: fixed;
    left: 50%;
    bottom: calc(0.875rem + env(safe-area-inset-bottom));
    padding: 0.25rem;
    border-radius: 999px;
    background: rgba(12, 14, 20, 0.82);
    box-shadow:
      inset 0 0 0 1px var(--line-strong),
      0 16px 40px -14px #000;
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    backdrop-filter: blur(16px) saturate(140%);
    transform: translateX(-50%);
    animation: dock-in 1.1s var(--ease) 0.3s backwards;
  }

  .nav__indicator {
    top: 0.25rem;
    bottom: 0.25rem;
  }
}

@keyframes dock-in {
  from {
    transform: translate3d(-50%, 170%, 0);
    opacity: 0;
  }
}
</style>
