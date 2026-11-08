<script setup>
import projects from '@v2/utils/projects'
import ProjectItem from './ProjectItem.vue'
import SectionHeading from './SectionHeading.vue'

defineProps({
  getDescription: {
    type: Function
  }
})
</script>

<template>
  <section id="projects" class="section">
    <div class="wrap">
      <SectionHeading index="01" :title="$t('projects')" />

      <div class="projects-grid">
        <ProjectItem
          v-for="(project, index) in projects"
          :key="project.name"
          :project="project"
          :index="index"
          :getDescription="getDescription"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.125rem;
}

@media (max-width: 1080px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .projects-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
