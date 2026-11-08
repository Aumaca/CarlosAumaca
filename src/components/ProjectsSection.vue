<script setup>
import projects from '@/utils/projects'
import ProjectItem from './ProjectItem.vue'

defineProps({
  getDescription: {
    type: Function
  }
})

// An odd number of two-column cards would leave the last one alone in its row.
const twoColumnCount = projects.filter((project) => !project.featured).length
const isLoneLastCard = (index) => twoColumnCount % 2 === 1 && index === projects.length - 1
</script>

<template>
  <section id="projects" class="section">
    <div class="wrap">
      <h2 v-reveal class="headline projects__title">{{ $t('projects') }}{{ $t('period') }}</h2>

      <div class="projects__grid">
        <ProjectItem
          v-for="(project, index) in projects"
          :key="project.name"
          :project="project"
          :index="index"
          :featured="project.featured"
          :wide="isLoneLastCard(index)"
          :getDescription="getDescription"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects__title {
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 760px) {
  .projects__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
