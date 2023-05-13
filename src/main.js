import { createApp, h } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import { useVuetify } from './plugins/vuetify'

// Plugins
import { usePlugins } from './plugins'

// Create an app
const app = createApp({
  beforeCreate: () => store.commit('init'),
  render: () => h(App),
})

// Context parameters
const context = { app, store, router }

// Must be registered before any other plugin
useVuetify(context)

// Router and store
app.use(store)
app.use(router)
app.mount('#app')

// Use plugins and components
usePlugins(context)
