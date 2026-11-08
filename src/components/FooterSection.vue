<script setup>
const links = [
  { id: 'about-me', label: 'aboutMe' },
  { id: 'projects', label: 'projects' },
  { id: 'knowledge', label: 'knowledge' },
  { id: 'contact', label: 'contact' }
]

const base = import.meta.env.BASE_URL
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap footer__inner">
      <p>
        &copy; {{ year }} Carlos Aumaca{{ $t('period') }} {{ $t('developedBy') }}{{ $t('period') }}
      </p>

      <nav class="footer__links" :aria-label="$t('sectionsLabel')">
        <a v-for="link in links" :key="link.id" :href="`#${link.id}`">{{ $t(link.label) }}</a>
        <a :href="`${base}v1/`">{{ $t('oldVersion') }}</a>
        <a :href="`${base}v2/`">{{ $t('version2') }}</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: 1.25rem;
  font-size: var(--fs-caption);
  letter-spacing: 0;
  color: var(--text-3);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 1.25rem;
}

.footer__links a {
  color: var(--text-2);
  transition: color 0.4s var(--ease);
}

.footer__links a:hover {
  color: var(--text);
}
</style>
