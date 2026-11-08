import { createApp } from 'vue'
import App from './src/App.vue'
import i18n from '@/utils/i18n'
import { reveal } from '@/directives/reveal'
import '@fontsource-variable/inter'
import 'flag-icons/css/flag-icons.min.css'
import './index.css'

const app = createApp(App)
app.use(i18n)
app.directive('reveal', reveal)
app.mount('#app')
