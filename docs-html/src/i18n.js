import { createI18n } from 'vue-i18n'
import en from './locales/en'
import vi from './locales/vi'

const i18n = createI18n({
  legacy: false, // For Vue 3 Composition API
  locale: 'en', // default locale
  fallbackLocale: 'en',
  messages: {
    en,
    vi
  },
  // Disable message compilation to prevent "${}" and "{}" syntax conflicts
  messageCompiler: (msg) => (ctx) => msg,
  escapeParameter: false
})

export default i18n
