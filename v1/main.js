import { createApp } from 'vue'
import App from './src/App.vue'
import i18n from './src/utils/i18n'
import './index.css'
import '../node_modules/flag-icons/css/flag-icons.min.css'

const app = createApp(App)
app.use(i18n)
app.mount('#app')
