// import axios from './axios'
import './axios'
import i18n from './vue-i18n'
import vuetify from './vuetify'

// Callable plugins
const plugins = {
  // axios,
  i18n,
  vuetify
}

export default (parameters) => {
  Object.keys(plugins).forEach((name) => plugins[name].call(parameters.app, parameters))
}
