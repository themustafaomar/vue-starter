import { createApp, h } from 'vue'
import { plugins } from './plugins'
import store from './store'
import router from './router'
import App from './App.vue'
import pinia from './stores/pinia'
import { useAppStore } from './stores/app'

// Create a new Vue app
const app = createApp({
  beforeCreate: () => useAppStore().init(),
  render: () => h(App),
})

// Register plugins
plugins(app)

// Run before each method of the router
router.watch(app)

// Use Vue plugins
app.use(store)
app.use(router)
app.use(pinia)
app.mount('#app')
