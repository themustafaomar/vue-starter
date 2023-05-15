import './axios'
import './vform'
import './laravel-echo'

// Callable plugins
import { useVuetify } from './vuetify'
import { useGlobalComponents } from './global-components'
import { useLaravelPermissions } from './laravel-permissions'

// Call the callalble plugins that needs
// to the context parameters for registeration purposes.
export const plugins = (app) => {
  useVuetify(app)
  useLaravelPermissions(app)
  useGlobalComponents(app)
}
