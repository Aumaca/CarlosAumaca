<script setup>
import projects from '../utils/projects'
import ProjectItem from './ProjectItem.vue'

defineProps({
  getDescription: {
    type: Function
  }
})
</script>

<template>
  <section id="projects" class="mt-10 px-5 sm:px-28 md:px-16 xl:px-28">
    <div class="pb-5 ps-5">
      <h2 class="text-4xl text-left font-bold gradient-text title-slide">{{ $t('projects') }}</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
      <!-- Project -->
      <template v-for="(project, index) in projects" :key="index">
        <ProjectItem :project="project" :index="index" :getDescription="getDescription" />
      </template>
    </div>
  </section>
</template>
