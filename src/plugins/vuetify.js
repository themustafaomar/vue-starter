import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { loadFonts } from './webfontloader'

export default ({ app }) => {
  const vuetify = createVuetify(
    // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  )

  loadFonts()

  app.use(vuetify)
}
