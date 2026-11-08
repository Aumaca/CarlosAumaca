import { createApp } from 'vue'
import App from './src/App.vue'
import i18n from '@v2/utils/i18n'
import { reveal } from '@v2/directives/reveal'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './index.css'

const app = createApp(App)
app.use(i18n)
app.directive('reveal', reveal)
app.mount('#app')
