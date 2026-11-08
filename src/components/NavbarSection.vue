<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import LanguageSwitch from './LanguageSwitch.vue'

defineProps({
  currentLanguage: String,
  changeLanguage: {
    type: Function
  }
})

const links = [
  { id: 'about-me', label: 'aboutMe' },
  { id: 'projects', label: 'projects' },
  { id: 'knowledge', label: 'knowledge' },
  { id: 'contact', label: 'contact' }
]

const versions = [
  { path: 'v1/', label: 'oldVersion' },
  { path: 'v2/', label: 'version2' }
]
const versionUrl = (path) => `${import.meta.env.BASE_URL}${path}`

const isScrolled = ref(false)
const activeSection = ref('')
const isMenuOpen = ref(false)
const isVersionsOpen = ref(false)
const versionsElement = ref(null)

let scrollFrame = 0
let sectionObserver = null

const readScroll = () => {
  scrollFrame = 0
  isScrolled.value = window.scrollY > 12
}

const handleScroll = () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(readScroll)
}

const closeOnOutsideClick = (event) => {
  if (!versionsElement.value?.contains(event.target)) isVersionsOpen.value = false
}

const closeOnEscape = (event) => {
  if (event.key !== 'Escape') return
  isMenuOpen.value = false
  isVersionsOpen.value = false
}

watch(isMenuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', closeOnOutsideClick)
  document.addEventListener('keydown', closeOnEscape)

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      })
    },
    { rootMargin: '-50% 0px -50% 0px' }
  )

  document
    .querySelectorAll('#top, #about-me, #projects, #knowledge, #contact')
    .forEach((section) => sectionObserver.observe(section))
})

onBeforeUnmount(() => {
  cancelAnimationFrame(scrollFrame)
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closeOnOutsideClick)
  document.removeEventListener('keydown', closeOnEscape)
  document.documentElement.style.overflow = ''
  sectionObserver?.disconnect()
})
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': isScrolled || isMenuOpen }">
    <div class="nav__bar">
      <div class="nav__inner">
        <a class="nav__brand" href="#top" @click="isMenuOpen = false">Carlos Aumaca</a>

        <nav class="nav__links" :aria-label="$t('sectionsLabel')">
          <a
            v-for="link in links"
            :key="link.id"
            :href="`#${link.id}`"
            class="nav__link"
            :class="{ 'is-active': activeSection === link.id }"
            :aria-current="activeSection === link.id ? 'true' : undefined"
          >
            {{ $t(link.label) }}
          </a>
        </nav>

        <div class="nav__tools">
          <LanguageSwitch :currentLanguage="currentLanguage" :changeLanguage="changeLanguage" />

          <div ref="versionsElement" class="nav__versions">
            <button
              type="button"
              class="nav__link nav__versions-button"
              :aria-expanded="isVersionsOpen"
              @click="isVersionsOpen = !isVersionsOpen"
            >
              {{ $t('oldVersions') }}
              <ChevronDown
                class="nav__chevron"
                :class="{ 'is-open': isVersionsOpen }"
                :size="13"
                aria-hidden="true"
              />
            </button>

            <Transition name="pop">
              <div v-if="isVersionsOpen" class="popover nav__popover">
                <a v-for="version in versions" :key="version.path" :href="versionUrl(version.path)">
                  {{ $t(version.label) }}
                </a>
              </div>
            </Transition>
          </div>

          <button
            type="button"
            class="nav__burger"
            :class="{ 'is-open': isMenuOpen }"
            :aria-label="$t('menu')"
            :aria-expanded="isMenuOpen"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>

    <Transition name="sheet">
      <div v-if="isMenuOpen" class="sheet">
        <nav class="sheet__links" :aria-label="$t('sectionsLabel')">
          <a
            v-for="(link, index) in links"
            :key="link.id"
            :href="`#${link.id}`"
            :style="{ '--n': index }"
            @click="isMenuOpen = false"
          >
            {{ $t(link.label) }}
          </a>
        </nav>

        <div class="sheet__versions">
          <a
            v-for="(version, index) in versions"
            :key="version.path"
            :href="versionUrl(version.path)"
            :style="{ '--n': index + links.length }"
          >
            {{ $t(version.label) }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 30;
}

.nav__bar {
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0);
  border-bottom: 1px solid transparent;
  transition:
    background-color 0.6s var(--ease),
    border-color 0.6s var(--ease);
}

/* Blur lives on a separate layer so the bar's own background can fade smoothly */
.nav__bar::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  opacity: 0;
  transition: opacity 0.6s var(--ease);
}

.is-scrolled .nav__bar {
  background: rgba(0, 0, 0, 0.72);
  border-bottom-color: var(--line);
}

.is-scrolled .nav__bar::before {
  opacity: 1;
}

.nav__inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: min(var(--max), 100% - var(--gutter) * 2);
  height: var(--nav-height);
  margin-inline: auto;
  font-size: var(--fs-caption);
  animation: nav-in 1.2s var(--ease) 0.1s backwards;
}

.nav__brand {
  width: fit-content;
  font-size: var(--fs-small);
  font-weight: 600;
  letter-spacing: -0.015em;
}

.nav__links {
  display: flex;
  gap: 2rem;
}

.nav__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--text-2);
  white-space: nowrap;
  transition: color 0.4s var(--ease);
}

.nav__link:hover,
.nav__link.is-active {
  color: var(--text);
}

.nav__tools {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.nav__versions {
  position: relative;
}

.nav__versions-button {
  font-size: var(--fs-caption);
}

.nav__chevron {
  transition: transform 0.5s var(--ease-out);
}

.nav__chevron.is-open {
  transform: rotate(180deg);
}

.nav__popover {
  right: 0;
  min-width: 11rem;
}

.nav__popover a {
  padding: 0.5rem 0.625rem;
  border-radius: 9px;
  color: var(--text);
  white-space: nowrap;
  transition: background-color 0.3s var(--ease);
}

.nav__popover a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav__burger {
  display: none;
  position: relative;
  width: 2rem;
  height: 2rem;
  margin-right: -0.375rem;
}

.nav__burger span {
  position: absolute;
  left: 7px;
  right: 7px;
  top: 50%;
  height: 1.5px;
  margin-top: -0.75px;
  border-radius: 1px;
  background: var(--text);
  transition: transform 0.55s var(--ease-out);
}

.nav__burger span:first-child {
  transform: translate3d(0, -3.5px, 0);
}

.nav__burger span:last-child {
  transform: translate3d(0, 3.5px, 0);
}

.nav__burger.is-open span:first-child {
  transform: rotate(45deg);
}

.nav__burger.is-open span:last-child {
  transform: rotate(-45deg);
}

/* Full-screen menu on small screens */
.sheet {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: calc(var(--nav-height) + 1.5rem) var(--gutter) 2rem;
  background: #000;
}

.sheet__links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sheet__links a {
  font-size: 1.875rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.sheet__versions {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  color: var(--text-3);
  font-size: var(--fs-small);
}

.sheet a {
  animation: fade-up 0.8s var(--ease-out) calc(var(--n) * 45ms + 60ms) backwards;
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.4s var(--ease);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

@keyframes nav-in {
  from {
    opacity: 0;
  }
}

@media (max-width: 860px) {
  .nav__inner {
    grid-template-columns: 1fr auto;
  }

  .nav__links,
  .nav__versions {
    display: none;
  }

  .nav__burger {
    display: block;
  }
}
</style>
