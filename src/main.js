import { createApp, h } from 'vue'
import { plugins } from './plugins'
import router from './router'
import App from './App.vue'
import pinia from './stores/pinia'
import { useAppStore } from './stores/app'
import './assets/sass/main.scss'

// Create a new vue instance
const app = createApp({
  render: () => h(App),
  beforeCreate: () => useAppStore().init(),
})

// Register plugins
plugins(app)

// Use Vue plugins
app.use(pinia).use(router)

// Run before each method of the router
router.watch(app)

// Mount!
app.mount('#app')
