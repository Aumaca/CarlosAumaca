import { createI18n } from 'vue-i18n'

export const LOCALE_KEY = 'portfolio-locale'

export const LOCALES = [
  { code: 'en', label: 'English', flag: 'us', htmlLang: 'en' },
  { code: 'pt', label: 'Português', flag: 'br', htmlLang: 'pt-BR' },
  { code: 'es', label: 'Español', flag: 'es', htmlLang: 'es' },
  { code: 'de', label: 'Deutsch', flag: 'de', htmlLang: 'de' },
  { code: 'ja', label: '日本語', flag: 'jp', htmlLang: 'ja' }
]

export const messages = {
  en: {
    period: '.',
    heroRole: 'Developer. Web and mobile.',
    aboutStatement: 'I am a developer who likes challenges and loves to see work done.',
    aboutMe: 'About Me',
    projects: 'Projects',
    knowledge: 'Knowledge',
    languages: 'Languages',
    webDevelopment: 'Web Development',
    mobile: 'Mobile',
    database: 'Database',
    others: 'Others',
    contact: 'Contact',
    contactTitle: 'Have a project in mind?',
    contactLead: 'Send me a message.',
    developedBy: 'Developed by Carlos Aumaca',
    oldVersions: 'Old versions',
    oldVersion: '2024v1',
    version2: '2026v2',
    languageLabel: 'Language',
    sectionsLabel: 'Sections',
    menu: 'Menu',
    scrollToAbout: 'Scroll to about me',
    visit: 'Visit',
    readMore: 'Read more',
    readLess: 'Read less',
    downloadApk: 'Download APK',
    copyEmail: 'Copy email',
    copied: 'Copied',
    watchVideo: 'Watch video'
  },
  pt: {
    period: '.',
    heroRole: 'Desenvolvedor. Web e mobile.',
    aboutStatement: 'Sou um desenvolvedor que gosta de desafios e ama ver o trabalho feito.',
    aboutMe: 'Sobre mim',
    projects: 'Projetos',
    knowledge: 'Conhecimento',
    languages: 'Linguagens',
    webDevelopment: 'Desenvolvimento WEB',
    mobile: 'Mobile',
    database: 'Banco de Dados',
    others: 'Outros',
    contact: 'Contato',
    contactTitle: 'Tem um projeto em mente?',
    contactLead: 'Me envie uma mensagem.',
    developedBy: 'Desenvolvido por Carlos Aumaca',
    oldVersions: 'Versões antigas',
    oldVersion: '2024v1',
    version2: '2026v2',
    languageLabel: 'Idioma',
    sectionsLabel: 'Seções',
    menu: 'Menu',
    scrollToAbout: 'Ir para sobre mim',
    visit: 'Visitar',
    readMore: 'Ler mais',
    readLess: 'Ler menos',
    downloadApk: 'Baixar APK',
    copyEmail: 'Copiar e-mail',
    copied: 'Copiado',
    watchVideo: 'Assistir ao vídeo'
  },
  es: {
    period: '.',
    heroRole: 'Desarrollador. Web y móvil.',
    aboutStatement:
      'Soy un desarrollador al que le gustan los desafíos y le encanta ver el trabajo terminado.',
    aboutMe: 'Sobre mí',
    projects: 'Proyectos',
    knowledge: 'Conocimientos',
    languages: 'Lenguajes',
    webDevelopment: 'Desarrollo web',
    mobile: 'Móvil',
    database: 'Bases de datos',
    others: 'Otros',
    contact: 'Contacto',
    contactTitle: '¿Tienes un proyecto en mente?',
    contactLead: 'Envíame un mensaje.',
    developedBy: 'Desarrollado por Carlos Aumaca',
    oldVersions: 'Versiones antiguas',
    oldVersion: '2024v1',
    version2: '2026v2',
    languageLabel: 'Idioma',
    sectionsLabel: 'Secciones',
    menu: 'Menú',
    scrollToAbout: 'Ir a sobre mí',
    visit: 'Visitar',
    readMore: 'Leer más',
    readLess: 'Leer menos',
    downloadApk: 'Descargar APK',
    copyEmail: 'Copiar correo',
    copied: 'Copiado',
    watchVideo: 'Ver video'
  },
  de: {
    period: '.',
    heroRole: 'Entwickler. Web und Mobile.',
    aboutStatement:
      'Ich bin ein Entwickler, der Herausforderungen mag und es liebt, fertige Arbeit zu sehen.',
    aboutMe: 'Über mich',
    projects: 'Projekte',
    knowledge: 'Kenntnisse',
    languages: 'Sprachen',
    webDevelopment: 'Webentwicklung',
    mobile: 'Mobile',
    database: 'Datenbanken',
    others: 'Sonstiges',
    contact: 'Kontakt',
    contactTitle: 'Haben Sie ein Projekt im Sinn?',
    contactLead: 'Schreiben Sie mir eine Nachricht.',
    developedBy: 'Entwickelt von Carlos Aumaca',
    oldVersions: 'Alte Versionen',
    oldVersion: '2024v1',
    version2: '2026v2',
    languageLabel: 'Sprache',
    sectionsLabel: 'Abschnitte',
    menu: 'Menü',
    scrollToAbout: 'Zu „Über mich“ scrollen',
    visit: 'Besuchen',
    readMore: 'Mehr lesen',
    readLess: 'Weniger lesen',
    downloadApk: 'APK herunterladen',
    copyEmail: 'E-Mail kopieren',
    copied: 'Kopiert',
    watchVideo: 'Video ansehen'
  },
  ja: {
    period: '。',
    heroRole: 'Webとモバイルの開発者。',
    aboutStatement: '挑戦が好きで、仕事が形になるのを見ることが大好きな開発者です。',
    aboutMe: 'プロフィール',
    projects: 'プロジェクト',
    knowledge: '知識',
    languages: 'プログラミング言語',
    webDevelopment: 'Web開発',
    mobile: 'モバイル',
    database: 'データベース',
    others: 'その他',
    contact: 'お問い合わせ',
    contactTitle: 'プロジェクトのご相談はありますか?',
    contactLead: 'メッセージをお送りください。',
    developedBy: 'Carlos Aumacaが開発',
    oldVersions: '旧バージョン',
    oldVersion: '2024v1',
    version2: '2026v2',
    languageLabel: '言語',
    sectionsLabel: 'セクション',
    menu: 'メニュー',
    scrollToAbout: 'プロフィールへ移動',
    visit: 'サイトを見る',
    readMore: '続きを読む',
    readLess: '閉じる',
    downloadApk: 'APKをダウンロード',
    copyEmail: 'メールをコピー',
    copied: 'コピーしました',
    watchVideo: '動画を見る'
  }
}

const savedLocale = () => {
  try {
    const value = localStorage.getItem(LOCALE_KEY)
    return value in messages ? value : 'en'
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
