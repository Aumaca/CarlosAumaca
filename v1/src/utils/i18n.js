import { createI18n } from 'vue-i18n'

export const messages = {
  en: {
    welcome: 'Hello World!',
    aboutMe: 'About Me',
    projects: 'Projects',
    knowledge: 'Knowledge',
    languages: 'Languages',
    webDevelopment: 'Web Development',
    database: 'Database',
    others: 'Others',
    contact: 'Contact',
    developedBy: 'Developed by Carlos Aumaca'
  },
  pt: {
    welcome: 'Olá Mundo!',
    aboutMe: 'Sobre mim',
    projects: 'Projetos',
    knowledge: 'Conhecimento',
    languages: 'Linguagens',
    webDevelopment: 'Desenvolvimento WEB',
    database: 'Banco de Dados',
    others: 'Outros',
    contact: 'Contato',
    developedBy: 'Desenvolvido por Carlos Aumaca'
  }
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages
})

export default i18n
