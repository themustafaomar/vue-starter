export default ({ store, router, from, to, next, guest }) => {
  const isLoggedIn = store.getters['auth/isLoggedIn']

  // This is a guest route, we want
  // to redirect this user to the home.
  if (guest && isLoggedIn) {
    return router.push({ name: 'home' })
  }

  // This is an authenticated route
  // but the user is not logged in so redirect.
  if (!guest && !isLoggedIn) {
    return router.push({ name: 'login' })
  }

  next()
}
