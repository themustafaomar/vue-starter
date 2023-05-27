import { createApp, h } from 'vue'
import { plugins } from './plugins'
import router from './router'
import App from './App.vue'
import pinia from './stores/pinia'
import { useAppStore } from './stores/app'

// Create a new vue instance
const app = createApp({
  render: () => h(App),
  beforeCreate: () => useAppStore().init(),
})

// Register plugins
plugins(app)

// Run before each method of the router
router.watch(app)

// Use Vue plugins
app.use(pinia)
app.use(router)
app.mount('#app')
