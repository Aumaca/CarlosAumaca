<script setup>
import { categories } from '@v2/utils/knowledge'
import { tech } from '@v2/utils/tech'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="knowledge" class="section">
    <div class="wrap">
      <SectionHeading index="02" :title="$t('knowledge')" />

      <div class="tiles">
        <article
          v-for="(category, categoryIndex) in categories"
          :key="category.key"
          v-reveal
          class="tile"
          :class="{ 'tile--wide': category.wide }"
          :style="{ '--i': categoryIndex, '--columns': category.columns ?? 5 }"
        >
          <header class="tile__head">
            <span class="tile__led" aria-hidden="true"></span>
            <h3 class="tile__name">{{ $t(category.key) }}</h3>
            <span class="tile__count">{{ category.items.length }}</span>
          </header>

          <ul class="tile__grid">
            <li
              v-for="slug in category.items"
              :key="slug"
              class="tech"
              :style="{ '--brand': tech(slug).color }"
            >
              <img
                class="tech__logo"
                :class="{ 'tech__logo--mono': tech(slug).mono }"
                :src="tech(slug).icon"
                alt=""
                width="32"
                height="32"
                loading="lazy"
              />
              <span class="tech__name">{{ tech(slug).name }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tiles {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.tile {
  position: relative;
  padding: 0.875rem;
  border-radius: var(--radius);
  background: linear-gradient(180deg, #0e1118 0%, var(--surface) 100%);
  box-shadow: inset 0 0 0 1px var(--line);
}

.tile--wide {
  grid-column: 1 / -1;
}

.tile__head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.125rem 0.25rem 0.75rem;
}

.tile__led {
  width: 6px;
  height: 6px;
  border-radius: 2px;
  background: #262b38;
  transition:
    background-color 0.4s ease,
    box-shadow 0.4s ease;
}

.tile:hover .tile__led {
  background: var(--mint);
  box-shadow: 0 0 10px rgba(132, 250, 176, 0.8);
}

.tile__name {
  font-size: var(--fs-sm);
  font-weight: 600;
  letter-spacing: -0.005em;
}

.tile__count {
  margin-left: auto;
  font-family: var(--mono);
  font-size: var(--fs-2xs);
  color: var(--text-3);
}

.tile__grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  gap: 6px;
}

.tech {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 6rem;
  padding: 0 0.125rem;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.02);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.045);
  transition:
    background-color 0.35s ease,
    box-shadow 0.35s ease,
    opacity 0.35s ease;
}

.tech__logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  transition: transform 0.6s var(--ease);
}

.tech__logo--mono {
  filter: brightness(0) invert(0.88);
}

.tech__name {
  font-size: var(--fs-2xs);
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
  color: var(--text-2);
  transition: color 0.3s ease;
}

@media (hover: hover) {
  .tech:hover {
    background: color-mix(in srgb, var(--brand) 12%, transparent);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--brand) 60%, transparent),
      0 8px 32px -12px color-mix(in srgb, var(--brand) 70%, transparent);
  }

  .tech:hover .tech__logo {
    transform: translate3d(0, -2px, 0) scale(1.08);
  }

  .tech:hover .tech__name {
    color: #fff;
  }

  .tiles:has(.tech:hover) .tech:not(:hover) {
    opacity: 0.55;
  }
}

@media (min-width: 1024px) {
  .tile--wide .tile__grid {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .tile:not(.tile--wide):nth-child(2),
  .tile:not(.tile--wide):nth-child(3) {
    grid-column: 1 / -1;
  }

  .tech {
    height: 5.25rem;
  }

  .tech__logo {
    width: 28px;
    height: 28px;
  }

  .tech__name {
    font-size: 0.625rem;
  }
}
</style>
