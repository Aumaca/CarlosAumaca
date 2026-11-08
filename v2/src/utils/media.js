// Every screenshot is resized and converted to WebP at build time, with its size known up front.
const gallery = import.meta.glob('../assets/media/slider*/*.png', {
  eager: true,
  query: { h: '520', format: 'webp', quality: '74', withoutEnlargement: 'true', as: 'metadata' },
  import: 'default'
})

export const projectImage = (path) => gallery[`../assets/media/${path}`]
