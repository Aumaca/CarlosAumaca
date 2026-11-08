<template>
  <NavbarSection :currentLanguage="locale" :changeLanguage="changeLanguage" />

  <HeroSection :currentLanguage="locale" />
  <AboutMeSection :currentLanguage="locale" />
  <ProjectsSection :getDescription="getDescription" />
  <KnowledgeSection />
  <ContactSection />
  <FooterSection />
</template>

<script setup>
import { nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { LOCALE_KEY, LOCALES } from '@/utils/i18n'
import NavbarSection from './components/NavbarSection.vue'
import HeroSection from './components/HeroSection.vue'
import AboutMeSection from './components/AboutMeSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import KnowledgeSection from './components/KnowledgeSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

const { locale } = useI18n()

const syncHtmlLang = () => {
  document.documentElement.lang = LOCALES.find(({ code }) => code === locale.value).htmlLang
}

const changeLanguage = (lang) => {
  if (lang === locale.value) return

  const apply = async () => {
    locale.value = lang
    syncHtmlLang()
    try {
      localStorage.setItem(LOCALE_KEY, lang)
    } catch {
      // Storage blocked: the choice lasts for this visit only.
    }
    await nextTick()
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (document.startViewTransition && !reduced) document.startViewTransition(apply)
  else apply()
}

const getDescription = (description) => {
  return description[locale.value] || description.en // Fallback to English if the locale isn't found
}

onMounted(syncHtmlLang)
</script>
