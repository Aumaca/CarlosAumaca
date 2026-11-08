<script setup>
import { ArrowUp } from 'lucide-vue-next'
import SocialLinks from './SocialLinks.vue'

const links = [
  { id: 'about-me', label: 'aboutMe' },
  { id: 'projects', label: 'projects' },
  { id: 'knowledge', label: 'knowledge' },
  { id: 'contact', label: 'contact' }
]

const oldVersionUrl = `${import.meta.env.BASE_URL}v1/`
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer__main">
        <a class="footer__brand" href="#about-me">
          <span class="footer__led" aria-hidden="true"></span>
          Carlos Aumaca
        </a>

        <nav class="footer__nav" :aria-label="$t('sectionsLabel')">
          <a v-for="link in links" :key="link.id" :href="`#${link.id}`">{{ $t(link.label) }}</a>
        </nav>

        <SocialLinks compact class="footer__social" />
      </div>

      <div class="footer__legal">
        <p>&copy; {{ year }} &middot; {{ $t('developedBy') }}</p>
        <div class="footer__meta">
          <span>{{ $t('builtWith') }}</span>
          <a :href="oldVersionUrl">{{ $t('oldVersion') }}</a>
          <a class="footer__top" href="#about-me">
            {{ $t('backToTop') }}
            <ArrowUp :size="13" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  background: rgba(9, 10, 15, 0.82);
}

.footer::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(132, 250, 176, 0.5),
    rgba(143, 211, 244, 0.5),
    transparent
  );
}

.footer__main {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.5rem;
  padding-block: 1.75rem;
}

.footer__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  width: fit-content;
  font-size: var(--fs-body);
  font-weight: 600;
  letter-spacing: -0.01em;
}

.footer__led {
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: var(--grad);
  box-shadow: 0 0 12px rgba(132, 250, 176, 0.7);
}

.footer__nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem 1.5rem;
}

.footer__nav a,
.footer__meta a {
  color: var(--text-2);
  transition: color 0.3s ease;
}

.footer__nav a {
  font-size: var(--fs-sm);
}

.footer__nav a:hover,
.footer__meta a:hover {
  color: var(--mint);
}

.footer__social {
  justify-self: end;
}

.footer__legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  padding-block: 1rem;
  border-top: 1px solid var(--line);
  font-family: var(--mono);
  font-size: var(--fs-2xs);
  color: var(--text-3);
}

.footer__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.25rem;
}

.footer__top {
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;
}

.footer__top svg {
  transition: transform 0.5s var(--ease);
}

.footer__top:hover svg {
  transform: translate3d(0, -3px, 0);
}

@media (max-width: 760px) {
  .footer {
    padding-bottom: 4.75rem;
  }

  .footer__main {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }

  .footer__social {
    justify-self: center;
  }

  .footer__legal,
  .footer__meta {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
}
</style>
