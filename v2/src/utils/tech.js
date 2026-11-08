const icons = import.meta.glob('../assets/tech/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
})

const iconUrl = (file) => icons[`../assets/tech/${file}.svg`]

// slug: [display name, accent colour tuned for a dark background, options]
const registry = {
  android: ['Android', '#3DDC84'],
  bootstrap: ['Bootstrap', '#9B72E8'],
  c: ['C', '#659AD2'],
  cplusplus: ['C++', '#5B9BD5'],
  css3: ['CSS3', '#3B9BE8'],
  dart: ['Dart', '#29B6F6'],
  django: ['Django', '#44B78B', { mono: true }],
  docker: ['Docker', '#2496ED'],
  express: ['Express', '#B4BCCB', { mono: true }],
  firebase: ['Firebase', '#FFCA28'],
  flutter: ['Flutter', '#54C5F8'],
  git: ['Git', '#F05032'],
  googledrive: ['Google Drive', '#4285F4'],
  googleplay: ['Google Play', '#34A853'],
  html5: ['HTML5', '#E8622F'],
  java: ['Java', '#E76F00'],
  javascript: ['JavaScript', '#F7DF1E'],
  jwt: ['JWT', '#D63AFF'],
  linux: ['Linux', '#FCC624'],
  mocha: ['Mocha', '#B98D6A'],
  mongodb: ['MongoDB', '#4DB33D'],
  netlify: ['Netlify', '#00C7B7'],
  nodejs: ['Node.js', '#68A063'],
  pandas: ['Pandas', '#E70488', { mono: true }],
  postgresql: ['PostgreSQL', '#5A8FC4'],
  powershell: ['PowerShell', '#5391FE'],
  provider: ['Provider', '#54C5F8', { icon: 'flutter' }],
  python: ['Python', '#FFD43B'],
  react: ['React', '#61DAFB'],
  redux: ['Redux', '#9B7FE0'],
  sanity: ['Sanity', '#F03E2F'],
  sqlite: ['SQLite', '#4A9FD8'],
  supabase: ['Supabase', '#3ECF8E'],
  tailwindcss: ['Tailwind CSS', '#38BDF8'],
  typescript: ['TypeScript', '#3178C6'],
  vercel: ['Vercel', '#E6E9F0', { mono: true }],
  vuejs: ['Vue.js', '#42B883'],
  windows11: ['Windows 11', '#00ADEF'],
  wordpress: ['WordPress', '#4F9CC9', { mono: true }]
}

export const tech = (slug) => {
  const [name, color, options = {}] = registry[slug]
  return {
    slug,
    name,
    color,
    mono: Boolean(options.mono),
    icon: iconUrl(options.icon ?? slug)
  }
}
