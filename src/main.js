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

app.config.globalProperties.$slice = (string, length = 25) => {
  return string.length >= length ? string.slice(0, length) + '...' : string
}

app.use(pinia)
app.use(router)

// Register plugins
plugins(app)

// Mount!
app.mount('#app')
