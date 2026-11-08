<script setup>
import { socials } from '@v2/utils/socials'

defineProps({
  compact: Boolean
})
</script>

<template>
  <ul class="social" :class="{ 'social--compact': compact }">
    <li v-for="(social, index) in socials" :key="social.name" :style="{ '--n': index }">
      <a
        class="social__link"
        :href="social.url"
        target="_blank"
        rel="noopener"
        :aria-label="social.name"
        :title="social.name"
        :style="{ '--brand': social.color }"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-if="social.svg" class="social__icon" v-html="social.svg"></span>
        <img v-else class="social__icon" :src="social.image" alt="" />
      </a>
    </li>
  </ul>
</template>

<style scoped>
.social {
  display: flex;
  gap: 0.625rem;
}

.social__link {
  display: grid;
  place-items: center;
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 14px;
  color: var(--text-2);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 0 0 1px var(--line);
  transition:
    color 0.35s ease,
    background-color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.6s var(--ease);
}

.social__icon {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
}

.social__icon :deep(svg) {
  width: 100%;
  height: 100%;
}

img.social__icon {
  object-fit: contain;
  opacity: 0.8;
  transition: opacity 0.35s ease;
}

.social__link:hover {
  color: var(--brand);
  background: color-mix(in srgb, var(--brand) 9%, transparent);
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--brand) 45%, transparent),
    0 10px 28px -12px color-mix(in srgb, var(--brand) 60%, transparent);
  transform: translate3d(0, -3px, 0);
}

.social__link:hover img.social__icon {
  opacity: 1;
}

.social--compact {
  gap: 0.375rem;
}

.social--compact .social__link {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 10px;
}

.social--compact .social__icon {
  width: 1rem;
  height: 1rem;
}
</style>
