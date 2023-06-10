import { createRouter, createWebHistory } from 'vue-router'
import { progress } from '@/plugins/progress'
import middlewares from '@/middleware'
import routes from './routes'
import { useAppStore } from '@/stores/app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Well, let's talk about that, we need the Vue instance but we can't access it,
// there is no an easy way for doing this so, we will create a watch
// method and call it from main.js, so we can pass the app instance.
router.watch = (app) => watch(app)

// Run middlewares before each route
function watch(app) {
  const { can, is } = app.config.globalProperties
  const appStore = useAppStore()

  router.beforeEach((to, from, next) => {
    progress.start()
    appStore.loading()

    const { name, matched, meta } = to
    const middlewaresToRun = []

    // Check if we've a parent, we'll assume this is a layout
    const parent = matched[0]
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
    const currentMware = meta.middleware
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

    // Handle the role and permissions if any
    if (hasntRole(is, meta)) {
      router.push('/dashboard')
    } else if (hasntPermissions(can, meta)) {
      router.push('/dashboard')
    }

    // Run an array of middlewares in order
    for (let middlewareName of middlewaresToRun) {
      runMiddleware(middlewareName, next, from, to)
    }
  })
}

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
function runMiddleware(name, next, from, to, permissions) {
  const [middleware, type] = name.split(':')

  if (!Array.prototype.hasOwnProperty.call(middlewares, middleware)) {
    throw new Error(`Unknown [${middleware}] middleware, did you register this middleware?`)
  }

  middlewares[middleware]({
    router,
    from,
    to,
    next,
    guest: type === 'guest',
    permissions,
  })
}

// Check if the current user doesn't have a role
function hasntRole(is, { role }) {
  return !role || is(role) ? false : true
}

// Check if the current user doesn't have permissions
function hasntPermissions(can, { permissions }) {
  permissions = normalizePermissions(permissions)

  return !permissions || can(permissions) ? false : true
}

// Normalize permissions parameter
function normalizePermissions(permissions) {
  if (Array.isArray(permissions)) {
    return permissions.join('&')
  }

  if (typeof permissions === 'string') {
    return permissions
  }

  return ''
}

export default router
