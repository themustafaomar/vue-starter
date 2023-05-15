import { createRouter, createWebHistory } from 'vue-router'
import { progress } from '@/plugins/progress'
import store from '@/store'
import middlewares from '@/middleware'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  progress.start()
  store.commit('loading')

  const name = to.name
  const middlewaresToRun = []

  // Check if we've a parent, we'll assume this is a layout
  const parent = to.matched[0]
  if (hasLayout(to) && parent.name) {
    document.body.classList.add(`${parent.name}__layout`)
  }

  // Add a title and id to the current page
  if (name) {
    document.title = createTitle(name)
    // Set an id depending on the route name value
    if (document.body) document.body.id = `${name}__page`
  }

  // Get current route middlewares if presented
  const currentMware = to.meta.middleware
  if (currentMware) {
    if (Array.isArray(currentMware)) {
      middlewaresToRun.push(...currentMware)
    } else if (typeof currentMware === 'string') {
      middlewaresToRun.push(currentMware)
    }
  }

  // Hmm, looks like we don't have any middleware to run
  if (!middlewaresToRun.length) {
    return next()
  }

  // Run an array of middlewares in order
  for (let middlewareName of middlewaresToRun) {
    runMiddleware(middlewareName, router, next, from, to, to.meta.permissions || null)
  }
})

router.afterEach(() => {
  setTimeout(() => progress.finish(), 500)
})

// Check if the current has a layout
function hasLayout({ matched }) {
  return matched.length <= 1
}

// Create a title from a given name
function createTitle(name) {
  return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/_|-/gi, ' - ')
}

// Let's run the middleware and give the
// middleware a bunch of parameters to play around with.
function runMiddleware(name, router, next, from, to, permissions) {
  const [middleware, type] = name.split(':')

  if (!Array.prototype.hasOwnProperty.call(middlewares, middleware)) {
    throw new Error(`Unknown [${middleware}] middleware, did you register this middleware?`)
  }

  const params = { store, router, from, to, next, guest: type === 'guest', permissions }

  middlewares[middleware](params)
}

export default router
