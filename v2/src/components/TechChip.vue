<script setup>
import { computed } from 'vue'
import { tech } from '@v2/utils/tech'

const props = defineProps({
  slug: String
})

const item = computed(() => tech(props.slug))
</script>

<template>
  <span class="chip" :style="{ '--brand': item.color }">
    <img
      class="chip__logo"
      :class="{ 'chip__logo--mono': item.mono }"
      :src="item.icon"
      alt=""
      width="14"
      height="14"
    />
    {{ item.name }}
  </span>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 1.625rem;
  padding: 0 0.5625rem 0 0.4375rem;
  border-radius: 8px;
  font-family: var(--mono);
  font-size: var(--fs-2xs);
  font-weight: 500;
  white-space: nowrap;
  color: #c6cedc;
  background: rgba(255, 255, 255, 0.035);
  box-shadow: inset 0 0 0 1px var(--line);
  transition:
    color 0.3s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.chip:hover {
  color: #fff;
  background: color-mix(in srgb, var(--brand) 12%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--brand) 50%, transparent);
}

.chip__logo {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.chip__logo--mono {
  filter: brightness(0) invert(0.88);
}
</style>
