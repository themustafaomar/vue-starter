import { createApp, h } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'

// Plugins
import { usePlugins } from './plugins'

// Create an app
const app = createApp({
  beforeCreate: () => store.commit('app/setup'),
  render: () => h(App),
})

// Context parameters
const context = { app, store, router }

// Router and store
app.use(router).use(store).mount('#app')

// Use plugins and components
usePlugins(context)
