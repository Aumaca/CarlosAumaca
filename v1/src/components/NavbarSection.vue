<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  messages: Object
})

const isScrolled = ref(false)
const lastScrollY = ref(0)
const isHidden = ref(false)
const isAboutMeInView = ref(false)
const isProjectsInView = ref(false)
const isKnowledgeInView = ref(false)

const handleScroll = () => {
  const scrollY = window.scrollY
  isScrolled.value = scrollY > window.innerHeight

  isHidden.value = scrollY > lastScrollY.value
  lastScrollY.value = scrollY
}

const scrollToAboutMe = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const scrollToProjects = () => {
  const projectsSection = document.querySelector('#projects')
  window.scrollTo({
    top: projectsSection.offsetTop,
    behavior: 'smooth'
  })
}

const scrollToKnowledge = () => {
  const knowledgeSection = document.querySelector('#knowledge')
  window.scrollTo({
    top: knowledgeSection.offsetTop,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  const aboutMeSection = document.querySelector('#about-me')
  const projectsSection = document.querySelector('#projects')
  const knowledgeSection = document.querySelector('#knowledge')

  const observerConfig = { threshold: 0.5 }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (isAboutMeInView.value || isKnowledgeInView.value) isProjectsInView.value = false
      if (entry.target.id === 'about-me') isAboutMeInView.value = entry.isIntersecting
      if (entry.target.id === 'projects') isProjectsInView.value = entry.isIntersecting
      if (entry.target.id === 'knowledge') isKnowledgeInView.value = entry.isIntersecting
    })
  }, observerConfig)

  observer.observe(aboutMeSection)
  observer.observe(projectsSection)
  observer.observe(knowledgeSection)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    :class="[
      'fixed flex items-center justify-center top-0 z-20 left-1/2 transform -translate-x-1/2 navbar-slide-down',
      {
        invisible: isHidden
      }
    ]"
  >
    <ul
      :class="[
        'rounded-full p-3 text-white uppercase font-bold flex justify-end gap-4 text-sm transition-all duration-500 mt-5',
        {
          'bg-black bg-opacity-80': isScrolled,
          'bg-transparent': !isScrolled,
          'translate-y-[-200%]': isHidden
        }
      ]"
    >
      <li
        @click.prevent="scrollToAboutMe"
        :class="['cursor-pointer text-nowrap', { 'gradient-animate': isAboutMeInView }]"
      >
        {{ $t('aboutMe') }}
      </li>
      <li
        @click.prevent="scrollToProjects"
        :class="['cursor-pointer text-nowrap', { 'gradient-animate': isProjectsInView }]"
      >
        {{ $t('projects') }}
      </li>
      <li
        @click.prevent="scrollToKnowledge"
        :class="['cursor-pointer text-nowrap', { 'gradient-animate': isKnowledgeInView }]"
      >
        {{ $t('knowledge') }}
      </li>
    </ul>
  </nav>
</template>
