import './axios'
import './vform'
import { useVuetify } from './vuetify'
import { useGlobalComponents } from './global-components'

export const usePlugins = (ctx) => {
  useGlobalComponents(ctx)
  useVuetify(ctx)
}
