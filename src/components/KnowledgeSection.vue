<script setup>
import { categories } from '@/utils/knowledge'
import { tech } from '@/utils/tech'
import CircuitPatch from './CircuitPatch.vue'
</script>

<template>
  <section id="knowledge" class="section knowledge">
    <CircuitPatch class="knowledge__patch" />

    <div class="wrap">
      <h2 v-reveal class="headline knowledge__title">{{ $t('knowledge') }}{{ $t('period') }}</h2>

      <div class="specs">
        <div v-for="category in categories" :key="category.key" v-reveal class="spec">
          <h3 class="spec__name">{{ $t(category.key) }}</h3>

          <ul class="spec__items">
            <li v-for="slug in category.items" :key="slug" class="item">
              <img
                class="item__logo"
                :class="{ 'item__logo--mono': tech(slug).mono }"
                :src="tech(slug).icon"
                alt=""
                width="36"
                height="36"
                loading="lazy"
              />
              <span class="item__name">{{ tech(slug).name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.knowledge {
  overflow: hidden;
}

.knowledge__patch {
  top: -8%;
  right: -22%;
  width: min(1100px, 130vw);
  height: 760px;
}

.knowledge .wrap {
  position: relative;
}

.knowledge__title {
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.spec {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
  gap: 1.5rem clamp(1.5rem, 4vw, 3rem);
  padding-block: clamp(1.75rem, 3.5vw, 2.75rem);
  border-top: 1px solid var(--line);
}

.spec__name {
  font-size: 1.3125rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.spec__items {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 2rem 0.75rem;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}

.item__logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: grayscale(1) brightness(1.2);
  opacity: 0.75;
  transition:
    filter 0.6s var(--ease),
    opacity 0.6s var(--ease),
    transform 0.8s var(--ease-out);
}

.item__logo--mono {
  filter: brightness(0) invert(0.9);
}

.item__name {
  font-size: var(--fs-caption);
  letter-spacing: 0;
  color: var(--text-2);
  transition: color 0.5s var(--ease);
}

@media (hover: hover) {
  .item:hover .item__logo {
    opacity: 1;
    transform: translate3d(0, -3px, 0);
  }

  .item:hover .item__logo:not(.item__logo--mono) {
    filter: none;
  }

  .item:hover .item__name {
    color: var(--text);
  }
}

@media (max-width: 760px) {
  .spec {
    grid-template-columns: minmax(0, 1fr);
  }

  .spec__items {
    gap: 1.5rem 0.5rem;
  }

  .item__logo {
    width: 30px;
    height: 30px;
  }

  .item__name {
    font-size: 0.6875rem;
    line-height: 1.25;
  }
}
</style>
