import { createI18n } from 'vue-i18n'
import en from '@/i18n/en.json'
import ar from '@/i18n/ar.json'

/**
 * @deprecated
 */

export default ({ app, store: { state } }) => {
  const defaultLocale = state.app.locale.default
  const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    legacy: false,
    messages: { en, ar }
  })

  app.use(i18n)
}
