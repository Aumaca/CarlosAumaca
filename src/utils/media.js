import mynikkiVideo from '../assets/media/slider2/mynikki_web.mp4'
import mynikkiPoster from '../assets/media/slider2/mynikki_poster.webp'
import psicoajudaVideo from '../assets/media/psicoajuda/psicoajuda_web.mp4'
import psicoajudaPoster from '../assets/media/psicoajuda/psicoajuda_poster.webp'

// Every screenshot is resized and converted to WebP at build time, with its size known up front.
const gallery = import.meta.glob('../assets/media/{slider*,marium}/*.png', {
  eager: true,
  query: { h: '640', format: 'webp', quality: '76', withoutEnlargement: 'true', as: 'metadata' },
  import: 'default'
})

const videos = {
  mynikki: { src: mynikkiVideo, poster: mynikkiPoster, width: 540, height: 1200 },
  psicoajuda: { src: psicoajudaVideo, poster: psicoajudaPoster, width: 1280, height: 720 }
}

export const projectImage = (path) => gallery[`../assets/media/${path}`]
export const projectVideo = (name) => videos[name]
