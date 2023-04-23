import { createApp, h } from 'vue'
import App from './layouts/app.vue'
import plugins from './plugins'
import router from './router'
import store from './store'

const app = createApp({
  beforeCreate: () => store.commit('app/setup'),
  render: () => h(App)
})

app.use(router).use(store)

plugins({ app, store, router })

app.mount('#app')
