import './axios'
import './vform'
import './laravel-echo'

// Callable plugins
import { useVueMiddleware } from './vue-middleware'
import { useVuetify } from './vuetify'
import { useGlobalComponents } from './global-components'

// Call the callalble plugins that needs to the app instance
// for registeration purposes, since we're using Vue v3
// we need the app instance to register components and plugins etc..
export const plugins = (app) => {
  useVueMiddleware(app)
  useVuetify(app)
  useGlobalComponents(app)
}
