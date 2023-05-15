import './axios'
import './vform'
import './laravel-echo'

// Callable plugins
import { useVuetify } from './vuetify'
import { useGlobalComponents } from './global-components'
import { useLaravelPermissions } from './laravel-permissions'

// Call the callalble plugins that needs to the app instance
// for registeration purposes, since we're using Vue v3
// we need the app instance to register components and plugins etc..
export const plugins = (app) => {
  useVuetify(app)
  useLaravelPermissions(app)
  useGlobalComponents(app)
}
