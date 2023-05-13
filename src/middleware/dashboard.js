/* eslint-disable */
export default ({ store, router, from, to, next, guest, permissions }) => {
  const isLoggedIn = store.getters['auth/isLoggedIn']

  console.log(to)

  // This is a guest route, we want
  // to redirect this user to the home.
  if (guest && isLoggedIn) {
    return router.push(store.state.app.auth.homeURL)
  }

  // This is an authenticated route
  // but the user is not logged in so redirect.
  if (!guest && !isLoggedIn) {
    return router.push({ name: 'login' })
  }

  next()
}
