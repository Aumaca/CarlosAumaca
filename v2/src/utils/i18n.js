import { createI18n } from 'vue-i18n'

export const LOCALE_KEY = 'portfolio-locale'

export const messages = {
  en: {
    welcome: 'Hello World!',
    aboutMe: 'About Me',
    projects: 'Projects',
    knowledge: 'Knowledge',
    languages: 'Languages',
    webDevelopment: 'Web Development',
    mobile: 'Mobile',
    database: 'Database',
    others: 'Others',
    contact: 'Contact',
    developedBy: 'Developed by Carlos Aumaca',
    oldVersion: '2024v1',
    languageLabel: 'Language',
    sectionsLabel: 'Sections',
    scrollToProjects: 'Scroll to projects',
    readMore: 'Read more',
    readLess: 'Read less',
    downloadApk: 'Download APK',
    googleDrive: 'Google Drive',
    contactLead: 'Have a project in mind? Send me a message.',
    copyEmail: 'Copy email',
    copied: 'Copied',
    backToTop: 'Back to top',
    builtWith: 'Built with Vue and Vite'
  },
  pt: {
    welcome: 'Olá Mundo!',
    aboutMe: 'Sobre mim',
    projects: 'Projetos',
    knowledge: 'Conhecimento',
    languages: 'Linguagens',
    webDevelopment: 'Desenvolvimento WEB',
    mobile: 'Mobile',
    database: 'Banco de Dados',
    others: 'Outros',
    contact: 'Contato',
    developedBy: 'Desenvolvido por Carlos Aumaca',
    oldVersion: '2024v1',
    languageLabel: 'Idioma',
    sectionsLabel: 'Seções',
    scrollToProjects: 'Ir para projetos',
    readMore: 'Ler mais',
    readLess: 'Ler menos',
    downloadApk: 'Baixar APK',
    googleDrive: 'Google Drive',
    contactLead: 'Tem um projeto em mente? Me envie uma mensagem.',
    copyEmail: 'Copiar e-mail',
    copied: 'Copiado',
    backToTop: 'Voltar ao topo',
    builtWith: 'Feito com Vue e Vite'
  }
}

const savedLocale = () => {
  try {
    const value = localStorage.getItem(LOCALE_KEY)
    return value === 'pt' || value === 'en' ? value : 'en'
  } catch {
    return 'en'
  }
}

const i18n = createI18n({
  locale: savedLocale(),
  fallbackLocale: 'en',
  legacy: false,
  messages
})

export default i18n
