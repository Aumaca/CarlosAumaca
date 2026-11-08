<template>
  <CircuitBackdrop />

  <div class="page">
    <NavbarSection :currentLanguage="locale" :changeLanguage="changeLanguage" />

    <AboutMeSection :currentLanguage="locale" />
    <ProjectsSection :getDescription="getDescription" />
    <KnowledgeSection />
    <SignalDivider />
    <ContactSection />
    <FooterSection />
  </div>
</template>

<script setup>
import { nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { LOCALE_KEY } from '@v2/utils/i18n'
import CircuitBackdrop from './components/CircuitBackdrop.vue'
import NavbarSection from './components/NavbarSection.vue'
import AboutMeSection from './components/AboutMeSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import KnowledgeSection from './components/KnowledgeSection.vue'
import SignalDivider from './components/SignalDivider.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

const { locale } = useI18n()

const syncHtmlLang = () => {
  document.documentElement.lang = locale.value === 'pt' ? 'pt-BR' : 'en'
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
