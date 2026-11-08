<script setup>
defineProps({
  index: String,
  title: String
})
</script>

<template>
  <header v-reveal class="heading">
    <span class="heading__index" aria-hidden="true">{{ index }}</span>
    <h2 class="heading__title gradient-text">{{ title }}</h2>
    <span class="heading__rule" aria-hidden="true"></span>
  </header>
</template>

<style scoped>
.heading {
  display: flex;
  align-items: baseline;
  gap: 0.875rem;
  margin-bottom: clamp(1.75rem, 3.5vw, 3rem);
}

.heading__index {
  font-family: var(--mono);
  font-size: var(--fs-xs);
  font-weight: 500;
  color: var(--text-3);
}

.heading__title {
  font-size: var(--fs-h2);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.heading__rule {
  flex: 1;
  align-self: center;
  height: 1px;
  background: linear-gradient(90deg, var(--line-strong), transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.6s var(--ease) 0.2s;
}

.heading.is-visible .heading__rule {
  transform: none;
}
</style>
