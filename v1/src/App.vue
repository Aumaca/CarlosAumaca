<template>
  <div id="app" class="background">
    <!-- Navbar -->
    <NavbarSection />

    <div class="h-screen flex flex-col">
      <!-- Flags -->
      <FlagsItem :currentLanguage="currentLocale" :changeLanguage="changeLanguage" />

      <!-- Main -->
      <AboutMeSection :circles="circles" :currentLanguage="currentLocale" />
    </div>

    <!-- Projects -->
    <ProjectsSection :getDescription="getDescription" />

    <!-- Knowledge -->
    <KnowledgeSection />

    <!-- Contact -->
    <ContactSection />

    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

import FlagsItem from './components/FlagsItem.vue'
import NavbarSection from './components/NavbarSection.vue'
import AboutMeSection from './components/AboutMeSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import KnowledgeSection from './components/KnowledgeSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

const circles = Array.from({ length: 36 })

const { locale } = useI18n()

const currentLocale = ref(locale.value)

const changeLanguage = (lang) => {
  currentLocale.value = lang
  locale.value = currentLocale.value
}

const getDescription = (description) => {
  return description[locale.value] || description.en // Fallback to English if the locale isn't found
}
</script>
